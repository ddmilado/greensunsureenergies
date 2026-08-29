import Link from "next/link";
import { notFound } from "next/navigation";
import { formatNGN } from "@/app/lib/format";
import { adminGetOrder } from "@/app/lib/dal";
import { updateOrderStatusAction } from "@/app/lib/actions/orders";

export const dynamic = "force-dynamic";
type Params = { id: string };

const STATUSES = ["pending", "paid", "failed", "shipped", "delivered", "cancelled"];

function statusColor(status: string): string {
  switch (status) {
    case "paid":
    case "delivered":
      return "bg-emerald-100 text-emerald-800";
    case "shipped":
      return "bg-sky-100 text-sky-800";
    case "failed":
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-amber-100 text-amber-800";
  }
}

export default async function AdminOrderDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const order = await adminGetOrder(id);
  if (!order) notFound();

  const items = (order.items ?? []) as any[];

  return (
    <div>
      <Link href="/admin/orders" className="text-sm text-neutral-500 hover:underline">
        ← All orders
      </Link>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Order</h1>
          <p className="mt-1 font-mono text-xs text-neutral-500">{order.paystack_reference}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${statusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Items */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">Items</h2>
          <ul className="mt-4 divide-y divide-neutral-100">
            {items.map((it) => (
              <li key={it.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="font-medium text-neutral-900">{it.name}</p>
                  <p className="text-xs text-neutral-500">
                    {formatNGN(it.unit_kobo)} × {it.quantity}
                  </p>
                </div>
                <p className="font-medium">{formatNGN(it.line_kobo)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1 border-t border-neutral-100 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-neutral-500">Subtotal</dt>
              <dd>{formatNGN(order.subtotal_kobo)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-500">Shipping</dt>
              <dd>{formatNGN(order.shipping_kobo)}</dd>
            </div>
            <div className="flex justify-between font-semibold">
              <dt>Total</dt>
              <dd>{formatNGN(order.total_kobo)}</dd>
            </div>
          </dl>
        </div>

        {/* Customer + status */}
        <div className="grid gap-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">Customer</h2>
            <dl className="mt-3 space-y-1 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-neutral-500">Name</dt>
                <dd className="text-right font-medium">{order.ship_full_name ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-neutral-500">Email</dt>
                <dd className="text-right font-medium">{order.email}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-neutral-500">Phone</dt>
                <dd className="text-right font-medium">{order.ship_phone ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-neutral-500">Address</dt>
                <dd className="text-right font-medium">
                  {[order.ship_address_line1, order.ship_city, order.ship_state].filter(Boolean).join(", ") || "—"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">Update status</h2>
            <form action={updateOrderStatusAction} className="mt-3 flex items-center gap-2">
              <input type="hidden" name="id" value={order.id} />
              <select name="status" defaultValue={order.status} className="rounded-md border border-neutral-300 bg-white px-2 py-2 text-sm">
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button type="submit" className="rounded-md border border-neutral-900 px-3 py-2 text-xs font-semibold hover:bg-neutral-900 hover:text-white">
                Update
              </button>
            </form>
            {order.paid_at && (
              <p className="mt-3 text-xs text-neutral-500">Paid at {new Date(order.paid_at).toLocaleString("en-NG")}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
