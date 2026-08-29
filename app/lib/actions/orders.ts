"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createAdminClient } from "../supabase/server";
import { getSessionUser } from "../dal";

const OrderStatusSchema = z.enum([
  "pending",
  "paid",
  "failed",
  "shipped",
  "delivered",
  "cancelled",
]);

export async function updateOrderStatusAction(formData: FormData) {
  const id = formData.get("id");
  const status = formData.get("status");
  if (typeof id !== "string" || typeof status !== "string") return;
  const parsed = OrderStatusSchema.safeParse(status);
  if (!parsed.success) return;

  const u = await getSessionUser();
  if (!u) redirect("/login?next=/admin");
  if (!u.isAdmin) redirect("/account");

  const admin = createAdminClient();
  const { error } = await admin.from("orders").update({ status: parsed.data }).eq("id", id);
  if (error) return;
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
}
