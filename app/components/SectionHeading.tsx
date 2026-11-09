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
    <div className={`mx-auto section-heading max-w-7xl ${align === "center" ? "text-center" : ""}`}>
      {eyebrow ? (
        <p className="section-eyebrow">
          {eyebrow}
        </p>
      ) : null}
      <div className={`grid gap-6 ${children ? "lg:grid-cols-[0.9fr_0.7fr] lg:items-end" : ""}`}>
        <h2 className="max-w-4xl text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--ink-950)] md:text-5xl">
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
