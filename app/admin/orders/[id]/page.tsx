import Link from "next/link";
import { notFound } from "next/navigation";
import { formatNGN } from "@/app/lib/format";
import { adminGetOrder } from "@/app/lib/dal";
import { updateOrderStatusAction } from "@/app/lib/actions/orders";
import { Panel, StatusPill } from "../../AdminUI";

export const dynamic = "force-dynamic";
type Params = { id: string };

const STATUSES = ["pending", "paid", "failed", "shipped", "delivered", "cancelled"];

const fmt = (v: string) => {
  try {
    return new Date(v).toLocaleString("en-NG", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return v;
  }
};

function TimelineStep({ label, time, done, last }: { label: string; time?: string; done: boolean; last?: boolean }) {
  return (
    <li className="flex gap-3">
      <span className="relative grid place-items-center">
        <span
          className={`size-2.5 rounded-full ring-4 ${
            done ? "bg-[var(--brand-green)] ring-[var(--brand-green)]/15" : "bg-[var(--ink-300)] ring-[var(--line)]"
          }`}
        />
        {!last && <span className={`absolute top-3.5 h-[calc(100%+0.75rem)] w-px ${done ? "bg-[var(--brand-green)]/40" : "bg-[var(--line)]"}`} />}
      </span>
      <span className="pb-5">
        <span className={`block text-sm ${done ? "font-semibold text-[var(--ink-950)]" : "text-[var(--ink-300)]"}`}>{label}</span>
        {time && <span className="tnum mt-0.5 block text-xs text-[var(--ink-600)]">{time}</span>}
      </span>
    </li>
  );
}

export default async function AdminOrderDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const order = await adminGetOrder(id);
  if (!order) notFound();

  const items = (order.items ?? []) as any[];
  const paid = order.status === "paid" || order.status === "shipped" || order.status === "delivered";

  return (
    <div>
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink-600)] transition hover:text-[var(--ink-950)]"
      >
        ← All orders
      </Link>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--ink-950)] md:text-3xl">
            Order #{order.id.slice(0, 8)}
          </h1>
          <p className="tnum mt-1.5 font-mono text-xs text-[var(--ink-600)]">{order.paystack_reference}</p>
        </div>
        <StatusPill status={order.status} />
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_340px]">
        {/* Items */}
        <div className="grid gap-5">
          <Panel title={`Items · ${items.reduce((a: number, it: any) => a + (it.quantity ?? 1), 0)}`}>
            <ul className="divide-y divide-[var(--line)]">
              {items.map((it) => (
                <li key={it.id} className="flex items-center justify-between gap-4 px-5 py-3.5 md:px-6">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-[var(--ink-950)]">{it.name}</p>
                    <p className="tnum mt-0.5 text-xs text-[var(--ink-600)]">
                      {formatNGN(it.unit_kobo)} × {it.quantity}
                    </p>
                  </div>
                  <p className="tnum whitespace-nowrap font-semibold text-[var(--ink-950)]">{formatNGN(it.line_kobo)}</p>
                </li>
              ))}
            </ul>
            <dl className="tnum space-y-1.5 border-t border-[var(--line)] bg-[var(--panel-muted)] px-5 py-4 text-sm md:px-6">
              <div className="flex justify-between text-[var(--ink-600)]">
                <dt>Subtotal</dt>
                <dd>{formatNGN(order.subtotal_kobo)}</dd>
              </div>
              <div className="flex justify-between text-[var(--ink-600)]">
                <dt>Shipping</dt>
                <dd>{order.shipping_kobo === 0 ? "Free" : formatNGN(order.shipping_kobo)}</dd>
              </div>
              <div className="flex justify-between border-t border-[var(--line)] pt-2 text-base font-semibold text-[var(--ink-950)]">
                <dt>Total</dt>
                <dd>{formatNGN(order.total_kobo)}</dd>
              </div>
            </dl>
          </Panel>

          {/* Timeline */}
          <Panel title="Progress">
            <ul className="px-5 pt-4 md:px-6">
              <TimelineStep label="Order placed" time={fmt(order.created_at)} done />
              <TimelineStep label="Payment confirmed" time={order.paid_at ? fmt(order.paid_at) : undefined} done={paid} />
              <TimelineStep label="Shipped" done={order.status === "shipped" || order.status === "delivered"} />
              <TimelineStep label="Delivered" done={order.status === "delivered"} last />
            </ul>
          </Panel>
        </div>

        {/* Customer + status */}
        <div className="grid gap-5">
          <Panel title="Customer">
            <dl className="tnum space-y-2.5 px-5 py-4 text-sm md:px-6">
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--ink-600)]">Name</dt>
                <dd className="text-right font-medium text-[var(--ink-950)]">{order.ship_full_name ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--ink-600)]">Email</dt>
                <dd className="text-right font-medium text-[var(--ink-950)]">{order.email}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--ink-600)]">Phone</dt>
                <dd className="text-right font-medium text-[var(--ink-950)]">{order.ship_phone ?? "—"}</dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="shrink-0 text-[var(--ink-600)]">Address</dt>
                <dd className="text-right font-medium text-[var(--ink-950)]">
                  {[order.ship_address_line1, order.ship_city, order.ship_state].filter(Boolean).join(", ") || "—"}
                </dd>
              </div>
            </dl>
          </Panel>

          <Panel title="Update status">
            <form action={updateOrderStatusAction} className="grid gap-3 px-5 py-4 md:px-6">
              <input type="hidden" name="id" value={order.id} />
              <div className="flex gap-2">
                <select
                  name="status"
                  defaultValue={order.status}
                  className="min-h-10 flex-1 rounded-full border border-[var(--line)] bg-[var(--panel-muted)] px-3.5 text-sm font-medium capitalize text-[var(--ink-950)] outline-none transition focus:border-[var(--brand-green)] focus:ring-2 focus:ring-[var(--ring)]"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="rounded-full bg-[var(--surface)] px-4 py-2.5 text-xs font-semibold text-white transition duration-500 ease-[var(--ease-out-heavy)] hover:bg-[var(--brand-blue)] active:scale-[0.96]"
                >
                  Update
                </button>
              </div>
              {order.paid_at && (
                <p className="tnum text-xs text-[var(--ink-300)]">Paid {fmt(order.paid_at)}</p>
              )}
            </form>
          </Panel>
        </div>
      </div>
    </div>
  );
}
