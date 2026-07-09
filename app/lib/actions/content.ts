"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { headers } from "next/headers";
import { createServerClient_, createAdminClient } from "../supabase/server";
import type { LeadKind } from "../types";

// ---------- public: submit a lead (quote / contact / support) ----------

const BaseLead = z.object({
  name: z.string().min(2, "Please share your name (at least 2 characters).").max(120).trim(),
  email: z.email("Enter a valid email.").trim().optional().or(z.literal("")),
  phone: z.string().min(7, "Please share a phone number we can reach you on.").max(40).trim(),
  message: z.string().max(4000).optional().or(z.literal("")),
  source: z.string().max(80).optional(),
  // optional qualification fields for the quote funnel
  property_type: z.enum(["home", "business", "industrial"]).optional(),
  current_problem: z.string().max(280).optional(),
  estimated_load: z.string().max(120).optional(),
  preferred_callback: z.string().max(120).optional(),
});

const QuoteSchema = BaseLead.extend({
  property_type: z.enum(["home", "business", "industrial"], {
    message: "Tell us if this is for a home, business, or industrial site.",
  }),
  email: z.email("Enter a valid email.").trim(),
});

const ContactSchema = BaseLead;

export type LeadFormState = {
  errors?: Partial<Record<"name" | "email" | "phone" | "message" | "property_type" | "_", string[]>>;
  message?: string;
  ok?: boolean;
};

async function getRequestContext() {
  try {
    const h = await headers();
    return {
      pagePath: h.get("referer") ?? h.get("x-pathname") ?? null,
      userAgent: h.get("user-agent") ?? null,
    };
  } catch {
    return { pagePath: null, userAgent: null };
  }
}

export async function submitContactAction(
  _prev: LeadFormState | undefined,
  formData: FormData,
): Promise<LeadFormState> {
  return submitLead("contact", ContactSchema, formData, "/contact-us");
}

export async function submitQuoteAction(
  _prev: LeadFormState | undefined,
  formData: FormData,
): Promise<LeadFormState> {
  return submitLead("quote", QuoteSchema, formData, "/contact-us#quote");
}

export async function submitSupportAction(
  _prev: LeadFormState | undefined,
  formData: FormData,
): Promise<LeadFormState> {
  return submitLead("support", ContactSchema, formData, "/contact-us");
}

async function submitLead(
  kind: LeadKind,
  schema: typeof QuoteSchema | typeof ContactSchema,
  formData: FormData,
  redirectTo: string,
): Promise<LeadFormState> {
  const raw = Object.fromEntries(formData);
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }
  const ctx = await getRequestContext();
  const sb = await createServerClient_();
  const { data: userData } = await sb.auth.getUser();
  const meta: Record<string, unknown> = { user_agent: ctx.userAgent };
  if (kind === "quote") {
    const q = parsed.data as z.infer<typeof QuoteSchema>;
    meta.property_type = q.property_type;
    if (q.current_problem) meta.current_problem = q.current_problem;
    if (q.estimated_load) meta.estimated_load = q.estimated_load;
    if (q.preferred_callback) meta.preferred_callback = q.preferred_callback;
  }
  const { error } = await sb.from("leads").insert({
    kind,
    name: parsed.data.name,
    email: parsed.data.email || null,
    phone: parsed.data.phone,
    message: parsed.data.message || null,
    source: parsed.data.source || kind,
    page_path: ctx.pagePath,
    meta,
    user_id: userData?.user?.id ?? null,
  });
  if (error) {
    return { message: "We couldn't send your message. Please try again or call us directly." };
  }
  revalidatePath("/admin/leads");
  if (kind === "quote") {
    redirect("/contact-us/thank-you?kind=quote");
  } else if (kind === "support") {
    redirect("/contact-us/thank-you?kind=support");
  } else {
    redirect("/contact-us/thank-you?kind=contact");
  }
}

// ---------- admin: leads ----------

const LeadStatusSchema = z.enum(["new", "contacted", "qualified", "won", "lost"]);

export async function updateLeadStatusAction(formData: FormData) {
  const id = formData.get("id");
  const status = formData.get("status");
  if (typeof id !== "string" || typeof status !== "string") return;
  const parsed = LeadStatusSchema.safeParse(status);
  if (!parsed.success) return;
  await ensureAdmin();
  const admin = createAdminClient();
  await admin.from("leads").update({ status: parsed.data }).eq("id", id);
  revalidatePath("/admin/leads");
}

export async function deleteLeadAction(formData: FormData) {
  const id = formData.get("id");
  if (typeof id !== "string") return;
  await ensureAdmin();
  const admin = createAdminClient();
  await admin.from("leads").delete().eq("id", id);
  revalidatePath("/admin/leads");
}

// ---------- admin: projects CRUD ----------

