import type { Metadata } from "next";
import Link from "next/link";
import { UserCircle, Package, SignOut, ArrowRight, GearSix } from "@phosphor-icons/react/dist/ssr";
import { logoutAction } from "@/app/lib/actions/auth";
import { getSessionUser } from "@/app/lib/dal";

export const metadata: Metadata = { title: "My account | Green Sunsure", alternates: { canonical: "/account" } };
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
              Welcome to Green Sunsure, {user.fullName}. Your account has been created.
            </div>
          )}

          {/* Header */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <div className="grid size-14 shrink-0 place-items-center rounded-full bg-[var(--surface)] text-white sm:size-16">
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
              className="group rounded-[1.75rem] bg-white p-1.5 ring-1 ring-[var(--line)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(3,21,13,0.08)]"
            >
              <div className="flex h-full flex-col rounded-[1.4rem] bg-[var(--shell)] p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface)] text-white">
                  <Package size={20} weight="duotone" />
                </div>
                <h2 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-[var(--ink-950)]">My orders</h2>
                <p className="mt-1 flex-1 text-sm leading-6 text-[var(--ink-600)]">
                  Track purchases, view receipts, and check delivery status.
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
                className="group rounded-[1.75rem] bg-[var(--surface)] p-1.5 ring-1 ring-[var(--line)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(3,21,13,0.12)]"
              >
                <div className="flex h-full flex-col rounded-[1.4rem] bg-white/5 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--solar-lime)] text-[var(--ink-950)]">
                    <GearSix size={20} weight="duotone" />
                  </div>
                  <h2 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-white">Admin panel</h2>
                  <p className="mt-1 flex-1 text-sm leading-6 text-white/70">
                    Manage products, projects, blog posts, and view incoming leads.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--solar-lime)]">
                    Open admin
                    <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            )}

            {/* Account info */}
            <div className="rounded-[1.75rem] bg-white p-6 ring-1 ring-[var(--line)]">
              <h2 className="text-lg font-semibold tracking-[-0.03em] text-[var(--ink-950)]">Account details</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--ink-600)]">Name</dt>
                  <dd className="font-medium text-[var(--ink-950)]">{user.fullName}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--ink-600)]">Email</dt>
                  <dd className="font-medium text-[var(--ink-950)]">{user.email}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--ink-600)]">Role</dt>
                  <dd>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        user.isAdmin ? "bg-[var(--solar-lime)] text-[var(--ink-950)]" : "bg-[var(--mist)] text-[var(--ink-700)]"
                      }`}
                    >
                      {user.isAdmin ? "Administrator" : "Customer"}
                    </span>
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-xs leading-5 text-[var(--ink-600)]">This is your Green Sunsure account. Orders and support messages are tied to this email.</p>
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
