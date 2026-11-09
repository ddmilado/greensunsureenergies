import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Lock, Truck, ShieldCheck, Headset } from "@phosphor-icons/react/dist/ssr";
import { getCart } from "@/app/lib/cart";
import { getSessionUser } from "@/app/lib/dal";
import { formatNGN } from "@/app/lib/format";
import { site } from "../data/site";
import { CheckoutForm } from "./CheckoutForm";

export const metadata: Metadata = { title: "Checkout | Green Sunsure", alternates: { canonical: "/checkout" } };
export const dynamic = "force-dynamic";

const FREE_SHIPPING = 5_000_00;

function Step({ n, label, state }: { n: string; label: string; state: "done" | "current" | "next" }) {
  return (
    <div className={`flex items-center gap-2.5 ${state === "next" ? "opacity-45" : ""}`}>
      <span
        className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
          state === "done"
            ? "bg-[var(--brand-green)] text-[var(--ink-950)]"
            : state === "current"
              ? "bg-[var(--surface)] text-white"
              : "bg-[var(--mist)] text-[var(--ink-600)] ring-1 ring-[var(--line)]"
        }`}
      >
        {state === "done" ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
            <path d="m4 12.5 5.5 5L20 5.5" />
          </svg>
        ) : (
          n
        )}
      </span>
      <span className={`text-xs font-semibold tracking-[0.02em] sm:text-sm ${state === "current" ? "text-[var(--ink-950)]" : "text-[var(--ink-600)]"}`}>
        {label}
      </span>
      {/* connector */}
    </div>
  );
}

function Steps() {
  return (
    <div className="flex items-center gap-3 sm:gap-5">
      <Step n="1" label="Cart" state="done" />
      <span className="h-px w-6 flex-1 bg-[var(--line)] sm:w-10" />
      <Step n="2" label="Delivery details" state="current" />
      <span className="h-px w-6 flex-1 bg-[var(--line)] sm:w-10" />
      <Step n="3" label="Pay" state="next" />
    </div>
  );
}

export default async function CheckoutPage() {
  const [items, user] = await Promise.all([getCart(), getSessionUser()]);
  if (items.length === 0) redirect("/cart");
  if (!user) redirect(`/login?next=/checkout`);

  const subtotal = items.reduce(
    (a, it) => a + (it.product?.price_kobo ?? 0) * it.quantity,
    0,
  );
  const shipping = subtotal >= FREE_SHIPPING ? 0 : 150_000;
  const total = subtotal + shipping;
  const toFree = FREE_SHIPPING - subtotal;

  return (
    <main id="main" className="overflow-x-hidden">
      <section className="px-4 pt-24 md:px-8 md:pt-36">
        <div className="mx-auto max-w-6xl pb-16">
          <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-[var(--ink-600)] transition hover:text-[var(--ink-950)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
              <path d="M19 12H5m0 0 6 6m-6-6 6-6" />
            </svg>
            Back to cart
          </Link>

          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-950)] md:text-5xl">
            Checkout
          </h1>
          <p className="mt-2 text-sm text-[var(--ink-600)]">Signed in as {user.email}</p>

          <div className="mt-8">
            <Steps />
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <CheckoutForm
              defaults={{ full_name: user.fullName ?? undefined, email: user.email }}
              submitLabel={`Pay ${formatNGN(total)} with Paystack`}
            />

            {/* Summary */}
            <aside className="grid lg:h-fit lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[2rem] bg-[var(--surface)] text-white">
                <div
                  aria-hidden
                  className="pointer-events-none h-32 opacity-25"
                  style={{
                    background:
                      "radial-gradient(24rem 10rem at 85% -50%, rgba(0,230,118,0.8), transparent 70%)",
                  }}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold tracking-[-0.03em]">Order summary</h2>
                    <span className="tnum rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/75 ring-1 ring-white/15">
                      {items.reduce((a, it) => a + it.quantity, 0)} items
                    </span>
                  </div>
                  <ul className="mt-5 space-y-3 text-sm">
                    {items.map((it) => (
                      <li key={it.product_id} className="flex gap-3">
                        <div className="size-12 shrink-0 overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10">
                          {it.product?.image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={it.product.image} alt={it.product?.name ?? "Item"} className="h-full w-full object-cover" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-1 font-medium">{it.product?.name ?? "Item"}</p>
                          <p className="tnum text-xs text-white/50">Qty {it.quantity}</p>
                        </div>
                        <span className="tnum font-medium">
                          {formatNGN((it.product?.price_kobo ?? 0) * it.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {shipping > 0 && (
                    <div className="mt-5">
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-[var(--solar-lime)] transition-all"
                          style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%` }}
                        />
                      </div>
                      <p className="tnum mt-2 text-xs text-white/55">
                        Spend {formatNGN(toFree)} more to unlock free delivery
                      </p>
                    </div>
                  )}

                  <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Subtotal</span>
                      <span className="tnum font-medium">{formatNGN(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Shipping</span>
                      <span className="tnum font-medium">
                        {shipping === 0 ? <span className="text-[var(--solar-lime)]">Free</span> : formatNGN(shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-3">
                      <span className="text-base font-semibold">Total</span>
                      <span className="tnum text-2xl font-semibold tracking-[-0.02em]">{formatNGN(total)}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-white/[0.04] text-center">
                  <div className="flex flex-col items-center gap-1 px-2 py-4">
                    <Lock size={16} weight="duotone" className="text-[var(--solar-lime)]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60">Secured</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 px-2 py-4">
                    <Truck size={16} weight="duotone" className="text-[var(--solar-lime)]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60">Nationwide</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 px-2 py-4">
                    <ShieldCheck size={16} weight="duotone" className="text-[var(--solar-lime)]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60">Warranty</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-start gap-2.5 rounded-2xl bg-white p-4 text-xs leading-5 text-[var(--ink-600)] ring-1 ring-[var(--line)]">
                <Headset size={16} weight="duotone" className="mt-0.5 shrink-0 text-[var(--brand-blue)]" />
                <p>
                  Questions about your order?{" "}
                  <a href={site.whatsapp} className="font-semibold text-[var(--brand-blue)] hover:underline">
                    Chat with us on WhatsApp
                  </a>{" "}
                  — we usually reply within minutes.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