const ProjectInputSchema = z.object({
  slug: z
    .string()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and dashes only."),
  title: z.string().min(2).max(180),
  category: z.string().min(2).max(80),
  client_type: z.string().max(80).optional().default(""),
  location: z.string().max(120).optional().default(""),
  system_size: z.string().max(120).optional().default(""),
  panels: z.string().max(120).optional().default(""),
  batteries: z.string().max(120).optional().default(""),
  inverter: z.string().max(120).optional().default(""),
  installation: z.string().max(80).optional().default(""),
  outcome: z.string().max(280).optional().default(""),
  excerpt: z.string().max(400).optional().default(""),
  body: z.string().max(20000).optional().default(""),
  cover_image: z.string().max(500).optional().default(""),
  featured: z.union([z.literal("on"), z.literal("true"), z.literal("false"), z.literal("")]).optional(),
  active: z.union([z.literal("on"), z.literal("true"), z.literal("false"), z.literal("")]).optional(),
  position: z.coerce.number().int().min(0).max(9999).default(0),
});

export async function createProjectAction(_prev: unknown, formData: FormData) {
  await ensureAdmin();
  const parsed = ProjectInputSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("projects")
    .insert(toProjectRow(parsed.data))
    .select("slug")
    .single();
  if (error) {
    return { message: error.message };
  }
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect(`/admin/projects/${data.slug}`);
}

export async function updateProjectAction(slug: string, _prev: unknown, formData: FormData) {
  await ensureAdmin();
  const parsed = ProjectInputSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }
  const admin = createAdminClient();
  const { error } = await admin.from("projects").update(toProjectRow(parsed.data)).eq("slug", slug);
  if (error) {
    return { message: error.message };
  }
  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/admin/projects");
  redirect(`/admin/projects/${slug}?saved=1`);
}

export async function deleteProjectAction(formData: FormData) {
  await ensureAdmin();
  const id = formData.get("id");
  if (typeof id !== "string") return;
  const admin = createAdminClient();
  await admin.from("projects").delete().eq("id", id);
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

function toProjectRow(input: z.infer<typeof ProjectInputSchema>) {
  return {
    slug: input.slug,
    title: input.title,
    category: input.category,
    client_type: input.client_type || null,
    location: input.location || null,
    system_size: input.system_size || null,
    panels: input.panels || null,
    batteries: input.batteries || null,
    inverter: input.inverter || null,
    installation: input.installation || null,
    outcome: input.outcome || null,
    excerpt: input.excerpt || null,
    body: input.body || null,
    cover_image: input.cover_image || null,
    gallery: [] as { url: string; alt: string | null; position: number }[],
    featured: input.featured === "on" || input.featured === "true",
    active: input.active !== "false", // default true if not explicitly "false"
    position: input.position,
    published_at: new Date().toISOString(),
  };
}

// ---------- admin: posts CRUD ----------

const PostInputSchema = z.object({
  slug: z
    .string()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and dashes only."),
  title: z.string().min(2).max(180),
  category: z.string().max(80).optional().default(""),
  excerpt: z.string().max(400).optional().default(""),
  body: z.string().max(50000).optional().default(""),
  cover_image: z.string().max(500).optional().default(""),
  author_name: z.string().max(80).optional().default("Damdavy Team"),
  reading_minutes: z.coerce.number().int().min(1).max(60).default(5),
  active: z.union([z.literal("on"), z.literal("true"), z.literal("false"), z.literal("")]).optional(),
});

export async function createPostAction(_prev: unknown, formData: FormData) {
  await ensureAdmin();
  const parsed = PostInputSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("posts")
    .insert(toPostRow(parsed.data))
    .select("slug")
    .single();
  if (error) {
    return { message: error.message };
  }
  revalidatePath("/our-blog");
  revalidatePath("/admin/posts");
  redirect(`/admin/posts/${data.slug}`);
}

export async function updatePostAction(slug: string, _prev: unknown, formData: FormData) {
  await ensureAdmin();
  const parsed = PostInputSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }
  const admin = createAdminClient();
  const { error } = await admin.from("posts").update(toPostRow(parsed.data)).eq("slug", slug);
  if (error) {
    return { message: error.message };
  }
  revalidatePath("/our-blog");
  revalidatePath(`/our-blog/${slug}`);
  revalidatePath("/admin/posts");
  redirect(`/admin/posts/${slug}?saved=1`);
}

export async function deletePostAction(formData: FormData) {
  await ensureAdmin();
  const id = formData.get("id");
  if (typeof id !== "string") return;
  const admin = createAdminClient();
  await admin.from("posts").delete().eq("id", id);
  revalidatePath("/our-blog");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

function toPostRow(input: z.infer<typeof PostInputSchema>) {
  return {
    slug: input.slug,
    title: input.title,
    category: input.category || null,
    excerpt: input.excerpt || null,
    body: input.body || null,
    cover_image: input.cover_image || null,
    author_name: input.author_name || "Damdavy Team",
    reading_minutes: input.reading_minutes,
    active: input.active !== "false",
    published_at: new Date().toISOString(),
  };
}

// ---------- shared admin guard ----------

import { getSessionUser } from "../dal";

async function ensureAdmin() {
  const u = await getSessionUser();
  if (!u) redirect("/login?next=/admin");
  if (!u.isAdmin) redirect("/account");
}
