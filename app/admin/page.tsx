import Link from "next/link";
import { adminListProducts, listLeads, listPosts, listProjects } from "@/app/lib/dal";

export const metadata = { title: "Admin overview | Green Sunsure" };
export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [products, projects, posts, leads] = await Promise.all([
    adminListProducts(),
    listProjects({ limit: 50 }),
    (await import("@/app/lib/dal")).listPosts({ limit: 50 }),
    listLeads(),
  ]);
  const newLeads = leads.filter((l) => l.status === "new").length;

  const cards = [
    { label: "Products", count: products.length, href: "/admin/products" },
    { label: "Projects", count: projects.length, href: "/admin/projects" },
    { label: "Blog posts", count: posts.length, href: "/admin/posts" },
    { label: "New leads", count: newLeads, href: "/admin/leads" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Admin overview</h1>
      <p className="mt-1 text-sm text-neutral-500">Quick view of content and incoming leads.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-neutral-200 bg-white p-5 transition hover:border-neutral-900"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">{c.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">{c.count}</p>
            <p className="mt-2 text-sm text-neutral-600">Manage →</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold tracking-tight">Latest leads</h2>
        <p className="mt-1 text-sm text-neutral-500">Last 5 messages received.</p>
        <ul className="mt-4 divide-y divide-neutral-100 text-sm">
          {leads.slice(0, 5).map((lead) => (
            <li key={lead.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
              <div>
                <p className="font-medium text-neutral-900">{lead.name ?? "(no name)"}</p>
                <p className="text-xs text-neutral-500">
                  {lead.kind} · {lead.phone ?? lead.email ?? "—"}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                  lead.status === "new" ? "bg-emerald-100 text-emerald-800" : "bg-neutral-100 text-neutral-600"
                }`}
              >
                {lead.status}
              </span>
            </li>
          ))}
          {leads.length === 0 && <li className="py-3 text-neutral-500">No leads yet.</li>}
        </ul>
      </div>
    </div>
  );
}
