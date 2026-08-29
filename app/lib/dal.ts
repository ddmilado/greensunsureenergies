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

// ---------- projects ----------

const PROJECT_COLS =
  "id, slug, title, category, client_type, location, system_size, panels, batteries, inverter, installation, outcome, excerpt, body, cover_image, gallery, active, featured, position, published_at, created_at, updated_at";

function isMissingTableError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const code = (err as { code?: string }).code;
  return code === "PGRST205" || code === "42P01";
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
      if (isMissingTableError(error)) return [] as import("./types").Project[];
      throw error;
    }
    return (data ?? []) as import("./types").Project[];
  } catch (err) {
    if (isMissingTableError(err)) return [] as import("./types").Project[];
    throw err;
  }
}

export async function getProjectBySlug(slug: string) {
  const sb = await createServerClient_();
  const { data, error } = await sb
    .from("projects")
    .select(PROJECT_COLS)
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (error) {
    if (isMissingTableError(error)) return null;
    throw error;
  }
  return (data ?? null) as import("./types").Project | null;
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
      if (isMissingTableError(error)) return [] as string[];
      throw error;
    }
    return (data ?? []).map((r) => r.slug).filter(Boolean) as string[];
  } catch (err) {
    if (isMissingTableError(err)) return [] as string[];
    throw err;
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
      if (isMissingTableError(error)) return [] as import("./types").Post[];
      throw error;
    }
    return (data ?? []) as import("./types").Post[];
  } catch (err) {
    if (isMissingTableError(err)) return [] as import("./types").Post[];
    throw err;
  }
}

export async function getPostBySlug(slug: string) {
  const sb = await createServerClient_();
  const { data, error } = await sb
    .from("posts")
    .select(POST_COLS)
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (error) {
    if (isMissingTableError(error)) return null;
    throw error;
  }
  return (data ?? null) as import("./types").Post | null;
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
      if (isMissingTableError(error)) return [] as string[];
      throw error;
    }
    return (data ?? []).map((r) => r.slug).filter(Boolean) as string[];
  } catch (err) {
    if (isMissingTableError(err)) return [] as string[];
    throw err;
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
