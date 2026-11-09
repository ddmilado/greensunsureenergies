import { formatNGN } from "@/app/lib/format";
import { adminListOrders } from "@/app/lib/dal";
import { AdminHeader, AdminTable, AdminEmpty, StatusPill, Panel } from "../AdminUI";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin · Orders | Green Sunsure" };

const fmtDate = (v: string) => {
  try {
    return new Date(v).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return v;
  }
};

export default async function AdminOrdersPage() {
  const orders = await adminListOrders();
  const pending = orders.filter((o: any) => o.status === "pending").length;

  return (
    <div>
      <AdminHeader
        eyebrow="Commerce"
        title="Orders"
        description="Every Paystack checkout, newest first."
        action={
          pending > 0 ? (
            <span className="tnum inline-flex items-center gap-2 rounded-full bg-amber-50 px-3.5 py-2 text-xs font-semibold text-amber-800 ring-1 ring-amber-300/60">
              <span className="size-1.5 rounded-full bg-amber-500" />
              {pending} pending
            </span>
          ) : null
        }
      />

      <div className="mt-6">
        {orders.length === 0 ? (
          <Panel>
            <AdminEmpty
              title="No orders yet"
              body="Completed checkouts will appear here with customer, reference, and status."
            />
          </Panel>
        ) : (
          <Panel>
            <AdminTable head={["Customer", "Reference", "Total", "Status", "Date"]} colSpan={5} count={orders.length}>
              {orders.map((o: any) => (
                <tr key={o.id} className="transition hover:bg-[var(--panel-muted)]">
                  <td className="px-4 py-3.5 md:px-5">
                    <a
                      href={`/admin/orders/${o.id}`}
                      className="block font-semibold text-[var(--ink-950)] hover:underline"
                    >
                      {o.ship_full_name || o.email}
                    </a>
                    <span className="mt-0.5 block text-xs text-[var(--ink-600)]">{o.email}</span>
                  </td>
                  <td className="tnum font-mono text-xs text-[var(--ink-600)] md:px-5">{o.paystack_reference}</td>
                  <td className="tnum whitespace-nowrap px-4 py-3.5 text-right font-semibold">{formatNGN(o.total_kobo)}</td>
                  <td className="px-4 py-3.5 md:px-5">
                    <StatusPill status={o.status} />
                  </td>
                  <td className="tnum whitespace-nowrap px-4 py-3.5 text-xs text-[var(--ink-600)] md:px-5">
                    {fmtDate(o.created_at)}
                  </td>
                </tr>
              ))}
            </AdminTable>
          </Panel>
        )}
      </div>
    </div>
  );
}
