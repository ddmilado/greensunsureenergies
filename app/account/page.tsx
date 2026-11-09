import type { Metadata } from "next";
import Link from "next/link";
import { UserCircle, Package, SignOut, ArrowRight, GearSix, Receipt } from "@phosphor-icons/react/dist/ssr";
import { logoutAction } from "@/app/lib/actions/auth";
import { getSessionUser, listUserOrders } from "@/app/lib/dal";
import { formatNGN } from "@/app/lib/format";

export const metadata: Metadata = { title: "My account | Green Sunsure", alternates: { canonical: "/account" } };
export const dynamic = "force-dynamic";

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ welcome?: string }> }) {
  const [sp, user] = await Promise.all([searchParams, getSessionUser()]);
  if (!user) return null;
  const orders = (await listUserOrders().catch(() => [])) as any[];
  const orderCount = orders.length;
  const spend = orders
    .filter((o) => o.status !== "failed" && o.status !== "cancelled")
    .reduce((a, o) => a + (o.total_kobo ?? 0), 0);
  const initials = (user.fullName ?? user.email)
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <main id="main" className="overflow-x-hidden">
      <section className="px-4 pt-24 md:px-8 md:pt-36">
        <div className="mx-auto max-w-5xl pb-16">
          {sp.welcome === "1" && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800 ring-1 ring-emerald-200">
              <UserCircle size={24} weight="duotone" />
              Welcome to Green Sunsure, {user.fullName}. Your account has been created.
            </div>
          )}

          {/* Header band */}
          <div className="relative overflow-hidden rounded-[2rem] bg-[var(--surface)] p-6 text-white md:p-8">
            <div
              aria-hidden
              className="energy-grid pointer-events-none absolute inset-0 opacity-60"
            />
            <div className="relative flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <span className="grid size-16 shrink-0 place-items-center rounded-full bg-[var(--solar-lime)] text-xl font-bold text-[var(--ink-950)] ring-4 ring-[var(--solar-lime)]/25">
                  {initials || <UserCircle size={32} weight="duotone" />}
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">My account</p>
                  <h1 className="mt-0.5 text-2xl font-semibold tracking-[-0.04em] md:text-3xl">{user.fullName}</h1>
                  <p className="mt-0.5 text-sm text-white/60">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] ${
                    user.isAdmin
                      ? "bg-[var(--solar-lime)] text-[var(--ink-950)]"
                      : "bg-white/10 text-white/80 ring-1 ring-white/15"
                  }`}
                >
                  {user.isAdmin ? "Administrator" : "Customer"}
                </span>
                {user.isAdmin && (
                  <Link
                    href="/admin"
                    className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/20"
                  >
                    <GearSix size={16} weight="duotone" />
                    Admin panel
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Quick stats */}
          {orderCount > 0 && (
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] bg-white p-5 ring-1 ring-[var(--line)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-600)]">Orders</p>
                <p className="tnum mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--ink-950)]">{orderCount}</p>
              </div>
              <div className="rounded-[1.5rem] bg-white p-5 ring-1 ring-[var(--line)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-600)]">Total spent</p>
                <p className="tnum mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--ink-950)]">{formatNGN(spend)}</p>
              </div>
              <div className="rounded-[1.5rem] bg-white p-5 ring-1 ring-[var(--line)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-600)]">Latest order</p>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[var(--ink-950)]">
                  <span className="line-clamp-1">
                    {orders[0]?.items?.[0]?.name ?? `#${orders[0]?.id?.slice(0, 8) ?? "—"}`}
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Cards grid */}
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {/* Orders */}
            <Link
              href="/account/orders"
              className="group rounded-[1.75rem] bg-white p-1.5 ring-1 ring-[var(--line)] transition duration-500 ease-[var(--ease-out-heavy)] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(3,21,13,0.08)]"
            >
              <div className="flex h-full flex-col rounded-[1.4rem] bg-[var(--shell)] p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface)] text-white">
                    <Package size={20} weight="duotone" />
                  </div>
                  {orderCount > 0 && (
                    <span className="tnum rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[var(--ink-950)] ring-1 ring-[var(--line)]">
                      {orderCount}
                    </span>
                  )}
                </div>
                <h2 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-[var(--ink-950)]">My orders</h2>
                <p className="mt-1 flex-1 text-sm leading-6 text-[var(--ink-600)]">
                  Track purchases, view receipts, and check delivery status.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-blue)]">
                  View orders
                  <ArrowRight size={16} className="transition duration-500 ease-[var(--ease-out-heavy)] group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            {/* Account info */}
            <div className="rounded-[1.75rem] bg-white p-1.5 ring-1 ring-[var(--line)]">
              <div className="flex h-full flex-col rounded-[1.4rem] bg-[var(--shell)] p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface)] text-white">
                  <Receipt size={20} weight="duotone" />
                </div>
                <h2 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-[var(--ink-950)]">Account details</h2>
                <dl className="mt-3 flex-1 space-y-2.5 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--ink-600)]">Name</dt>
                    <dd className="truncate font-medium text-[var(--ink-950)]">{user.fullName}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--ink-600)]">Email</dt>
                    <dd className="truncate font-medium text-[var(--ink-950)]">{user.email}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--ink-600)]">Role</dt>
                    <dd>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          user.isAdmin ? "bg-[var(--solar-lime)] text-[var(--ink-950)]" : "bg-[var(--mist)] text-[var(--ink-700)]"
                        }`}
                      >
                        {user.isAdmin ? "Administrator" : "Customer"}
                      </span>
                    </dd>
                  </div>
                </dl>
                <p className="mt-4 text-xs leading-5 text-[var(--ink-600)]">Orders and support messages are tied to this email.</p>
              </div>
            </div>
          </div>

          {/* Sign out */}
          <div className="mt-8 flex justify-end border-t border-[var(--line)] pt-6">
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--line)] bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-700)] transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 active:scale-[0.96]"
              >
                <SignOut size={18} weight="bold" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
