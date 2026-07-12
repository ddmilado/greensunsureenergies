import type { Metadata } from "next";
import Link from "next/link";
import { UserCircle, Package, SignOut, ArrowRight, GearSix } from "@phosphor-icons/react/dist/ssr";
import { logoutAction } from "@/app/lib/actions/auth";
import { getSessionUser } from "@/app/lib/dal";

export const metadata: Metadata = { title: "My account | Mainstream Green", alternates: { canonical: "/account" } };
export const dynamic = "force-dynamic";

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ welcome?: string }> }) {
  const sp = await searchParams;
  const user = await getSessionUser();
  if (!user) return null;

  return (
    <main id="main" className="overflow-x-hidden">
      <section className="px-4 pt-24 md:px-8 md:pt-40">
        <div className="mx-auto max-w-5xl pb-16">
          {sp.welcome === "1" && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800 ring-1 ring-emerald-200">
              <UserCircle size={24} weight="duotone" />
              Welcome to Mainstream Green, {user.fullName}. Your account has been created.
            </div>
          )}

          {/* Header */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <div className="grid size-14 shrink-0 place-items-center rounded-full bg-[var(--ink-950)] text-white sm:size-16">
              <UserCircle size={28} weight="duotone" className="sm:size-8" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--ink-950)] md:text-4xl">
                {user.fullName}
              </h1>
              <p className="mt-1 text-sm text-[var(--ink-600)]">{user.email}</p>
            </div>
          </div>

          {/* Cards grid */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Orders */}
            <Link
              href="/account/orders"
              className="group rounded-[2rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)] transition hover:ring-[var(--brand-blue)]/30"
            >
              <div className="flex h-full flex-col rounded-[1.6rem] bg-white p-6">
                <Package size={28} weight="duotone" className="text-[var(--brand-blue)]" />
                <h2 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-[var(--ink-950)]">My orders</h2>
                <p className="mt-1 flex-1 text-sm leading-6 text-[var(--ink-600)]">
                  Track your purchases, view receipts, and check delivery status.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-blue)]">
                  View orders
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            {/* Admin (conditional) */}
            {user.isAdmin && (
              <Link
                href="/admin"
                className="group rounded-[2rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)] transition hover:ring-[var(--brand-blue)]/30"
              >
                <div className="flex h-full flex-col rounded-[1.6rem] bg-white p-6">
                  <GearSix size={28} weight="duotone" className="text-[var(--brand-blue)]" />
                  <h2 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-[var(--ink-950)]">Admin panel</h2>
                  <p className="mt-1 flex-1 text-sm leading-6 text-[var(--ink-600)]">
                    Manage products, projects, blog posts, and view incoming leads.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-blue)]">
                    Open admin
                    <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            )}

            {/* Account info */}
            <div className="rounded-[2rem] bg-[var(--ink-950)] p-6 text-white">
              <h2 className="text-lg font-semibold tracking-[-0.03em]">Account details</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-white/40">Name</dt>
                  <dd className="mt-0.5 font-medium">{user.fullName}</dd>
                </div>
                <div>
                  <dt className="text-white/40">Email</dt>
                  <dd className="mt-0.5 font-medium">{user.email}</dd>
                </div>
                <div>
                  <dt className="text-white/40">Role</dt>
                  <dd className="mt-0.5 font-medium">{user.isAdmin ? "Administrator" : "Customer"}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Sign out */}
          <div className="mt-8">
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--line)] bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-700)] transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
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
