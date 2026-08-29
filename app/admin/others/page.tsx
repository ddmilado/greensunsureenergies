import Link from "next/link";
import { listCategories } from "@/app/lib/dal";

export const metadata = { title: "Admin · Others | Green Sunsure" };
export const dynamic = "force-dynamic";

export default async function AdminOthersPage() {
  const categories = await listCategories();
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Others</h1>
      <p className="mt-1 text-sm text-neutral-500">Categories, settings, and quick links.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">Categories</h2>
          <ul className="mt-4 grid gap-2">
            {categories.map((c: any) => (
              <li key={c.id} className="flex items-center justify-between rounded-xl bg-neutral-50 px-4 py-3">
                <span className="font-medium">{c.name}</span>
                <span className="text-xs text-neutral-500">{c.slug}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">Quick actions</h2>
          <div className="mt-4 grid gap-3">
            <Link href="/admin/products/new" className="rounded-xl bg-black px-4 py-3 text-center text-sm font-medium text-white hover:bg-neutral-800">
              Add product
            </Link>
            <Link href="/admin/projects/new" className="rounded-xl border border-neutral-200 px-4 py-3 text-center text-sm font-medium hover:bg-neutral-50">
              Add project
            </Link>
            <Link href="/admin/posts/new" className="rounded-xl border border-neutral-200 px-4 py-3 text-center text-sm font-medium hover:bg-neutral-50">
              Add blog post
            </Link>
          </div>
          <div className="mt-6 rounded-xl bg-[var(--shell)] p-4 text-sm text-[var(--ink-600)] ring-1 ring-[var(--line)]">
            <p className="font-semibold text-[var(--ink-950)]">Tip</p>
            <p className="mt-1">Use Products to manage prices and images. Orders update status there.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
