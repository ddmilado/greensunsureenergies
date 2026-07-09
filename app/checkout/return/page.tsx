import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerClient_ } from "@/app/lib/supabase/server";
import { paystackVerify } from "@/app/lib/paystack";

export const metadata = { title: "Order complete | Damdavy" };
export const dynamic = "force-dynamic";

export default async function CheckoutReturnPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string; trxref?: string }>;
}) {
  const sp = await searchParams;
  const reference = sp.reference ?? sp.trxref;
  if (!reference) redirect("/");

  const sb = await createServerClient_();
  const { data: order } = await sb
    .from("orders")
    .select("id, status, total_kobo, email, paystack_reference, paid_at")
    .eq("paystack_reference", reference)
    .maybeSingle();

  // Verify with Paystack. If successful but the DB hasn't been updated yet
  // (e.g. webhook not delivered), update here too as a fallback.
  let status = order?.status ?? "pending";
  if (order && order.status === "pending") {
    try {
      const verify = await paystackVerify(reference);
      if (verify.status && verify.data.status === "success") {
        await sb
          .from("orders")
          .update({ status: "paid", paid_at: new Date().toISOString() })
          .eq("id", order.id);
        await sb.from("payment_events").insert({
          order_id: order.id,
          reference,
          event: "verify.success",
          payload: verify as unknown as object,
        });
        status = "paid";
      } else if (verify.data.status === "failed") {
        await sb.from("orders").update({ status: "failed" }).eq("id", order.id);
        status = "failed";
      }
    } catch (e) {
      // ignore — webhook will reconcile
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-center">
      {status === "paid" ? (
        <>
          <h1 className="text-3xl font-semibold tracking-tight">Thank you — your order is paid</h1>
          <p className="mt-3 text-sm text-neutral-600">
            We've sent a confirmation to {order?.email}. You'll get tracking details when your order ships.
          </p>
          <p className="mt-1 text-xs text-neutral-500">Reference: {reference}</p>
          <Link href="/account/orders" className="mt-8 inline-block rounded-md bg-black px-5 py-3 text-sm font-medium text-white">
            View my orders
          </Link>
        </>
      ) : status === "failed" ? (
        <>
          <h1 className="text-3xl font-semibold tracking-tight">Payment failed</h1>
          <p className="mt-3 text-sm text-neutral-600">No charge was made. Please try again.</p>
          <Link href="/cart" className="mt-8 inline-block rounded-md bg-black px-5 py-3 text-sm font-medium text-white">
            Back to cart
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-semibold tracking-tight">Payment pending</h1>
          <p className="mt-3 text-sm text-neutral-600">
            We're still confirming your payment. Refresh this page in a moment.
          </p>
          <p className="mt-1 text-xs text-neutral-500">Reference: {reference}</p>
        </>
      )}
    </main>
  );
}
