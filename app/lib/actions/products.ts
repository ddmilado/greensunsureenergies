"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createAdminClient } from "../supabase/server";
import { getSessionUser } from "../dal";

async function ensureAdmin() {
  const u = await getSessionUser();
  if (!u) redirect("/login?next=/admin");
  if (!u.isAdmin) redirect("/account");
}

type ImageInput = { url: string; alt?: string; position?: number };

function parseImages(raw: unknown): ImageInput[] {
  if (typeof raw !== "string" || !raw.trim()) return [];
  try {
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr
      .filter((x) => x && typeof x.url === "string" && x.url.trim())
      .map((x, i) => ({ url: x.url.trim(), alt: x.alt ?? "", position: i }));
  } catch {
    return [];
  }
}

const ProductSchema = z.object({
  slug: z
    .string()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and dashes only."),
  name: z.string().min(2).max(180),
  brand: z.string().max(80).optional().default(""),
  short_desc: z.string().max(400).optional().default(""),
  description: z.string().max(20000).optional().default(""),
  category_id: z.string().uuid().optional().or(z.literal("")).default(""),
  price_ngn: z.coerce.number().min(0),
  compare_at_ngn: z.coerce.number().min(0).optional().default(0),
  currency: z.string().max(4).optional().default("NGN"),
  stock: z.coerce.number().int().min(0).default(0),
  active: z.union([z.literal("on"), z.literal("true"), z.literal("false"), z.literal("")]).optional(),
  wattage_w: z.coerce.number().int().min(0).optional().default(0),
  capacity_ah: z.coerce.number().int().min(0).optional().default(0),
  voltage_v: z.coerce.number().int().min(0).optional().default(0),
  warranty_yrs: z.coerce.number().int().min(0).optional().default(0),
  images: z.string().optional().default("[]"),
});

export type ProductFormState = {
  errors?: Record<string, string[]>;
  message?: string;
} | undefined;

function toProductRow(input: z.infer<typeof ProductSchema>) {
  return {
    slug: input.slug,
    name: input.name,
    brand: input.brand || null,
    short_desc: input.short_desc || null,
    description: input.description || null,
    category_id: input.category_id || null,
    price_kobo: Math.round(input.price_ngn * 100),
    compare_at_kobo: input.compare_at_ngn > 0 ? Math.round(input.compare_at_ngn * 100) : null,
    currency: input.currency || "NGN",
    stock: input.stock,
    active: input.active !== "false",
    wattage_w: input.wattage_w || null,
    capacity_ah: input.capacity_ah || null,
    voltage_v: input.voltage_v || null,
    warranty_yrs: input.warranty_yrs || null,
  };
}

export async function createProductAction(
  _prev: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await ensureAdmin();
  const parsed = ProductSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("products")
    .insert(toProductRow(parsed.data))
    .select("id, slug")
    .single();
  if (error) return { message: error.message };

  const images = parseImages(parsed.data.images);
  if (images.length && data?.id) {
    const { error: imgErr } = await admin
      .from("product_images")
      .insert(images.map((im) => ({ product_id: data.id, url: im.url, alt: im.alt || null, position: im.position })));
    if (imgErr) return { message: `Product saved, but images failed: ${imgErr.message}` };
  }
  revalidatePath("/store");
  revalidatePath("/admin/products");
  redirect(`/admin/products/${data.slug}`);
}

export async function updateProductAction(
  slug: string,
  _prev: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await ensureAdmin();
  const parsed = ProductSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }
  const admin = createAdminClient();
  const { data: existing, error: findErr } = await admin
    .from("products")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (findErr) return { message: findErr.message };
  if (!existing) return { message: "Product not found." };

  const { error } = await admin.from("products").update(toProductRow(parsed.data)).eq("slug", slug);
  if (error) return { message: error.message };

  // Replace images wholesale for simplicity.
  const images = parseImages(parsed.data.images);
  const { error: delErr } = await admin.from("product_images").delete().eq("product_id", existing.id);
  if (delErr) return { message: delErr.message };
  if (images.length) {
    const { error: imgErr } = await admin
      .from("product_images")
      .insert(images.map((im) => ({ product_id: existing.id, url: im.url, alt: im.alt || null, position: im.position })));
    if (imgErr) return { message: `Saved, but images failed: ${imgErr.message}` };
  }

  revalidatePath("/store");
  revalidatePath(`/store/${slug}`);
  revalidatePath("/admin/products");
  redirect(`/admin/products/${slug}?saved=1`);
}

export async function deleteProductAction(formData: FormData) {
  const id = formData.get("id");
  if (typeof id !== "string") return;
  await ensureAdmin();
  const admin = createAdminClient();
  const { error } = await admin.from("products").delete().eq("id", id);
  if (error) return;
  revalidatePath("/store");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

// ---------- image upload to Supabase Storage ----------

export async function uploadProductImageAction(
  formData: FormData,
): Promise<{ url?: string; error?: string }> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No file provided." };
  }
  await ensureAdmin();
  const admin = createAdminClient();
  const bytes = new Uint8Array(await file.arrayBuffer());
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
  const { error } = await admin.storage
    .from("product-images")
    .upload(path, bytes, { contentType: file.type || "image/jpeg", upsert: false });
  if (error) return { error: error.message };
  const { data } = admin.storage.from("product-images").getPublicUrl(path);
  return { url: data.publicUrl };
}
