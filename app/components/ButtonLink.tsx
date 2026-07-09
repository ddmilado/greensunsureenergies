import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  const base =
    "group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-5 py-2.5 text-sm font-semibold tracking-[-0.01em] transition-[transform,background,color,border-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300";
  const variants = {
    primary:
      "bg-[var(--solar-lime)] text-[var(--ink-950)] shadow-[0_18px_60px_rgba(146,210,67,0.24)] hover:bg-white",
    secondary:
      "border border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-white/45 hover:bg-white/16",
    ghost:
      "border border-[var(--line)] bg-white text-[var(--ink-950)] hover:border-[var(--brand-blue)] hover:bg-[var(--mist)]",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      <span className="whitespace-nowrap">{children}</span>
      <span className="grid size-8 place-items-center rounded-full bg-current/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5">
        <ArrowUpRight size={16} weight="bold" />
      </span>
    </Link>
  );
}
