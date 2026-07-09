import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={`mx-auto max-w-7xl ${align === "center" ? "text-center" : ""}`}>
      {eyebrow ? (
        <p className="mb-5 inline-flex rounded-full border border-[var(--line)] bg-white/80 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--brand-blue)] shadow-[0_14px_40px_rgba(3,30,48,0.06)]">
          {eyebrow}
        </p>
      ) : null}
      <div className={`grid gap-6 ${children ? "lg:grid-cols-[0.9fr_0.7fr] lg:items-end" : ""}`}>
        <h2 className="max-w-4xl text-balance text-4xl font-semibold leading-[0.96] tracking-[-0.06em] text-[var(--ink-950)] md:text-6xl">
          {title}
        </h2>
        {children ? (
          <div className="max-w-2xl text-base leading-8 text-[var(--ink-600)] md:text-lg">
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}
