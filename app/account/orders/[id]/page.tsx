import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrder } from "@/app/lib/dal";
import { formatNGN } from "@/app/lib/format";

export const dynamic = "force-dynamic";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order: any = await getOrder(id);
  if (!order) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/account/orders" className="text-sm underline">← All orders</Link>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Order #{order.id.slice(0, 8)}</h1>
      <p className="mt-1 text-sm text-neutral-500">Placed {new Date(order.created_at).toLocaleString()}</p>
      <p className="mt-1 text-sm">Status: <span className="font-medium">{order.status}</span></p>
      {order.paid_at && <p className="text-sm text-neutral-500">Paid {new Date(order.paid_at).toLocaleString()}</p>}

      <ul className="mt-8 divide-y divide-neutral-200 border-t border-b border-neutral-200">
        {order.items?.map((it: any) => (
          <li key={it.id} className="flex justify-between py-3 text-sm">
            <span>{it.name} × {it.quantity}</span>
            <span>{formatNGN(it.line_kobo)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-right text-sm">
        <p>Subtotal: {formatNGN(order.subtotal_kobo)}</p>
        <p>Shipping: {formatNGN(order.shipping_kobo)}</p>
        <p className="mt-2 text-lg font-semibold">Total: {formatNGN(order.total_kobo)}</p>
      </div>

      <section className="mt-10">
        <h2 className="text-sm font-medium">Shipping to</h2>
        <address className="not-italic text-sm text-neutral-700">
          {order.ship_full_name}<br />
          {order.ship_address_line1}{order.ship_address_line2 ? `, ${order.ship_address_line2}` : null}<br />
          {order.ship_city}, {order.ship_state}{order.ship_postal_code ? ` ${order.ship_postal_code}` : null}<br />
          {order.ship_country}<br />
          {order.ship_phone}
        </address>
      </section>
    </main>
  );
}
