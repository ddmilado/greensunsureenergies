import Link from "next/link";

/* ---------- Page header ---------- */

export function AdminHeader({
  title,
  description,
  eyebrow,
  action,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-300)]">{eyebrow}</p>
        )}
        <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-[var(--ink-950)] md:text-3xl">{title}</h1>
        {description && <p className="mt-1.5 text-sm text-[var(--ink-600)]">{description}</p>}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}

/* ---------- New-entity button ---------- */

export function AdminNewButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_12px_rgba(3,21,13,0.25)] transition duration-500 ease-[var(--ease-out-heavy)] hover:brightness-110 hover:shadow-[0_8px_24px_rgba(3,21,13,0.3)] active:scale-[0.96]"
      style={{ background: "linear-gradient(135deg, var(--brand-blue), var(--surface))" }}
    >
      {label}
    </Link>
  );
}

/* ---------- Panel (card) ---------- */

export function Panel({
  title,
  hint,
  action,
  className = "",
  surface = false,
  children,
}: {
  title?: string;
  hint?: string;
  action?: React.ReactNode;
  className?: string;
  surface?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`overflow-hidden rounded-[1.5rem] ring-1 shadow-[0_2px_16px_rgba(3,21,13,0.04)] ${
        surface
          ? "bg-[var(--surface)] text-white ring-[var(--surface)]"
          : "bg-[var(--panel)] ring-[var(--line)]"
      } ${className}`}
    >
      {(title || hint || action) && (
        <header
          className={`flex flex-wrap items-center justify-between gap-2 border-b px-5 py-4 md:px-6 ${
            surface ? "border-white/10" : "border-[var(--line)]"
          }`}
        >
          <div>
            {title && (
              <h2
                className={`text-sm font-semibold uppercase tracking-[0.16em] ${
                  surface ? "text-white/70" : "text-[var(--ink-600)]"
                }`}
              >
                {title}
              </h2>
            )}
            {hint && <p className={`mt-0.5 text-[11px] ${surface ? "text-white/40" : "text-[var(--ink-300)]"}`}>{hint}</p>}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

/* ---------- Stat card ---------- */

const ICONS: Record<string, React.ReactNode> = {
  products: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <path d="M21 8 12 3 3 8v8l9 5 9-5V8Zm-9-2.7L18.6 8 12 11.7 5.4 8 12 5.3Z" />
      <path d="M3.3 8.4 12 13l8.7-4.6M12 13v8" />
    </svg>
  ),
  orders: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" />
      <circle cx="7" cy="18.5" r="1.3" /><circle cx="17.5" cy="18.5" r="1.3" />
    </svg>
  ),
  revenue: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <path d="M3 17l5-6 4 4 5-8 4 5" /><path d="M3 21h18" />
    </svg>
  ),
  projects: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="3" width="8" height="8" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" /><rect x="13" y="13" width="8" height="8" rx="2" />
    </svg>
  ),
  posts: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <path d="M6 4h9l5 5v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" /><path d="M14 4v6h6M9 13h6M9 17h4" />
    </svg>
  ),
  leads: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.3 8.9 8.9 0 0 1-3.9-.9L3 20l1.2-5.1a8.1 8.1 0 0 1-.9-3.4A8.4 8.4 0 0 1 11.8 3a8.4 8.4 0 0 1 9.2 8.5Z" />
    </svg>
  ),
  messages: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <rect x="3" y="5" width="18" height="14" rx="3" /><path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  ),
};

export type Stat = {
  label: string;
  value: number | string;
  href: string;
  icon: keyof typeof ICONS;
  hint?: string;
  accent?: "lime" | "amber" | "danger" | "plain";
};

