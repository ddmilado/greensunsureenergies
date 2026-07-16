import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Trash } from "@phosphor-icons/react/dist/ssr";
import { getCart } from "@/app/lib/cart";
import { formatNGN } from "@/app/lib/format";
import { removeFromCartAction, updateCartItemAction } from "@/app/lib/actions/store";
import { QuantityField } from "../components/StoreUI";

export const metadata: Metadata = { title: "Cart | Green Sunsure", alternates: { canonical: "/cart" } };
export const dynamic = "force-dynamic";

export default async function CartPage() {
  const items = await getCart();
  const subtotal = items.reduce(
    (a, it) => a + (it.product?.price_kobo ?? 0) * it.quantity,
    0,
  );
  const shipping = subtotal >= 5_000_00 ? 0 : 150_000;

  if (items.length === 0) {
    return (
      <main id="main" className="overflow-x-hidden">
        <section className="px-4 pt-24 md:px-8 md:pt-40">
          <div className="mx-auto max-w-xl py-24 text-center md:py-32">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-[var(--shell)] ring-1 ring-[var(--line)]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[var(--brand-blue)]">
                <path d="M3 3h2l2.5 12.5a2 2 0 002 1.5h8a2 2 0 002-1.5L20 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="20" r="1.5" fill="currentColor"/>
                <circle cx="17" cy="20" r="1.5" fill="currentColor"/>
              </svg>
            </div>
            <h1 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">Your cart is empty</h1>
            <p className="mx-auto mt-3 max-w-md text-base leading-7 text-[var(--ink-600)]">
              Browse the store to find solar batteries, inverters, panels, and accessories.
            </p>
            <Link
              href="/store"
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--ink-950)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-blue)]"
            >
              Browse the store
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main id="main" className="overflow-x-hidden">
      <section className="px-4 pt-24 md:px-8 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Link href="/store" className="inline-flex items-center gap-2 text-sm text-[var(--ink-600)] transition hover:text-[var(--ink-950)]">
            <ArrowLeft size={16} /> Continue shopping
          </Link>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-950)] md:text-5xl">
            Your cart
          </h1>
          <p className="mt-2 text-sm text-[var(--ink-600)]">
            {items.length} item{items.length !== 1 ? "s" : ""} in your cart
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Line items */}
            <ul className="overflow-hidden rounded-[2rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]">
              <div className="divide-y divide-[var(--line)] rounded-[1.6rem] bg-white">
                {items.map((it) => (
                  <li key={it.product_id} className="flex flex-wrap items-center gap-3 p-4 sm:flex-nowrap sm:gap-4">
                    {/* Image */}
                    <div className="size-16 shrink-0 overflow-hidden rounded-2xl bg-[var(--mist)] sm:size-20">
                      {it.product?.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={it.product.image} alt={it.product?.name ?? "Item"} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-[var(--ink-300)]">
                          No img
                        </div>
                      )}
                    </div>

                    {/* Name + price */}
                    <div className="flex-1">
                      <Link
                        href={`/store/${it.product?.slug ?? ""}`}
                        className="font-semibold tracking-[-0.02em] text-[var(--ink-950)] transition hover:text-[var(--brand-blue)]"
                      >
                        {it.product?.name ?? "Item"}
                      </Link>
                      {it.product?.brand && (
                        <p className="text-xs text-[var(--ink-600)]">{it.product.brand}</p>
                      )}
                      <p className="mt-1 text-sm text-[var(--ink-600)]">
                        {formatNGN(it.product?.price_kobo ?? 0)} each
                      </p>
                    </div>

                    {/* Quantity + remove */}
                    <div className="flex items-center gap-3">
                      <form action={updateCartItemAction} className="flex items-center gap-2">
                        <input type="hidden" name="product_id" value={it.product_id} />
                        <QuantityField
                          name="quantity"
                          defaultValue={it.quantity}
                          min={0}
                          max={99}
                        />
                        <button
                          type="submit"
                          className="rounded-full bg-[var(--ink-950)] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[var(--brand-blue)]"
                        >
                          Save
                        </button>
                      </form>
                      <form action={removeFromCartAction}>
                        <input type="hidden" name="product_id" value={it.product_id} />
                        <button
                          type="submit"
                          className="grid size-9 place-items-center rounded-full text-[var(--ink-300)] transition hover:bg-red-50 hover:text-red-600"
                          aria-label="Remove item"
                        >
                          <Trash size={18} />
                        </button>
                      </form>
                    </div>

                    {/* Line total */}
                    <div className="w-24 shrink-0 text-right">
                      <p className="font-semibold text-[var(--ink-950)]">
                        {formatNGN((it.product?.price_kobo ?? 0) * it.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </div>
            </ul>

            {/* Summary */}
            <aside className="h-fit rounded-[2rem] bg-[var(--ink-950)] p-6 text-white lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold tracking-[-0.03em]">Summary</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-white/60">Subtotal</dt>
                  <dd className="font-medium">{formatNGN(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-white/60">Shipping</dt>
                  <dd className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-[var(--solar-lime)]">Free</span>
                    ) : (
                      formatNGN(shipping)
                    )}
                  </dd>
                </div>
                {shipping > 0 && (
                  <dd className="text-xs text-white/40">
                    Free shipping on orders over {formatNGN(5_000_00)}
                  </dd>
                )}
              </dl>
              <div className="mt-5 flex justify-between border-t border-white/10 pt-4">
                <span className="text-base font-semibold">Total</span>
                <span className="text-2xl font-semibold tracking-[-0.02em]">{formatNGN(subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--solar-lime)] px-6 py-3 text-sm font-semibold text-[var(--ink-950)] transition hover:bg-white"
              >
                Checkout
                <ArrowRight size={16} weight="bold" />
              </Link>
              <p className="mt-4 text-center text-xs text-white/40">
                Secure payment via Paystack · Card, transfer, USSD
              </p>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
