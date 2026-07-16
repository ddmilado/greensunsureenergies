import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle, Package, XCircle, Clock } from "@phosphor-icons/react/dist/ssr";
import { createServerClient_ } from "@/app/lib/supabase/server";
import { paystackVerify } from "@/app/lib/paystack";

export const metadata: Metadata = { title: "Order status | Green Sunsure" };
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
    } catch {
      // webhook will reconcile
    }
  }

  const formatNGN = (kobo: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(
      Math.round(kobo / 100),
    );

  return (
    <main id="main" className="overflow-x-hidden">
      <section className="px-4 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto max-w-xl py-16 text-center md:py-24">
          {status === "paid" ? (
            <>
              <div className="mx-auto grid size-20 place-items-center rounded-full bg-emerald-50 ring-1 ring-emerald-200">
                <CheckCircle size={40} weight="duotone" className="text-emerald-600" />
              </div>
              <h1 className="mt-8 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">
                Thank you — your order is paid
              </h1>
              <p className="mt-4 text-base leading-8 text-[var(--ink-600)]">
                We&rsquo;ve sent a confirmation to {order?.email}. You&rsquo;ll get tracking details when your order ships.
              </p>
              <p className="mt-3 text-xs text-[var(--ink-300)]">Reference: {reference}</p>
              <Link
                href="/account/orders"
                className="mt-10 inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-blue)]"
              >
                <Package size={18} weight="bold" />
                View my orders
              </Link>
            </>
          ) : status === "failed" ? (
            <>
              <div className="mx-auto grid size-20 place-items-center rounded-full bg-red-50 ring-1 ring-red-200">
                <XCircle size={40} weight="duotone" className="text-red-600" />
              </div>
              <h1 className="mt-8 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">
                Payment failed
              </h1>
              <p className="mt-4 text-base leading-8 text-[var(--ink-600)]">
                No charge was made. Please try again or contact us if the issue persists.
              </p>

            </>
          ) : (
            <>
              <div className="mx-auto grid size-20 place-items-center rounded-full bg-amber-50 ring-1 ring-amber-200">
                <Clock size={40} weight="duotone" className="text-amber-600" />
              </div>
              <h1 className="mt-8 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">
                Payment pending
              </h1>
              <p className="mt-4 text-base leading-8 text-[var(--ink-600)]">
                We&rsquo;re still confirming your payment. Refresh this page in a moment.
              </p>
              <p className="mt-3 text-xs text-[var(--ink-300)]">Reference: {reference}</p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
