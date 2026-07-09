"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { addToCart, removeFromCart, updateCartItem, getCart, clearCart } from "../cart";
import { createServerClient_ } from "../supabase/server";
import { paystackInitialize } from "../paystack";
import { getSessionUser } from "../dal";

const AddSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.coerce.number().int().min(1).max(99),
});

export async function addToCartAction(formData: FormData) {
  const parsed = AddSchema.safeParse({
    product_id: formData.get("product_id"),
    quantity: formData.get("quantity") ?? 1,
  });
  if (!parsed.success) return;
  await addToCart(parsed.data.product_id, parsed.data.quantity);
  revalidatePath("/cart");
  revalidatePath("/store");
}

const UpdateSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.coerce.number().int().min(0).max(99),
});

export async function updateCartItemAction(formData: FormData) {
  const parsed = UpdateSchema.safeParse({
    product_id: formData.get("product_id"),
    quantity: formData.get("quantity"),
  });
  if (!parsed.success) return;
  await updateCartItem(parsed.data.product_id, parsed.data.quantity);
  revalidatePath("/cart");
}

export async function removeFromCartAction(formData: FormData) {
  const id = formData.get("product_id");
  if (typeof id !== "string") return;
  await removeFromCart(id);
  revalidatePath("/cart");
}

const CheckoutSchema = z.object({
  email: z.email(),
  full_name: z.string().min(2),
  phone: z.string().min(7),
  address1: z.string().min(3),
  address2: z.string().optional().default(""),
  city: z.string().min(2),
  state: z.string().min(2),
  postal_code: z.string().optional().default(""),
});

export async function startCheckoutAction(_prev: unknown, formData: FormData) {
  const parsed = CheckoutSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }
  const items = await getCart();
  if (!items.length) {
    return { message: "Your cart is empty." };
  }
  const subtotal = items.reduce(
    (a, it) => a + (it.product?.price_kobo ?? 0) * it.quantity,
    0,
  );
  const shipping = subtotal >= 5_000_00 ? 0 : 150_000; // free over ₦5,000, else ₦1,500
  const total = subtotal + shipping;
  const reference = `dd_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

  const sb = await createServerClient_();
  const user = await getSessionUser();
  const { data: order, error } = await sb
    .from("orders")
    .insert({
      user_id: user?.id ?? null,
      email: parsed.data.email,
      status: "pending",
      subtotal_kobo: subtotal,
      shipping_kobo: shipping,
      total_kobo: total,
      currency: "NGN",
      ship_full_name: parsed.data.full_name,
      ship_phone: parsed.data.phone,
      ship_address_line1: parsed.data.address1,
      ship_address_line2: parsed.data.address2,
      ship_city: parsed.data.city,
      ship_state: parsed.data.state,
      ship_postal_code: parsed.data.postal_code,
      ship_country: "Nigeria",
      paystack_reference: reference,
    })
    .select("id")
    .single();
  if (error || !order) {
    return { message: "Could not create order. Please try again." };
  }
  const itemsPayload = items.map((it) => ({
    order_id: order.id,
    product_id: it.product_id,
    name: it.product?.name ?? "Item",
    unit_kobo: it.product?.price_kobo ?? 0,
    quantity: it.quantity,
    line_kobo: (it.product?.price_kobo ?? 0) * it.quantity,
  }));
  const { error: itemsError } = await sb.from("order_items").insert(itemsPayload);
  if (itemsError) {
    return { message: "Could not save order items." };
  }

  const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/return?reference=${reference}`;
  let init;
  try {
    init = await paystackInitialize({
      email: parsed.data.email,
      amountKobo: total,
      reference,
      callbackUrl,
      metadata: { order_id: order.id, items: itemsPayload.map((i) => ({ id: i.product_id, qty: i.quantity })) },
    });
  } catch (e) {
    return { message: (e as Error).message };
  }

  await sb
    .from("orders")
    .update({ paystack_authorization_url: init.data.authorization_url })
    .eq("id", order.id);

  await clearCart();
  redirect(init.data.authorization_url);
}
