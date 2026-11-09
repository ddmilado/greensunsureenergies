import Link from "next/link";
import { getSessionUser } from "@/app/lib/dal";
import { redirect } from "next/navigation";
import { AdminNav } from "./AdminNav";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/admin");
  if (!user.isAdmin) redirect("/account");

  const initials = (user.fullName ?? user.email)
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="relative min-h-screen">
      {/* Ambient brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-[0.14]"
        style={{
          background:
            "radial-gradient(42rem 16rem at 18% 0%, rgba(0,230,118,0.9), transparent 70%), radial-gradient(30rem 14rem at 72% 4%, rgba(0,200,83,0.7), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl gap-5 px-0 pb-12 pt-24 md:grid md:grid-cols-[256px_1fr] md:gap-6 md:px-4 md:pt-28 lg:px-6 xl:px-8">
        {/* Sidebar — dark brand panel on desktop, full-width header block on mobile */}
        <aside className="relative md:pb-4">
          <div className="rounded-[1.25rem] md:sticky md:top-28 md:rounded-[1.75rem] bg-[var(--surface)] px-5 py-6 text-white md:px-3 md:py-4">
            {/* User card */}
            <Link
              href="/account"
              className="group mb-4 flex items-center gap-3 rounded-2xl bg-white/[0.06] p-3 ring-1 ring-white/10 transition hover:bg-white/10 md:hidden"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--solar-lime)] text-sm font-bold text-[var(--ink-950)]">
                {initials || "A"}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{user.fullName}</span>
                <span className="block truncate text-xs text-white/55">{user.email}</span>
              </span>
            </Link>

            <div className="hidden md:block">
              <div className="mb-4 flex items-center gap-3 rounded-[1.25rem] bg-white/[0.06] p-3 ring-1 ring-white/10">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--solar-lime)] text-sm font-bold text-[var(--ink-950)]">
                  {initials || "A"}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{user.fullName}</span>
                  <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-[var(--solar-lime)]/15 px-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--solar-lime)] ring-1 ring-[var(--solar-lime)]/40">
                    Admin
                  </span>
                </span>
              </div>
            </div>

            <AdminNav />

            <div className="mt-5 hidden rounded-2xl bg-white/[0.05] p-3 ring-1 ring-white/10 md:block">
              <p className="text-xs font-semibold text-white/85">Control center</p>
              <p className="mt-0.5 text-[11px] leading-4 text-white/45">
                Manage the store, published content, and every incoming enquiry.
              </p>
              <Link
                href="/"
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--solar-lime)] hover:underline"
              >
                View public site →
              </Link>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="min-w-0 px-4 pt-6 md:px-0 md:pt-10">
          <div className="md:rounded-[1.75rem] md:border md:border-[var(--line)] md:bg-[var(--panel)] md:p-7 md:shadow-[0_8px_32px_rgba(3,21,13,0.07)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
