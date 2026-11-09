import { listLeads } from "@/app/lib/dal";
import { deleteLeadAction, updateLeadStatusAction } from "@/app/lib/actions/content";
import type { LeadStatus } from "@/app/lib/types";
import { ConfirmDeleteButton } from "@/app/_components/ConfirmDeleteButton";
import { AdminHeader, AdminEmpty, LeadPill, Panel } from "../AdminUI";

export const metadata = { title: "Admin · Leads | Green Sunsure" };
export const dynamic = "force-dynamic";

const STATUSES: LeadStatus[] = ["new", "contacted", "qualified", "won", "lost"];

const fmt = (v: string) => {
  try {
    return new Date(v).toLocaleString("en-NG", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return v;
  }
};

export default async function AdminLeadsPage() {
  const leads = await listLeads();
  const newCount = leads.filter((l) => l.status === "new").length;

  return (
    <div>
      <AdminHeader
        eyebrow="Inbox"
        title="Leads"
        description="Quote, contact, and support enquiries from the website."
        action={
          newCount > 0 ? (
            <span className="tnum inline-flex items-center gap-2 rounded-full bg-[var(--solar-lime)]/20 px-3.5 py-2 text-xs font-semibold text-[var(--ink-950)] ring-1 ring-[var(--solar-lime)]/60">
              <span className="size-1.5 rounded-full bg-[var(--brand-green)]" />
              {newCount} new
            </span>
          ) : null
        }
      />

      {leads.length === 0 ? (
        <div className="mt-6">
          <Panel>
            <AdminEmpty
              title="No leads yet"
              body="Form submissions from the contact page land here, ready to be worked."
            />
          </Panel>
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {leads.map((lead) => {
            const meta = (lead.meta ?? {}) as Record<string, unknown>;
            return (
              <article
                key={lead.id}
                className="overflow-hidden rounded-[1.5rem] bg-[var(--panel)] ring-1 shadow-[0_2px_16px_rgba(3,21,13,0.04)] transition hover:shadow-[0_10px_32px_rgba(3,21,13,0.08)] ring-[var(--line)]"
              >
                <div className="h-0.5 w-full bg-gradient-to-r from-[var(--brand-green)]/50 via-[var(--solar-lime)]/60 to-transparent" />
                <div className="p-5 md:p-6">
                  <header className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-600)]">
                        <span className="capitalize">{lead.kind}</span>
                        <LeadPill status={lead.status} />
                      </p>
                      <h2 className="mt-1.5 text-lg font-semibold tracking-[-0.02em] text-[var(--ink-950)]">{lead.name ?? "(no name)"}</h2>
                      <p className="text-sm text-[var(--ink-600)]">
                        {lead.phone && (
                          <a href={`tel:${lead.phone}`} className="hover:underline">
                            {lead.phone}
                          </a>
                        )}
                        {lead.phone && lead.email ? " · " : ""}
                        {lead.email && (
                          <a href={`mailto:${lead.email}`} className="hover:underline">
                            {lead.email}
                          </a>
                        )}
                      </p>
                      <p className="tnum mt-1 text-xs text-[var(--ink-300)]">
                        {fmt(lead.created_at)}
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
                          aria-label={`Update status for ${lead.name ?? "lead"}`}
                          className="min-h-9 rounded-full border border-[var(--line)] bg-[var(--panel-muted)] px-3 text-xs font-medium capitalize text-[var(--ink-950)] outline-none transition focus:border-[var(--brand-green)] focus:ring-2 focus:ring-[var(--ring)]"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <button
                          type="submit"
                          className="min-h-9 rounded-full bg-[var(--surface)] px-3.5 text-xs font-semibold text-white transition duration-500 ease-[var(--ease-out-heavy)] hover:bg-[var(--brand-blue)] active:scale-[0.96]"
                        >
                          Update
                        </button>
                      </form>
                      <form action={deleteLeadAction}>
                        <input type="hidden" name="id" value={lead.id} />
                        <ConfirmDeleteButton message="Delete this lead? This cannot be undone." className="rounded-full px-1 text-xs font-medium text-red-600 hover:underline">
                          Delete
                        </ConfirmDeleteButton>
                      </form>
                    </div>
                  </header>

                  {lead.message && (
                    <p className="mt-4 whitespace-pre-wrap rounded-xl bg-[var(--panel-muted)] p-4 text-sm leading-6 text-[var(--ink-700)] ring-1 ring-[var(--line)]">
                      {lead.message}
                    </p>
                  )}

                  {Object.keys(meta).length > 0 && (
                    <dl className="mt-4 grid gap-2 text-xs text-[var(--ink-600)] sm:grid-cols-2">
                      {Object.entries(meta).map(([k, v]) => (
                        <div key={k} className="flex items-baseline gap-2">
                          <dt className="shrink-0 font-semibold uppercase tracking-[0.12em] text-[var(--ink-300)]">{k.replaceAll("_", " ")}:</dt>
                          <dd className="truncate">{String(v)}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
