"use client";

import Link from "next/link";
import { Calculator, PhoneCall, WhatsappLogo } from "@phosphor-icons/react";
import { site } from "../data/site";
import { usePathname } from "next/navigation";

export function MobileQuickBar() {
  const pathname = usePathname();

  // Hide on checkout / admin if needed
  if (pathname.startsWith("/admin") || pathname.startsWith("/checkout")) {
    return null;
  }

  return (
    <aside
      aria-label="Quick contact and calculator actions"
      className="fixed inset-x-0 bottom-4 z-40 px-4 md:hidden pointer-events-none"
    >
      <div className="mx-auto flex max-w-sm items-center justify-between gap-1.5 rounded-full border border-white/16 bg-[rgba(3,21,13,0.85)] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl pointer-events-auto">
        {/* Instant Solar Calculator */}
        <Link
          href="/solar-calculator"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[var(--solar-lime)] px-3 py-2.5 text-xs font-bold text-[var(--ink-950)] shadow-[0_4px_16px_rgba(0,230,118,0.3)] transition active:scale-95"
        >
          <Calculator size={16} weight="bold" />
          <span>Estimate</span>
        </Link>

        {/* WhatsApp Consultation */}
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-full border border-white/12 bg-white/8 px-3.5 py-2.5 text-xs font-semibold text-white transition hover:bg-white/16 active:scale-95"
          aria-label="Chat with engineer on WhatsApp"
        >
          <WhatsappLogo size={18} weight="fill" className="text-emerald-400" />
          <span>Chat</span>
        </a>

        {/* Instant Phone Call */}
        <a
          href={site.phoneHref}
          className="grid size-10 shrink-0 place-items-center rounded-full border border-white/12 bg-white/8 text-white transition hover:bg-white/16 active:scale-95"
          aria-label="Call Green Sunsure Energy"
        >
          <PhoneCall size={17} weight="bold" />
        </a>
      </div>
    </aside>
  );
}
