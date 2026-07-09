import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Package } from "@phosphor-icons/react/dist/ssr";
import { listUserOrders } from "@/app/lib/dal";
import { formatNGN } from "@/app/lib/format";
import { StatusPill } from "../../components/StoreUI";

export const metadata: Metadata = { title: "My orders | Damdavy", alternates: { canonical: "/account/orders" } };
export const dynamic = "force-dynamic";

function formatDate(value: string): string {
  try {
    return new Date(value).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return value;
  }
}

export default async function OrdersPage() {
  const orders = (await listUserOrders()) as any[];

  return (
    <main id="main" className="overflow-x-hidden">
      <section className="px-4 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto max-w-4xl pb-16">
          <Link href="/account" className="inline-flex items-center gap-2 text-sm text-[var(--ink-600)] transition hover:text-[var(--ink-950)]">
            <ArrowLeft size={16} /> Account
          </Link>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-950)] md:text-5xl">
            My orders
          </h1>

          {orders.length === 0 ? (
            <div className="mt-10 rounded-[2rem] bg-[var(--shell)] p-12 text-center ring-1 ring-[var(--line)]">
              <Package size={48} weight="duotone" className="mx-auto text-[var(--ink-300)]" />
              <h2 className="mt-4 text-lg font-semibold text-[var(--ink-950)]">No orders yet</h2>
              <p className="mt-2 text-sm text-[var(--ink-600)]">
                When you buy something, it&rsquo;ll show up here with full tracking.
              </p>
              <Link
                href="/store"
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--ink-950)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-blue)]"
              >
                Browse the store
              </Link>
            </div>
          ) : (
            <ul className="mt-8 grid gap-4">
              {orders.map((o) => (
                <li key={o.id}>
                  <Link
                    href={`/account/orders/${o.id}`}
                    className="group flex items-center gap-4 rounded-[2rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)] transition hover:ring-[var(--brand-blue)]/30"
                  >
                    <div className="flex flex-1 items-center gap-4 rounded-[1.6rem] bg-white p-5">
                      <div className="grid size-12 shrink-0 place-items-center rounded-full bg-[var(--ink-950)] text-white">
                        <Package size={22} weight="duotone" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-[var(--ink-600)]">{formatDate(o.created_at)}</p>
                        <p className="font-semibold tracking-[-0.02em] text-[var(--ink-950)]">
                          {o.items?.length ?? 0} item{(o.items?.length ?? 0) !== 1 ? "s" : ""} · {formatNGN(o.total_kobo)}
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--ink-300)]">Ref: {o.paystack_reference}</p>
                      </div>
                      <StatusPill status={o.status} />
                      <span className="text-sm font-semibold text-[var(--brand-blue)] transition group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
