import { listLeads } from "@/app/lib/dal";
import { deleteLeadAction, updateLeadStatusAction } from "@/app/lib/actions/content";
import type { LeadStatus } from "@/app/lib/types";

export const metadata = { title: "Admin · Leads | Mainstream Green" };
export const dynamic = "force-dynamic";

const STATUSES: LeadStatus[] = ["new", "contacted", "qualified", "won", "lost"];

function statusColor(status: LeadStatus): string {
  switch (status) {
    case "new":
      return "bg-emerald-100 text-emerald-800";
    case "contacted":
      return "bg-amber-100 text-amber-800";
    case "qualified":
      return "bg-sky-100 text-sky-800";
    case "won":
      return "bg-indigo-100 text-indigo-800";
    case "lost":
      return "bg-neutral-200 text-neutral-700";
  }
}

export default async function AdminLeadsPage() {
  const leads = await listLeads();
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Leads &amp; messages</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Quote, contact, and support messages submitted through the website.
      </p>

      <div className="mt-6 grid gap-4">
        {leads.length === 0 && (
          <p className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500">
            No leads yet. Form submissions on /contact-us will appear here.
          </p>
        )}
        {leads.map((lead) => {
          const meta = (lead.meta ?? {}) as Record<string, unknown>;
          return (
            <article key={lead.id} className="rounded-2xl border border-neutral-200 bg-white p-5">
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    {lead.kind} ·{" "}
                    <span
                      className={`ml-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColor(lead.status)}`}
                    >
                      {lead.status}
                    </span>
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-neutral-900">{lead.name ?? "(no name)"}</h2>
                  <p className="text-sm text-neutral-600">
                    {lead.phone && <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>}
                    {lead.phone && lead.email ? " · " : ""}
                    {lead.email && <a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a>}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {new Date(lead.created_at).toLocaleString("en-NG")}
                    {lead.source ? ` · via ${lead.source}` : ""}
                    {lead.page_path ? ` · ${lead.page_path}` : ""}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <form action={updateLeadStatusAction} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={lead.id} />
                    <select
                      name="status"
                      defaultValue={lead.status}
                      className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-xs"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="rounded-md border border-neutral-900 px-3 py-1 text-xs font-semibold hover:bg-neutral-900 hover:text-white"
                    >
                      Update
                    </button>
                  </form>
                  <form action={deleteLeadAction}>
                    <input type="hidden" name="id" value={lead.id} />
                    <button
                      type="submit"
                      className="text-xs text-red-600 hover:underline"
                      formNoValidate
                      onClick={(e) => {
                        if (!confirm("Delete this lead? This cannot be undone.")) e.preventDefault();
                      }}
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </header>

              {lead.message && (
                <p className="mt-4 whitespace-pre-wrap rounded-lg bg-neutral-50 p-3 text-sm text-neutral-800">
                  {lead.message}
                </p>
              )}

              {Object.keys(meta).length > 0 && (
                <dl className="mt-4 grid gap-2 text-xs text-neutral-600 sm:grid-cols-2">
                  {Object.entries(meta).map(([k, v]) => (
                    <div key={k} className="flex items-baseline gap-2">
                      <dt className="font-semibold uppercase tracking-wider text-neutral-500">{k.replaceAll("_", " ")}:</dt>
                      <dd className="truncate">{String(v)}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
