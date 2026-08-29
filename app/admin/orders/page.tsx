import Link from "next/link";
import { formatNGN } from "@/app/lib/format";
import { adminListOrders } from "@/app/lib/dal";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin · Orders | Green Sunsure" };

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

export default async function AdminOrdersPage() {
  const orders = await adminListOrders();
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Orders</h1>
      <p className="mt-1 text-sm text-neutral-500">Customer purchases via Paystack checkout.</p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-xs uppercase tracking-wider text-neutral-500">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {orders.map((o: any) => (
              <tr key={o.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/orders/${o.id}`} className="font-medium text-neutral-900 hover:underline">
                    {o.ship_full_name || o.email}
                  </Link>
                  <div className="text-xs text-neutral-500">{o.email}</div>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-neutral-600">{o.paystack_reference}</td>
                <td className="px-4 py-3 text-right font-medium">{formatNGN(o.total_kobo)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${statusColor(o.status)}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-neutral-500">
                  {new Date(o.created_at).toLocaleString("en-NG")}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">
                  No orders yet. Completed checkouts will appear here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
