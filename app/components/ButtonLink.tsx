import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "dark";
  className?: string;
  showIcon?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  showIcon = true,
}: ButtonLinkProps) {
  const base =
    "group relative inline-flex min-h-[3.25rem] items-center justify-center gap-3 rounded-full pl-6 pr-2.5 py-2 text-sm font-semibold tracking-[-0.01em] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400 select-none";

  const variants = {
    primary:
      "bg-[var(--solar-lime)] text-[var(--ink-950)] shadow-[0_12px_36px_rgba(0,230,118,0.28)] hover:bg-white hover:shadow-[0_16px_44px_rgba(255,255,255,0.22)]",
    secondary:
      "border border-white/20 bg-white/10 text-white backdrop-blur-xl hover:border-white/40 hover:bg-white/18 shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
    dark:
      "border border-white/12 bg-[var(--surface)] text-white hover:bg-[var(--ink-900)] hover:border-white/24 shadow-[0_12px_40px_rgba(3,21,13,0.35)]",
    ghost:
      "border border-[var(--line)] bg-white text-[var(--ink-950)] hover:border-[var(--brand-green)] hover:bg-[var(--mist)] dark:bg-[var(--shell)] dark:text-white",
  };

  const iconVariants = {
    primary: "bg-[var(--ink-950)]/12 text-[var(--ink-950)] group-hover:bg-[var(--ink-950)] group-hover:text-white",
    secondary: "bg-white/15 text-white group-hover:bg-white group-hover:text-[var(--ink-950)]",
    dark: "bg-white/12 text-white group-hover:bg-[var(--solar-lime)] group-hover:text-[var(--ink-950)]",
    ghost: "bg-[var(--mist)] text-[var(--ink-950)] group-hover:bg-[var(--brand-green)] group-hover:text-white dark:bg-white/10 dark:text-white",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      <span className="whitespace-nowrap font-medium">{children}</span>
      {showIcon && (
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${iconVariants[variant]}`}
        >
          <ArrowUpRight size={17} weight="bold" />
        </span>
      )}
    </Link>
  );
}

