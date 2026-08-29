import Link from "next/link";
import { getSessionUser } from "@/app/lib/dal";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const nav = [
  { label: "Overview", href: "/admin" },
  { label: "Products", href: "/admin/products" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Blog posts", href: "/admin/posts" },
  { label: "Leads", href: "/admin/leads" },
  { label: "Messages", href: "/admin/messages" },
  { label: "Others", href: "/admin/others" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/admin");
  if (!user.isAdmin) redirect("/account");

  return (
    <div className="mx-auto grid min-h-[85vh] max-w-7xl gap-6 px-4 py-8 md:grid-cols-[260px_1fr] md:px-6 lg:px-8">
      <aside className="h-fit overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-white p-2 shadow-[0_8px_32px_rgba(3,21,13,0.06)] md:sticky md:top-24">
        <div className="rounded-[1.25rem] bg-[var(--surface)] px-4 py-4 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">Admin</p>
          <p className="mt-1 text-sm font-semibold">{user.fullName}</p>
          <p className="text-xs text-white/60">{user.email}</p>
          <span className="mt-3 inline-flex rounded-full bg-[var(--solar-lime)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--ink-950)]">
            Administrator
          </span>
        </div>
        <nav className="mt-2 grid gap-1 p-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--ink-700)] transition hover:bg-[var(--shell)] hover:text-[var(--ink-950)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--ink-300)]" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mx-2 mt-2 rounded-xl bg-[var(--shell)] p-3 text-xs leading-5 text-[var(--ink-600)] ring-1 ring-[var(--line)]">
          <p className="font-semibold text-[var(--ink-950)]">Need help?</p>
          <p>Manage products, orders, and incoming leads from here.</p>
        </div>
      </aside>
      <section className="min-w-0 rounded-[1.75rem] border border-[var(--line)] bg-white p-5 shadow-[0_8px_32px_rgba(3,21,13,0.06)] md:p-7">
        {children}
      </section>
    </div>
  );
}
