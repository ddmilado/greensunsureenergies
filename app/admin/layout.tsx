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
  { label: "Leads & messages", href: "/admin/leads" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/admin");
  if (!user.isAdmin) redirect("/account");

  return (
    <div className="mx-auto grid min-h-[80vh] max-w-7xl gap-8 px-4 py-10 md:grid-cols-[220px_1fr] md:px-8">
      <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-4 md:sticky md:top-24">
        <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Admin</p>
        <nav className="mt-3 grid gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 border-t border-neutral-100 pt-4 text-xs text-neutral-500">
          <p className="font-medium text-neutral-700">{user.fullName}</p>
          <p>{user.email}</p>

        </div>
      </aside>
      <section>{children}</section>
    </div>
  );
}
