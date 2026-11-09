import { listLeads } from "@/app/lib/dal";
import { AdminHeader, AdminEmpty, Panel } from "../AdminUI";

export const metadata = { title: "Admin · Messages | Green Sunsure" };
export const dynamic = "force-dynamic";

const fmt = (v: string) => {
  try {
    return new Date(v).toLocaleString("en-NG", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return v;
  }
};

export default async function AdminMessagesPage() {
  const leads = await listLeads();
  const messages = leads.filter((l) => l.kind === "contact" || l.kind === "support");
  return (
    <div>
      <AdminHeader
        eyebrow="Inbox"
        title="Messages"
        description="Contact and support notes from the website forms."
      />

      <div className="mt-6">
        {messages.length === 0 ? (
          <Panel>
            <AdminEmpty
              title="No messages yet"
              body="General contact-form and support messages will appear here."
            />
          </Panel>
        ) : (
          <div className="grid gap-4">
            {messages.map((lead) => (
              <article
                key={lead.id}
                className="overflow-hidden rounded-[1.5rem] bg-[var(--panel)] ring-1 ring-[var(--line)] shadow-[0_2px_16px_rgba(3,21,13,0.04)] transition hover:shadow-[0_10px_32px_rgba(3,21,13,0.08)]"
              >
                <div className="p-5 md:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-600)]">
                      {lead.kind} · {lead.status}
                    </p>
                    <p className="tnum text-xs text-[var(--ink-300)]">{fmt(lead.created_at)}</p>
                  </div>
                  <h2 className="mt-1.5 font-semibold tracking-[-0.02em] text-[var(--ink-950)]">{lead.name ?? "(no name)"}</h2>
                  <p className="text-sm text-[var(--ink-600)]">{lead.email ?? lead.phone ?? "—"}</p>
                  {lead.message && (
                    <p className="mt-3 whitespace-pre-wrap rounded-xl bg-[var(--panel-muted)] p-4 text-sm leading-6 text-[var(--ink-700)] ring-1 ring-[var(--line)]">
                      {lead.message}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
