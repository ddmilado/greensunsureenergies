import Link from "next/link";
import { listProjects } from "@/app/lib/dal";
import { deleteProjectAction } from "@/app/lib/actions/content";
import { ConfirmDeleteButton } from "@/app/_components/ConfirmDeleteButton";
import { AdminHeader, AdminNewButton, AdminTable, AdminEmpty, Panel } from "../AdminUI";

export const metadata = { title: "Admin · Projects | Green Sunsure" };
export const dynamic = "force-dynamic";

export default async function AdminProjectsListPage() {
  const projects = await listProjects({ limit: 200 });
  const featured = projects.filter((p) => p.featured).length;

  return (
    <div>
      <AdminHeader
        eyebrow="Content"
        title="Projects"
        description={`${projects.length} case studies · ${featured} featured on /projects`}
        action={<AdminNewButton href="/admin/projects/new" label="+ New project" />}
      />

      <div className="mt-6">
        {projects.length === 0 ? (
          <Panel>
            <AdminEmpty
              title="No projects yet"
              body="Case studies shown on the public projects page."
              action={<AdminNewButton href="/admin/projects/new" label="Publish first project" />}
            />
          </Panel>
        ) : (
          <Panel>
            <AdminTable head={["Title", "Category", "Location", "Position", "Status", "Actions"]} colSpan={6} count={projects.length}>
              {projects.map((p) => (
                <tr key={p.id} className="transition hover:bg-[var(--panel-muted)]">
                  <td className="px-4 py-3.5 font-semibold md:px-5">
                    <Link href={`/admin/projects/${p.slug}`} className="text-[var(--ink-950)] hover:underline">
                      {p.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3.5 text-[var(--ink-600)] md:px-5">{p.category}</td>
                  <td className="px-4 py-3.5 text-[var(--ink-600)] md:px-5">{p.location ?? "—"}</td>
                  <td className="tnum px-4 py-3.5 text-[var(--ink-600)] md:px-5">{p.position}</td>
                  <td className="px-4 py-3.5 text-right md:px-5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ring-1 ${
                        p.active
                          ? "bg-emerald-50 text-emerald-800 ring-emerald-300/60"
                          : "bg-neutral-100 text-neutral-600 ring-neutral-300/60"
                      }`}
                    >
                      {p.active ? "Live" : "Hidden"}
                    </span>
                    {p.featured && (
                      <span className="ml-1.5 inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-800 ring-1 ring-amber-300/60">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-right md:px-5">
                    <div className="flex justify-end gap-3">
                      <Link href={`/admin/projects/${p.slug}`} className="rounded-full px-0.5 text-xs font-semibold text-[var(--brand-blue)] hover:underline">
                        Edit
                      </Link>
                      <form action={deleteProjectAction} className="inline">
                        <input type="hidden" name="id" value={p.id} />
                        <ConfirmDeleteButton
                          message={`Delete project "${p.title}"? This cannot be undone.`}
                          className="rounded-full px-0.5 text-xs font-medium text-red-600 hover:underline"
                        >
                          Delete
                        </ConfirmDeleteButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </AdminTable>
          </Panel>
        )}
      </div>
    </div>
  );
}
