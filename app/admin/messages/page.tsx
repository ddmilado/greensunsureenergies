import { listLeads } from "@/app/lib/dal";

export const metadata = { title: "Admin · Messages | Green Sunsure" };
export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const leads = await listLeads();
  const messages = leads.filter((l) => l.kind === "contact" || l.kind === "support");
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Messages</h1>
      <p className="mt-1 text-sm text-neutral-500">Contact and support messages from the website.</p>
      <div className="mt-6 grid gap-4">
        {messages.length === 0 && (
          <p className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500">
            No messages yet.
          </p>
        )}
        {messages.map((lead) => (
          <article key={lead.id} className="rounded-2xl border border-neutral-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              {lead.kind} · {lead.status}
            </p>
            <h2 className="mt-1 font-semibold">{lead.name ?? "(no name)"}</h2>
            <p className="text-sm text-neutral-600">{lead.email ?? lead.phone ?? "—"}</p>
            {lead.message && <p className="mt-3 whitespace-pre-wrap rounded-lg bg-neutral-50 p-3 text-sm">{lead.message}</p>}
            <p className="mt-2 text-xs text-neutral-400">{new Date(lead.created_at).toLocaleString("en-NG")}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
