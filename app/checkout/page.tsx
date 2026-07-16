import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Lock, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { getCart } from "@/app/lib/cart";
import { getSessionUser } from "@/app/lib/dal";
import { formatNGN } from "@/app/lib/format";
import { CheckoutForm } from "./CheckoutForm";

export const metadata: Metadata = { title: "Checkout | Green Sunsure", alternates: { canonical: "/checkout" } };
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const [items, user] = await Promise.all([getCart(), getSessionUser()]);
  if (items.length === 0) redirect("/cart");
  if (!user) redirect(`/login?next=/checkout`);

  const subtotal = items.reduce(
    (a, it) => a + (it.product?.price_kobo ?? 0) * it.quantity,
    0,
  );
  const shipping = subtotal >= 5_000_00 ? 0 : 150_000;
  const total = subtotal + shipping;

  return (
    <main id="main" className="overflow-x-hidden">
      <section className="px-4 pt-24 md:px-8 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-950)] md:text-5xl">
            Checkout
          </h1>
          <p className="mt-2 text-sm text-[var(--ink-600)]">
            Signed in as {user.email}
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Form */}
            <CheckoutForm />

            {/* Summary */}
            <aside className="h-fit overflow-hidden rounded-[2rem] bg-[var(--ink-950)] p-6 text-white lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold tracking-[-0.03em]">Order summary</h2>
              <ul className="mt-5 space-y-3 text-sm">
                {items.map((it) => (
                  <li key={it.product_id} className="flex gap-3">
                    <div className="size-12 shrink-0 overflow-hidden rounded-xl bg-white/10">
                      {it.product?.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={it.product.image} alt={it.product?.name ?? "Item"} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="line-clamp-1 font-medium">{it.product?.name ?? "Item"}</p>
                      <p className="text-xs text-white/50">Qty {it.quantity}</p>
                    </div>
                    <span className="font-medium">
                      {formatNGN((it.product?.price_kobo ?? 0) * it.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Subtotal</span>
                  <span className="font-medium">{formatNGN(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? <span className="text-[var(--solar-lime)]">Free</span> : formatNGN(shipping)}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex justify-between border-t border-white/10 pt-4">
                <span className="text-base font-semibold">Total</span>
                <span className="text-2xl font-semibold tracking-[-0.02em]">{formatNGN(total)}</span>
              </div>
              <div className="mt-5 flex items-center gap-2 rounded-2xl bg-white/8 px-4 py-3 text-xs text-white/60">
                <Lock size={16} weight="fill" className="shrink-0 text-[var(--solar-lime)]" />
                You&rsquo;ll be redirected to Paystack to complete payment. We accept cards, bank transfer, and USSD.
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
