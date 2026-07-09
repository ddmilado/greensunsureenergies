// Paystack webhook. Verifies signature, looks up order, marks paid.
import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/app/lib/supabase/server";
import { verifyPaystackSignature } from "@/app/lib/paystack";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const sig = req.headers.get("x-paystack-signature");
  if (!verifyPaystackSignature(raw, sig)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let body: { event?: string; data?: { reference?: string; status?: string; amount?: number; paid_at?: string; channel?: string; metadata?: Record<string, unknown> } };
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
  }

  const event = body.event ?? "unknown";
  const ref = body.data?.reference;
  if (!ref) return NextResponse.json({ ok: true });

  const admin = createAdminClient();
  const { data: order } = await admin
    .from("orders")
    .select("id, status")
    .eq("paystack_reference", ref)
    .maybeSingle();

  await admin.from("payment_events").insert({
    order_id: order?.id ?? null,
    reference: ref,
    event,
    payload: body as unknown as object,
  });

  if (event === "charge.success" && order) {
    await admin
      .from("orders")
      .update({
        status: "paid",
        paid_at: body.data?.paid_at ?? new Date().toISOString(),
      })
      .eq("id", order.id);
  } else if ((event === "charge.failed" || event === "charge.abandoned") && order && order.status === "pending") {
    await admin.from("orders").update({ status: "failed" }).eq("id", order.id);
  }

  return NextResponse.json({ ok: true });
}
