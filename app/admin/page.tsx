import Link from "next/link";
import { adminListProducts, listLeads, listPosts, listProjects, adminListOrders } from "@/app/lib/dal";

export const metadata = { title: "Admin overview | Green Sunsure" };
export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [products, projects, posts, leads, orders] = await Promise.all([
    adminListProducts(),
    listProjects({ limit: 50 }),
    listPosts({ limit: 50 }),
    listLeads(),
    adminListOrders().catch(() => []),
  ]);
  const newLeads = leads.filter((l) => l.status === "new").length;
  const pendingOrders = (orders as any[]).filter((o) => o.status === "pending" || o.status === "paid").length;

  const cards = [
    { label: "Products", count: products.length, href: "/admin/products", hint: "Catalog" },
    { label: "Orders", count: (orders as any[]).length, href: "/admin/orders", hint: `${pendingOrders} pending` },
    { label: "Projects", count: projects.length, href: "/admin/projects", hint: "Case studies" },
    { label: "Blog posts", count: posts.length, href: "/admin/posts", hint: "Articles" },
    { label: "New leads", count: newLeads, href: "/admin/leads", hint: `${leads.length} total` },
    { label: "Messages", count: leads.filter((l) => l.kind !== "quote").length, href: "/admin/messages", hint: "Inbox" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Overview</h1>
          <p className="mt-1 text-sm text-neutral-500">Green Sunsure control center — products, orders, and enquiries.</p>
        </div>
        <span className="rounded-full bg-[var(--surface)] px-3 py-1 text-xs font-semibold text-white">{new Date().toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}</span>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group relative overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-white p-5 shadow-[0_8px_24px_rgba(3,21,13,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(3,21,13,0.08)]"
          >
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[var(--mist)] opacity-60 transition group-hover:opacity-80" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">{c.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">{c.count}</p>
            <p className="mt-1 text-xs text-neutral-500">{c.hint}</p>
            <p className="mt-3 text-sm font-medium text-[var(--brand-blue)]">Manage →</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.5rem] border border-[var(--line)] bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Latest leads</h2>
            <Link href="/admin/leads" className="text-xs font-semibold text-[var(--brand-blue)] hover:underline">
              View all
            </Link>
          </div>
          <p className="mt-1 text-sm text-neutral-500">Last 5 enquiries.</p>
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

        <div className="rounded-[1.5rem] bg-[var(--surface)] p-6 text-white">
          <h2 className="text-lg font-semibold">Quick actions</h2>
          <p className="mt-1 text-sm text-white/60">Create content or check orders.</p>
          <div className="mt-5 grid gap-3">
            <Link href="/admin/products/new" className="rounded-xl bg-[var(--solar-lime)] px-4 py-3 text-center text-sm font-semibold text-[var(--ink-950)] hover:bg-white">
              Add product
            </Link>
            <Link href="/admin/orders" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-white/15">
              View orders ({pendingOrders})
            </Link>
            <Link href="/admin/others" className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-medium text-white/80 hover:bg-white/10">
              Others
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
