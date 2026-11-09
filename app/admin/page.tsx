import Link from "next/link";
import { formatNGN } from "@/app/lib/format";
import { adminListProducts, listLeads, listPosts, listProjects, adminListOrders } from "@/app/lib/dal";
import { AdminHeader, StatCard, Panel, LeadPill, type Stat } from "./AdminUI";

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
  const pendingOrders = (orders as any[]).filter((o) => o.status === "pending").length;
  const revenue = (orders as any[])
    .filter((o) => o.status === "paid" || o.status === "delivered" || o.status === "shipped")
    .reduce((a, o) => a + (o.total_kobo ?? 0), 0);
  const paidCount = (orders as any[]).filter((o) => ["paid", "delivered", "shipped"].includes(o.status)).length;
  const avgOrder = paidCount > 0 ? Math.round(revenue / paidCount) : 0;

  const today = new Date().toLocaleDateString("en-NG", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const stats: Stat[] = [
    {
      label: "Revenue",
      value: formatNGN(revenue),
      href: "/admin/orders",
      icon: "revenue",
      hint: `${paidCount} paid order${paidCount === 1 ? "" : "s"} · avg ${formatNGN(avgOrder)}`,
      accent: "lime",
    },
    {
      label: "Orders awaiting action",
      value: pendingOrders,
      href: "/admin/orders",
      icon: "orders",
      hint: pendingOrders > 0 ? "Pending payment or follow-up" : "All clear",
      accent: pendingOrders > 0 ? "amber" : "plain",
    },
    {
      label: "New leads",
      value: newLeads,
      href: "/admin/leads",
      icon: "leads",
      hint: `${leads.length} total in pipeline`,
      accent: newLeads > 0 ? "lime" : "plain",
    },
    {
      label: "Products",
      value: products.length,
      href: "/admin/products",
      icon: "products",
      hint: "Store catalog",
    },
    {
      label: "Projects",
      value: projects.length,
      href: "/admin/projects",
      icon: "projects",
      hint: "Public case studies",
    },
    {
      label: "Blog posts",
      value: posts.length,
      href: "/admin/posts",
      icon: "posts",
      hint: `${leads.filter((l) => l.kind !== "quote").length} messages in inbox`,
    },
  ];

  return (
    <div>
      <AdminHeader
        eyebrow="Green Sunsure"
        title="Control center"
        description="Everything in the store and pipeline, at a glance."
        action={
          <span className="tnum inline-flex items-center rounded-full bg-[var(--panel-muted)] px-3.5 py-2 text-xs font-semibold text-[var(--ink-600)] ring-1 ring-[var(--line)]">
            {today}
          </span>
        }
      />

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <StatCard key={s.label} stat={s} />
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <Panel title="Latest leads" hint="Most recent enquiries first" action={
          <Link href="/admin/leads" className="text-xs font-semibold text-[var(--brand-blue)] hover:underline">
            View all →
          </Link>
        }>
          <ul className="divide-y divide-[var(--line)]">
            {leads.slice(0, 5).map((lead) => (
              <li key={lead.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 md:px-6">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[var(--ink-950)]">{lead.name ?? "(no name)"}</p>
                  <p className="mt-0.5 truncate text-xs text-[var(--ink-600)]">
                    <span className="capitalize">{lead.kind}</span>
                    {" · "}
                    {lead.phone ?? lead.email ?? "—"}
                  </p>
                </div>
                <LeadPill status={lead.status} />
              </li>
            ))}
            {leads.length === 0 && (
              <li className="px-6 py-8 text-center text-sm text-[var(--ink-600)]">
                No leads yet — contact form submissions land here.
              </li>
            )}
          </ul>
        </Panel>

        <Panel title="Quick actions" hint="Start something" surface>
          <div className="grid gap-2.5 p-5 md:p-6">
            <Link
              href="/admin/products/new"
              className="rounded-xl bg-[var(--solar-lime)] px-4 py-3 text-center text-sm font-semibold text-[var(--ink-950)] transition duration-500 ease-[var(--ease-out-heavy)] hover:bg-white active:scale-[0.96]"
            >
              Add product
            </Link>
            <Link
              href="/admin/projects/new"
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Publish project
            </Link>
            <Link
              href="/admin/orders"
              className="group flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Review orders
              <span className="tnum rounded-full bg-[var(--solar-lime)] px-1.5 text-[10px] font-bold text-[var(--ink-950)]">
                {pendingOrders}
              </span>
            </Link>
            <Link
              href="/admin/leads"
              className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Work the pipeline
            </Link>
          </div>
        </Panel>
      </div>
    </div>
  );
}
