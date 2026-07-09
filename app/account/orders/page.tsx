import Link from "next/link";
import { listUserOrders } from "@/app/lib/dal";
import { formatNGN } from "@/app/lib/format";

export const metadata = { title: "My orders | Damdavy" };
export const dynamic = "force-dynamic";

const statusColor: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  paid: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-neutral-200 text-neutral-700",
};

export default async function OrdersPage() {
  const orders = (await listUserOrders()) as any[];
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">My orders</h1>
      {orders.length === 0 ? (
        <p className="mt-4 text-sm text-neutral-500">You haven't placed any orders yet.</p>
      ) : (
        <ul className="mt-8 divide-y divide-neutral-200 border-t border-b border-neutral-200">
          {orders.map((o) => (
            <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div>
                <p className="text-xs text-neutral-500">{new Date(o.created_at).toLocaleString()}</p>
                <p className="text-sm font-medium">{o.items?.length ?? 0} item(s) · {formatNGN(o.total_kobo)}</p>
                <p className="text-xs text-neutral-500">Ref: {o.paystack_reference}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColor[o.status] ?? "bg-neutral-100"}`}>
                {o.status}
              </span>
              <Link href={`/account/orders/${o.id}`} className="text-sm underline">View</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
