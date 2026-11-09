import Link from "next/link";
import { listCategories } from "@/app/lib/dal";
import { AdminHeader, Panel } from "../AdminUI";

export const metadata = { title: "Admin · Others | Green Sunsure" };
export const dynamic = "force-dynamic";

export default async function AdminOthersPage() {
  const categories = await listCategories();
  return (
    <div>
      <AdminHeader
        eyebrow="Workspace"
        title="Others"
        description="Store categories, settings, and quick links."
      />

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Panel title="Categories" hint="Store filter groups">
          <ul className="grid gap-2 p-5 md:p-6">
            {categories.map((c: any) => (
              <li
                key={c.id}
                className="flex items-center justify-between rounded-xl bg-[var(--panel-muted)] px-4 py-3 ring-1 ring-[var(--line)]"
              >
                <span className="font-medium text-[var(--ink-950)]">{c.name}</span>
                <span className="font-mono text-xs text-[var(--ink-300)]">{c.slug}</span>
              </li>
            ))}
            {categories.length === 0 && <li className="py-4 text-center text-sm text-[var(--ink-600)]">No categories yet.</li>}
          </ul>
        </Panel>

        <Panel title="Quick actions" hint="Create content" surface>
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
              Add project
            </Link>
            <Link
              href="/admin/posts/new"
              className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Add blog post
            </Link>
            <div className="mt-2 rounded-xl bg-white/[0.05] p-4 text-xs leading-5 text-white/55 ring-1 ring-white/10">
              <p className="font-semibold text-white/85">Tip</p>
              <p className="mt-0.5">Manage prices and images under Products. Order statuses update in Orders.</p>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
