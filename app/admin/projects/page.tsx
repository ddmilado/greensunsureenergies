import Link from "next/link";
import { listProjects } from "@/app/lib/dal";
import { deleteProjectAction } from "@/app/lib/actions/content";

export const metadata = { title: "Admin · Projects | Damdavy" };
export const dynamic = "force-dynamic";

export default async function AdminProjectsListPage() {
  const projects = await listProjects({ limit: 200 });
  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-1 text-sm text-neutral-500">Case studies shown on the public /projects page.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          + New project
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-xs uppercase tracking-wider text-neutral-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Position</th>
              <th className="px-4 py-3 text-right">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3 font-medium text-neutral-900">
                  <Link href={`/admin/projects/${p.slug}`} className="hover:underline">
                    {p.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-neutral-600">{p.category}</td>
                <td className="px-4 py-3 text-neutral-600">{p.location ?? "—"}</td>
                <td className="px-4 py-3 text-neutral-600">{p.position}</td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`mr-1 inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                      p.active ? "bg-emerald-100 text-emerald-800" : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {p.active ? "Active" : "Hidden"}
                  </span>
                  {p.featured && (
                    <span className="inline-block rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-800">
                      Featured
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/projects/${p.slug}`} className="text-emerald-700 hover:underline">
                    Edit
                  </Link>
                  <form action={deleteProjectAction} className="ml-3 inline">
                    <input type="hidden" name="id" value={p.id} />
                    <button
                      type="submit"
                      className="text-red-600 hover:underline"
                      formNoValidate
                      onClick={(e) => {
                        if (!confirm(`Delete project "${p.title}"? This cannot be undone.`)) e.preventDefault();
                      }}
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-neutral-500">
                  No projects yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
