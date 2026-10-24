// Data Access Layer — server-only. Centralizes auth/session and data access.
import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createServerClient_, createAdminClient } from "./supabase/server";
import { categories, products } from "../data/catalog";

export type SessionUser = {
  id: string;
  email: string | null;
  fullName: string;
  isAdmin: boolean;
};

export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  const supabase = await createServerClient_();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, is_admin")
    .eq("id", data.user.id)
    .maybeSingle();

  return {
    id: data.user.id,
    email: data.user.email ?? null,
    fullName: (profile?.full_name as string) || (data.user.email ?? "User"),
    isAdmin: Boolean(profile?.is_admin),
  };
});

export async function requireUser(): Promise<SessionUser> {
  const u = await getSessionUser();
  if (!u) redirect("/login");
  return u;
}

export async function requireAdmin(): Promise<SessionUser> {
  const u = await requireUser();
  if (!u.isAdmin) redirect("/account");
  return u;
}

// ---------- catalog reads ----------
// These read from Supabase when available and gracefully fall back to the
// static `data/catalog` so the store still renders before migrations run.

const PRODUCT_SELECT =
  "*, category:categories(slug, name), images:product_images(id, url, alt, position)";

function normalizeProduct(row: any) {
  const images = (row.images ?? [])
    .slice()
    .sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0));
  return {
    ...row,
    images,
    category: row.category ? { slug: row.category.slug, name: row.category.name } : null,
  };
}

export async function listCategories() {
  try {
    const sb = await createServerClient_();
    const { data, error } = await sb.from("categories").select("*").order("name");
    if (error) throw error;
    if (data && data.length) return data as any[];
    return categories;
  } catch (e) {
    if (!isMissingTableError(e)) console.error("listCategories", e);
    return categories;
  }
}

export async function getCategoryBySlug(slug: string) {
  const all = await listCategories();
  return (all as any[]).find((c) => c.slug === slug) ?? null;
}

export async function listProducts(opts?: { categorySlug?: string; search?: string }) {
  try {
    const sb = await createServerClient_();
    // Use inner join when filtering by category so PostgREST correctly filters
    const select = opts?.categorySlug
      ? "*, category:categories!inner(slug, name), images:product_images(id, url, alt, position)"
      : PRODUCT_SELECT;
    let q = sb.from("products").select(select);
    if (opts?.categorySlug) q = q.eq("category.slug", opts.categorySlug);
    if (opts?.search) q = q.ilike("name", `%${opts.search}%`);
    q = q.order("created_at", { ascending: false });
    const { data, error } = await q;
    if (error) throw error;
    const list = (data ?? []).map(normalizeProduct);
    if (list.length) return list;
    // If DB returned empty for a filtered query, don't fall back to static — that's a real empty result
    if (opts?.categorySlug || opts?.search) return list;
    return fallbackListProducts(opts);
  } catch (e) {
    if (!isMissingTableError(e)) console.error("listProducts", e);
    return fallbackListProducts(opts);
  }
}

function fallbackListProducts(opts?: { categorySlug?: string; search?: string }) {
  let list = [...products];
  if (opts?.categorySlug) {
    const cat = categories.find((c) => c.slug === opts.categorySlug);
    if (cat) list = list.filter((p) => p.category_id === cat.id);
    else return [];
  }
  if (opts?.search) {
    const term = opts.search.toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(term));
  }
  return list;
}

export async function getProductBySlug(slug: string) {
  try {
    const sb = await createServerClient_();
    const { data, error } = await sb
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    if (data) return normalizeProduct(data) as any;
  } catch (e) {
    if (!isMissingTableError(e)) console.error("getProductBySlug", e);
  }
  const p = products.find((prod) => prod.slug === slug);
  if (!p) return null;
  const cat = categories.find((c) => c.id === p.category_id);
  return {
    ...p,
    category: cat ? { id: cat.id, slug: cat.slug, name: cat.name } : undefined,
  } as any;
}

// ---------- cart ----------

export async function getDbCart() {
  const u = await getSessionUser();
  if (!u) return [];
  const sb = await createServerClient_();
  const { data, error } = await sb
    .from("cart_items")
    .select(
      "id, quantity, product:products(id, slug, name, brand, price_kobo, currency, stock, product_images(url, alt, position))",
    )
    .eq("user_id", u.id);
  if (error) throw error;
  return (data ?? []).map((row: any) => {
    const imgs = (row.product?.product_images ?? []) as { url: string; position: number }[];
    imgs.sort((a, b) => a.position - b.position);
    return {
      product_id: row.product?.id as string,
      quantity: row.quantity as number,
      product: row.product
        ? {
            id: row.product.id,
            slug: row.product.slug,
            name: row.product.name,
            brand: row.product.brand,
            price_kobo: row.product.price_kobo,
            currency: row.product.currency,
            stock: row.product.stock,
            image: imgs[0]?.url,
          }
        : undefined,
    } as import("./types").CartItem;
  });
}