export function StatCard({ stat }: { stat: Stat }) {
  const accentRing =
    stat.accent === "lime"
      ? "ring-[var(--solar-lime)]/50"
      : stat.accent === "amber"
        ? "ring-amber-300/60"
        : stat.accent === "danger"
          ? "ring-red-300/60"
          : "ring-[var(--line)]";
  const iconTile =
    stat.accent === "lime"
      ? "bg-[var(--solar-lime)] text-[var(--ink-950)]"
      : stat.accent === "amber"
        ? "bg-amber-100 text-amber-700"
        : stat.accent === "danger"
          ? "bg-red-100 text-red-700"
          : "bg-[var(--surface)] text-white";

  return (
    <Link
      href={stat.href}
      className="group relative overflow-hidden rounded-[1.5rem] bg-[var(--panel)] p-5 ring-1 ring-[var(--line)] transition duration-500 ease-[var(--ease-out-heavy)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(3,21,13,0.1)]"
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[var(--solar-lime)] opacity-0 blur-2xl transition duration-500 ease-[var(--ease-out-heavy)] group-hover:opacity-[0.14]" />
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-600)]">{stat.label}</p>
        <span className={`grid size-9 shrink-0 place-items-center rounded-xl ring-1 ${iconTile} ${accentRing}`}>
          {ICONS[stat.icon]}
        </span>
      </div>
      <p className="tnum mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">{stat.value}</p>
      {stat.hint && <p className="mt-1 text-xs text-[var(--ink-300)]">{stat.hint}</p>}
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-blue)]">
        Manage
        <span className="transition duration-500 ease-[var(--ease-out-heavy)] group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}

/* ---------- Status pills (orders) ---------- */

export function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-800 ring-amber-300/60 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/30",
    paid: "bg-emerald-50 text-emerald-800 ring-emerald-300/60 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/30",
    delivered: "bg-emerald-50 text-emerald-800 ring-emerald-300/60 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/30",
    shipped: "bg-sky-50 text-sky-800 ring-sky-300/60 dark:bg-sky-400/10 dark:text-sky-300 dark:ring-sky-400/30",
    failed: "bg-red-50 text-red-700 ring-red-300/60 dark:bg-red-400/10 dark:text-red-300 dark:ring-red-400/30",
    cancelled: "bg-neutral-100 text-neutral-600 ring-neutral-300/60 dark:bg-white/10 dark:text-neutral-300 dark:ring-white/20",
  };
  const cls = styles[status] ?? styles.cancelled;
  return (
    <span className={`tnum inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ring-1 ${cls}`}>
      {status}
    </span>
  );
}

/* ---------- Lead status pill ---------- */

export function LeadPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: "bg-[var(--solar-lime)]/20 text-[var(--ink-950)] ring-[var(--solar-lime)]/50",
    contacted: "bg-amber-50 text-amber-800 ring-amber-300/60 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/30",
    qualified: "bg-sky-50 text-sky-800 ring-sky-300/60 dark:bg-sky-400/10 dark:text-sky-300 dark:ring-sky-400/30",
    won: "bg-emerald-50 text-emerald-800 ring-emerald-300/60 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/30",
    lost: "bg-neutral-100 text-neutral-600 ring-neutral-300/60 dark:bg-white/10 dark:text-neutral-300 dark:ring-white/20",
  };
  const cls = styles[status] ?? styles.lost;
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ring-1 ${cls}`}>
      {status}
    </span>
  );
}

/* ---------- Empty state ---------- */

export function AdminEmpty({ title, body, action }: { title: string; body: string; action?: React.ReactNode }) {
  return (
    <div className="grid place-items-center gap-2 px-6 py-14 text-center">
      <span className="grid size-12 place-items-center rounded-2xl bg-[var(--panel-muted)] text-[var(--ink-300)] ring-1 ring-[var(--line)]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="size-5">
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
        </svg>
      </span>
      <p className="text-sm font-semibold text-[var(--ink-950)]">{title}</p>
      <p className="max-w-sm text-xs text-[var(--ink-600)]">{body}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

/* ---------- Table shell ---------- */

export function AdminTable({
  head,
  children,
  colSpan,
  count,
}: {
  head: string[];
  children: React.ReactNode;
  colSpan: number;
  count: number;
}) {
  if (count === 0) return null;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--line)] bg-[var(--panel-muted)]">
            {head.map((h, i) => (
              <th
                key={h}
                className={`whitespace-nowrap px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-600)] md:px-5 ${
                  i > 0 && (h === "Total" || h === "Price" || h === "Stock" || h === "Status" || h === "Actions") ? "text-right" : ""
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--line)]">{children}</tbody>
      </table>
    </div>
  );
}
