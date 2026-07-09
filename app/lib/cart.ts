// Lightweight cookie-backed cart for guest shoppers. When a user signs in
// (and an existing db cart is present), we merge.
import "server-only";
import { cookies } from "next/headers";
import { createServerClient_ } from "./supabase/server";
import type { CartItem } from "./types";

const COOKIE = "dd_cart";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30d

type GuestCart = { items: { product_id: string; quantity: number }[] };

function readGuestCart(): GuestCart {
  const raw = (cookies() as unknown as { get: (n: string) => { value: string } | undefined }).get(COOKIE)?.value;
  if (!raw) return { items: [] };
  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    if (parsed && Array.isArray(parsed.items)) return parsed as GuestCart;
  } catch {
    // fallthrough
  }
  return { items: [] };
}

function writeGuestCart(cart: GuestCart) {
  const c = (cookies() as unknown as { set: (n: string, v: string, o?: object) => void });
  c.set(COOKIE, encodeURIComponent(JSON.stringify(cart)), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
    secure: process.env.NODE_ENV === "production",
  });
}

function clearGuestCart() {
  (cookies() as unknown as { delete: (n: string) => void }).delete(COOKIE);
}

export async function getCart(): Promise<CartItem[]> {
  const sb = await createServerClient_();
  const { data: userData } = await sb.auth.getUser();
  if (userData?.user) {
    // sync any guest cart into db, then return db cart
    const guest = readGuestCart();
    if (guest.items.length) {
      for (const it of guest.items) {
        await sb
          .from("cart_items")
          .upsert(
            { user_id: userData.user.id, product_id: it.product_id, quantity: it.quantity },
            { onConflict: "user_id,product_id" },
          );
      }
      clearGuestCart();
    }
    const { data, error } = await sb
      .from("cart_items")
      .select(
        "quantity, product:products(id, slug, name, brand, price_kobo, currency, stock, product_images(url, position))",
      )
      .eq("user_id", userData.user.id);
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
      } as CartItem;
    });
  }
  // guest path
  const guest = readGuestCart();
  if (!guest.items.length) return [];
  // hydrate product info
  const ids = guest.items.map((i) => i.product_id);
  const { data: prods } = await sb
    .from("products")
    .select("id, slug, name, brand, price_kobo, currency, stock, product_images(url, position)")
    .in("id", ids);
  const byId = new Map<string, any>();
  for (const p of prods ?? []) byId.set(p.id, p);
  return guest.items
    .map((it) => {
      const p = byId.get(it.product_id);
      if (!p) return null;
      const imgs = (p.product_images ?? []) as { url: string; position: number }[];
      imgs.sort((a, b) => a.position - b.position);
      return {
        product_id: p.id,
        quantity: it.quantity,
        product: {
          id: p.id,
          slug: p.slug,
          name: p.name,
          brand: p.brand,
          price_kobo: p.price_kobo,
          currency: p.currency,
          stock: p.stock,
          image: imgs[0]?.url,
        },
      } as CartItem;
    })
    .filter(Boolean) as CartItem[];
}

export async function addToCart(productId: string, quantity: number) {
  if (quantity < 1) quantity = 1;
  const sb = await createServerClient_();
  const { data: userData } = await sb.auth.getUser();
  if (userData?.user) {
    const { data: existing } = await sb
      .from("cart_items")
      .select("id, quantity")
      .eq("user_id", userData.user.id)
      .eq("product_id", productId)
      .maybeSingle();
    if (existing) {
      await sb
        .from("cart_items")
        .update({ quantity: existing.quantity + quantity })
        .eq("id", existing.id);
    } else {
      await sb
        .from("cart_items")
        .insert({ user_id: userData.user.id, product_id: productId, quantity });
    }
    return;
  }
  const cart = readGuestCart();
  const found = cart.items.find((i) => i.product_id === productId);
  if (found) found.quantity += quantity;
  else cart.items.push({ product_id: productId, quantity });
  writeGuestCart(cart);
}

export async function updateCartItem(productId: string, quantity: number) {
  const sb = await createServerClient_();
  const { data: userData } = await sb.auth.getUser();
  if (userData?.user) {
    if (quantity <= 0) {
      await sb
        .from("cart_items")
        .delete()
        .eq("user_id", userData.user.id)
        .eq("product_id", productId);
    } else {
      await sb
        .from("cart_items")
        .update({ quantity })
        .eq("user_id", userData.user.id)
        .eq("product_id", productId);
    }
    return;
  }
  const cart = readGuestCart();
  const found = cart.items.find((i) => i.product_id === productId);
  if (!found) return;
  if (quantity <= 0) cart.items = cart.items.filter((i) => i.product_id !== productId);
  else found.quantity = quantity;
  writeGuestCart(cart);
}

export async function removeFromCart(productId: string) {
  return updateCartItem(productId, 0);
}

export async function clearCart() {
  const sb = await createServerClient_();
  const { data: userData } = await sb.auth.getUser();
  if (userData?.user) {
    await sb.from("cart_items").delete().eq("user_id", userData.user.id);
    return;
  }
  clearGuestCart();
}

export function cartTotalsKobo(items: CartItem[]) {
  const subtotal = items.reduce(
    (acc, it) => acc + (it.product?.price_kobo ?? 0) * it.quantity,
    0,
  );
  return { subtotal, total: subtotal };
}