// ---------- orders ----------

export async function listUserOrders() {
  const u = await getSessionUser();
  if (!u) return [];
  const sb = await createServerClient_();
  const { data, error } = await sb
    .from("orders")
    .select("*, items:order_items(*)")
    .eq("user_id", u.id)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getOrder(id: string) {
  const sb = await createServerClient_();
  const { data, error } = await sb
    .from("orders")
    .select("*, items:order_items(*)")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

// ---------- admin ----------

export async function adminListProducts() {
  await requireAdmin();
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("products")
    .select("id, slug, name, brand, price_kobo, stock, active, created_at, category:categories(name)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function adminGetProduct(slug: string) {
  await requireAdmin();
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("products")
    .select("*, category:categories(id, slug, name), images:product_images(id, url, alt, position)")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? normalizeProduct(data) : null;
}

// ---------- orders (admin) ----------

export async function adminListOrders(opts?: { status?: string }) {
  await requireAdmin();
  const admin = createAdminClient();
  let q = admin
    .from("orders")
    .select("id, email, status, total_kobo, currency, created_at, ship_full_name, paystack_reference")
    .order("created_at", { ascending: false });
  if (opts?.status) q = q.eq("status", opts.status);
  const { data, error } = await q;
  if (error) throw error;
  return data ?? [];
}

export async function adminGetOrder(id: string) {
  await requireAdmin();
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("orders")
    .select("*, items:order_items(*)")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

// ---------- projects & posts static fallback data ----------

export const STATIC_PROJECTS: import("./types").Project[] = [
  {
    id: "proj-1",
    slug: "residential-roof-installation",
    title: "Residential roof installation",
    category: "Homes",
    client_type: "Residential",
    location: "Warri, Delta State",
    system_size: "5kVA hybrid + 10kWh battery",
    panels: "6 × 450W monocrystalline panels",
    batteries: "2 × 5kWh LiFePO4",
    inverter: "5kVA hybrid inverter with MPPT",
    installation: "2 days",
    outcome: "Cut monthly generator spend by ~70% and gained ~12 hours of backup on essential loads.",
    excerpt: "Roof-mounted solar designed for dependable household backup and reduced generator dependence.",
    body: "## The challenge\nThe client was spending heavily on petrol to run a small generator for fans, lighting, and a fridge, with frequent grid outages during the week.\n\n## What we installed\nA 5kVA hybrid inverter paired with two 5kWh lithium batteries and six 450W monocrystalline panels mounted on the existing roof.\n\n## The result\nThe household now runs lights, TV, fans, and fridge on solar for most of the day, with seamless switchover to battery backup during outages.",
    cover_image: "/hero-1.jpg",
    gallery: [
      { url: "/hero-1.jpg", alt: "Roof-mounted solar array", position: 0 },
      { url: "/solar-install-1.jpg", alt: "Panels alignment", position: 1 },
    ],
    active: true,
    featured: true,
    position: 1,
    published_at: "2026-01-01T00:00:00Z",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "proj-2",
    slug: "commercial-building-solar",
    title: "Commercial building solar",
    category: "Business",
    client_type: "SME / Office",
    location: "Effurun, Delta State",
    system_size: "15kVA three-phase hybrid + 30kWh battery bank",
    panels: "20 × 450W monocrystalline panels",
    batteries: "6 × 5kWh LiFePO4 batteries",
    inverter: "15kVA three-phase hybrid inverter",
    installation: "4 days",
    outcome: "Eliminated daytime diesel use and improved uptime for staff and refrigeration.",
    excerpt: "Business power systems built to reduce diesel spend and keep operations productive during outages.",
    body: "## The challenge\nA growing business was running a 30kVA diesel generator for ~10 hours a day to keep office, refrigeration, and POS online.\n\n## What we installed\nA 15kVA three-phase hybrid system with 30kWh of lithium storage and a 9kW PV array.\n\n## The result\nDaytime generator use is zero, eliminating volatile fuel costs and noise.",
    cover_image: "/solar-install-1.jpg",
    gallery: [
      { url: "/solar-install-1.jpg", alt: "Commercial rooftop", position: 0 },
      { url: "/solar-inspect.jpg", alt: "Combiner box inspection", position: 1 },
    ],
    active: true,
    featured: true,
    position: 2,
    published_at: "2026-01-01T00:00:00Z",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "proj-3",
    slug: "ground-mount-estate-solar",
    title: "Ground-mounted estate solar",
    category: "Estate",
    client_type: "Estate / Facility",
    location: "Warri, Delta State",
    system_size: "20kVA + 40kWh ground-mounted array",
    panels: "30 × 450W monocrystalline panels",
    batteries: "8 × 5kWh LiFePO4 batteries",
    inverter: "20kVA hybrid inverter",
    installation: "4 days",
    outcome: "Reduced daytime grid consumption to nearly zero and provided full evening backup.",
    excerpt: "Ground and open-area installations for larger loads, farms, facilities, and commercial sites.",
    body: "## The challenge\nA facility needed a system to cover heavy daytime loads and provide long evening backup.\n\n## What we installed\nA ground-mounted 13.5kW PV array paired with a 20kVA hybrid inverter and 40kWh of LiFePO4 storage.\n\n## The result\nThe estate now operates almost entirely on solar during daylight with zero generator reliance.",
    cover_image: "/solar-install-2.jpg",
    gallery: [
      { url: "/solar-install-2.jpg", alt: "Ground mount", position: 0 },
      { url: "/hero-2.jpg", alt: "Installed infrastructure", position: 1 },
    ],
    active: true,
    featured: true,
    position: 3,
    published_at: "2026-01-01T00:00:00Z",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
];

export const STATIC_POSTS: import("./types").Post[] = [
  {
    id: "post-1",
    slug: "5-non-negotiable-questions-to-ask-before-you-pay",
    title: "5 non-negotiable questions to ask before you pay",
    category: "Info",
    excerpt: "Choosing the right solar installer starts with the questions you ask before paying for your home or business system.",
    body: "## 1. What exactly is included in the quote?\nA good quote breaks down panels, inverter, batteries, mounting, protection, cabling, and installation labour separately.\n\n## 2. Who handles warranty, and for how long?\nAsk who honours the panel warranty, the inverter warranty, and the installation workmanship warranty.\n\n## 3. What happens during grid outage?\nMake sure the system is configured for the kind of backup you actually need.\n\n## 4. Is the installer certified and insured?\nAsk for proof of relevant electrical certifications and installation insurance.\n\n## 5. What does post-installation support look like?\nThe system should come with monitoring access, a clear fault-reporting path, and a maintenance schedule.",
    cover_image: "/solar-inspect.jpg",
    author_name: "Green Sunsure Team",
    reading_minutes: 5,
    active: true,
    published_at: "2026-01-01T00:00:00Z",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "post-2",
    slug: "the-business-case-for-solar",
    title: "The business case for solar in Nigeria",
    category: "Business",
    excerpt: "For Nigerian SMEs, energy costs affect margins daily. Solar can shift fuel spend into a predictable long-term asset.",
    body: "## The cost of doing nothing\nMost SMEs spend heavily on diesel or petrol to keep operations running. That spend is volatile: pump prices change, fuel scarcity returns, and downtime cuts into revenue.\n\n## What changes with solar\nA well-sized commercial solar system with battery storage replaces daytime diesel use, provides instant switchover, and locks in energy costs.\n\n## The simple math\nIf you currently spend ₦600,000/month on fuel, a properly sized system typically pays for itself in 1–2 years.",
    cover_image: "/solar-install-2.jpg",
    author_name: "Green Sunsure Team",
    reading_minutes: 6,
    active: true,
    published_at: "2026-01-01T00:00:00Z",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "post-3",
    slug: "how-much-solar-do-i-need",
    title: "How much solar do I need for a 3-bedroom home?",
    category: "Tips",
    excerpt: "A practical sizing guide for Nigerian homes, with worked examples and the questions to ask before you pay.",
    body: "## The quick answer\nMost 3-bedroom homes in Nigeria land between 3kVA and 5kVA of inverter capacity, paired with 5–10kWh of battery storage and 4–8 solar panels.\n\n## The key factors\n1. Which loads you want to run (fridge, AC, lighting, fans).\n2. Hours of backup required overnight.\n3. Peak solar generation window in Delta State.",
    cover_image: "/hero-1.jpg",
    author_name: "Green Sunsure Team",
    reading_minutes: 5,
    active: true,
    published_at: "2026-01-01T00:00:00Z",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
];

// ---------- projects ----------

const PROJECT_COLS =
  "id, slug, title, category, client_type, location, system_size, panels, batteries, inverter, installation, outcome, excerpt, body, cover_image, gallery, active, featured, position, published_at, created_at, updated_at";

function isMissingTableError(err: unknown): boolean {
  if (!err) return false;
  if (typeof err === "object") {
    const code = (err as { code?: string }).code;
    if (code === "PGRST205" || code === "42P01" || code === "ENOTFOUND" || code === "ECONNREFUSED") return true;
    const msg = String((err as { message?: string }).message || "");
    const details = String((err as { details?: string }).details || "");
    if (
      msg.includes("fetch failed") ||
      msg.includes("ENOTFOUND") ||
      msg.includes("Failed to fetch") ||
      msg.includes("getaddrinfo") ||
      details.includes("ENOTFOUND") ||
      details.includes("fetch failed")
    ) {
      return true;
    }
  }
  return false;
}

export async function listProjects(opts?: { featuredOnly?: boolean; limit?: number }) {
  try {
    const sb = await createServerClient_();
    let q = sb.from("projects").select(PROJECT_COLS).eq("active", true);
    if (opts?.featuredOnly) q = q.eq("featured", true);
    q = q.order("position", { ascending: true }).order("published_at", { ascending: false });
    if (opts?.limit) q = q.limit(opts.limit);
    const { data, error } = await q;
    if (error) {
      return fallbackListProjects(opts);
    }
    const list = (data ?? []) as import("./types").Project[];
    return list.length > 0 ? list : fallbackListProjects(opts);
  } catch (err) {
    return fallbackListProjects(opts);
  }
}

function fallbackListProjects(opts?: { featuredOnly?: boolean; limit?: number }) {
  let list = [...STATIC_PROJECTS];
  if (opts?.featuredOnly) list = list.filter((p) => p.featured);
  if (opts?.limit) list = list.slice(0, opts.limit);
  return list;
}

export async function getProjectBySlug(slug: string) {
  try {
    const sb = await createServerClient_();
    const { data, error } = await sb
      .from("projects")
      .select(PROJECT_COLS)
      .eq("slug", slug)
      .eq("active", true)
      .maybeSingle();
    if (error) {
      return STATIC_PROJECTS.find((p) => p.slug === slug) ?? null;
    }
    return (data ?? STATIC_PROJECTS.find((p) => p.slug === slug) ?? null) as import("./types").Project | null;
  } catch (err) {
    return STATIC_PROJECTS.find((p) => p.slug === slug) ?? null;
  }
}

// Build-time-safe slug list (uses service_role to avoid cookie() during SSG).
export async function listAllProjectSlugs() {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("projects")
      .select("slug")
      .eq("active", true)
      .order("published_at", { ascending: false });
    if (error) {
      return STATIC_PROJECTS.map((p) => p.slug);
    }
    const slugs = (data ?? []).map((r) => r.slug).filter(Boolean) as string[];
    return slugs.length > 0 ? slugs : STATIC_PROJECTS.map((p) => p.slug);
  } catch (err) {
    return STATIC_PROJECTS.map((p) => p.slug);
  }
}

// ---------- posts ----------

const POST_COLS =
  "id, slug, title, category, excerpt, body, cover_image, author_name, reading_minutes, active, published_at, created_at, updated_at";

export async function listPosts(opts?: { limit?: number }) {
  try {
    const sb = await createServerClient_();
    let q = sb.from("posts").select(POST_COLS).eq("active", true).order("published_at", { ascending: false });
    if (opts?.limit) q = q.limit(opts.limit);
    const { data, error } = await q;
    if (error) {
      return fallbackListPosts(opts);
    }
    const list = (data ?? []) as import("./types").Post[];
    return list.length > 0 ? list : fallbackListPosts(opts);
  } catch (err) {
    return fallbackListPosts(opts);
  }
}

function fallbackListPosts(opts?: { limit?: number }) {
  let list = [...STATIC_POSTS];
  if (opts?.limit) list = list.slice(0, opts.limit);
  return list;
}

export async function getPostBySlug(slug: string) {
  try {
    const sb = await createServerClient_();
    const { data, error } = await sb
      .from("posts")
      .select(POST_COLS)
      .eq("slug", slug)
      .eq("active", true)
      .maybeSingle();
    if (error) {
      return STATIC_POSTS.find((p) => p.slug === slug) ?? null;
    }
    return (data ?? STATIC_POSTS.find((p) => p.slug === slug) ?? null) as import("./types").Post | null;
  } catch (err) {
    return STATIC_POSTS.find((p) => p.slug === slug) ?? null;
  }
}

export async function listAllPostSlugs() {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("posts")
      .select("slug")
      .eq("active", true)
      .order("published_at", { ascending: false });
    if (error) {
      return STATIC_POSTS.map((p) => p.slug);
    }
    const slugs = (data ?? []).map((r) => r.slug).filter(Boolean) as string[];
    return slugs.length > 0 ? slugs : STATIC_POSTS.map((p) => p.slug);
  } catch (err) {
    return STATIC_POSTS.map((p) => p.slug);
  }
}

// ---------- leads (admin) ----------

export async function listLeads(opts?: { status?: import("./types").LeadStatus; kind?: import("./types").LeadKind }) {
  await requireAdmin();
  const admin = createAdminClient();
  let q = admin.from("leads").select("*").order("created_at", { ascending: false });
  if (opts?.status) q = q.eq("status", opts.status);
  if (opts?.kind) q = q.eq("kind", opts.kind);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as import("./types").Lead[];
}
