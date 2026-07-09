import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, CreditCard, Package } from "@phosphor-icons/react/dist/ssr";
import { getOrder } from "@/app/lib/dal";
import { formatNGN } from "@/app/lib/format";
import { StatusPill } from "../../../components/StoreUI";

export const dynamic = "force-dynamic";

function formatDate(value: string): string {
  try {
    return new Date(value).toLocaleString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return value;
  }
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order: any = await getOrder(id);
  if (!order) notFound();

  return (
    <main id="main" className="overflow-x-hidden">
      <section className="px-4 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto max-w-4xl pb-16">
          <Link href="/account/orders" className="inline-flex items-center gap-2 text-sm text-[var(--ink-600)] transition hover:text-[var(--ink-950)]">
            <ArrowLeft size={16} /> All orders
          </Link>

          {/* Header */}
          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--ink-950)] md:text-4xl">
                Order #{order.id.slice(0, 8)}
              </h1>
              <p className="mt-2 text-sm text-[var(--ink-600)]">
                Placed {formatDate(order.created_at)}
              </p>
            </div>
            <StatusPill status={order.status} />
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
            {/* Items */}
            <div className="overflow-hidden rounded-[2rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]">
              <div className="rounded-[1.6rem] bg-white">
                <div className="flex items-center gap-2 border-b border-[var(--line)] p-5">
                  <Package size={20} weight="duotone" className="text-[var(--brand-blue)]" />
                  <h2 className="text-lg font-semibold tracking-[-0.02em] text-[var(--ink-950)]">Items</h2>
                </div>
                <ul className="divide-y divide-[var(--line)]">
                  {order.items?.map((it: any) => (
                    <li key={it.id} className="flex items-center justify-between p-5 text-sm">
                      <div>
                        <p className="font-medium text-[var(--ink-950)]">{it.name}</p>
                        <p className="mt-0.5 text-xs text-[var(--ink-600)]">
                          {formatNGN(it.unit_kobo)} × {it.quantity}
                        </p>
                      </div>
                      <span className="font-semibold text-[var(--ink-950)]">{formatNGN(it.line_kobo)}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-2 border-t border-[var(--line)] p-5 text-sm">
                  <div className="flex justify-between text-[var(--ink-600)]">
                    <span>Subtotal</span>
                    <span>{formatNGN(order.subtotal_kobo)}</span>
                  </div>
                  <div className="flex justify-between text-[var(--ink-600)]">
                    <span>Shipping</span>
                    <span>{order.shipping_kobo === 0 ? "Free" : formatNGN(order.shipping_kobo)}</span>
                  </div>
                  <div className="flex justify-between border-t border-[var(--line)] pt-2 text-base font-semibold text-[var(--ink-950)]">
                    <span>Total</span>
                    <span>{formatNGN(order.total_kobo)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar: shipping + payment */}
            <aside className="grid gap-4">
              {/* Shipping address */}
              <div className="rounded-2xl bg-[var(--shell)] p-5 ring-1 ring-[var(--line)]">
                <div className="flex items-center gap-2">
                  <MapPin size={18} weight="duotone" className="text-[var(--brand-blue)]" />
                  <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-600)]">
                    Shipping to
                  </h2>
                </div>
                <address className="mt-3 text-sm not-italic leading-6 text-[var(--ink-700)]">
                  {order.ship_full_name}
                  <br />
                  {order.ship_address_line1}
                  {order.ship_address_line2 ? (
                    <>
                      <br />
                      {order.ship_address_line2}
                    </>
                  ) : null}
                  <br />
                  {order.ship_city}, {order.ship_state}
                  {order.ship_postal_code ? ` ${order.ship_postal_code}` : null}
                  <br />
                  {order.ship_country}
                  <br />
                  {order.ship_phone}
                </address>
              </div>

              {/* Payment */}
              <div className="rounded-2xl bg-[var(--shell)] p-5 ring-1 ring-[var(--line)]">
                <div className="flex items-center gap-2">
                  <CreditCard size={18} weight="duotone" className="text-[var(--brand-blue)]" />
                  <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-600)]">
                    Payment
                  </h2>
                </div>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-[var(--ink-600)]">Method</dt>
                    <dd className="font-medium">Paystack</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[var(--ink-600)]">Reference</dt>
                    <dd className="font-medium text-xs">{order.paystack_reference}</dd>
                  </div>
                  {order.paid_at && (
                    <div className="flex justify-between">
                      <dt className="text-[var(--ink-600)]">Paid</dt>
                      <dd className="font-medium">{formatDate(order.paid_at)}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
