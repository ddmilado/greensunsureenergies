"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { List, X, ShoppingCart, User } from "@phosphor-icons/react";
import { navItems, site } from "../data/site";
import { Logo } from "./Logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function handleLogoClick(e: React.MouseEvent) {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/cart/count")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled && d && typeof d.count === "number") setCartCount(d.count);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:pt-6">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-[var(--ink-950)]"
      >
        Skip to content
      </a>
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/14 bg-[rgba(4,19,34,0.68)] px-3 py-2 shadow-[0_24px_80px_rgba(0,23,38,0.32)] backdrop-blur-2xl">
        <Link href="/" onClick={handleLogoClick} className="flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 ${
                  active ? "bg-white text-[var(--ink-950)]" : "text-white/72 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative grid size-11 place-items-center rounded-full border border-white/16 bg-white/8 text-white transition hover:bg-white/16"
          >
            <ShoppingCart size={20} weight="bold" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--solar-lime)] px-1 text-[10px] font-bold text-[var(--ink-950)]">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            href="/account"
            aria-label="Account"
            className="hidden md:grid size-11 place-items-center rounded-full border border-white/16 bg-white/8 text-white transition hover:bg-white/16"
          >
            <User size={20} weight="bold" />
          </Link>
          <a
            href={site.phoneHref}
            className="hidden rounded-full bg-[var(--solar-lime)] px-5 py-2.5 text-sm font-semibold text-[var(--ink-950)] transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white active:scale-[0.98] md:inline-flex"
          >
            Call now
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-white/16 bg-white/8 text-white transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/16 active:scale-[0.98] lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </nav>

      <div
        className={`mx-auto mt-3 max-w-7xl overflow-hidden rounded-[2rem] border border-white/14 bg-[rgba(4,19,34,0.88)] backdrop-blur-2xl transition-[max-height,opacity,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
          open ? "max-h-[520px] translate-y-0 opacity-100" : "max-h-0 -translate-y-4 opacity-0"
        }`}
      >
        <div className="grid gap-2 p-4">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-lg font-semibold text-white/86 transition duration-300 hover:bg-white/10"
              style={{ transitionDelay: `${index * 35}ms` }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.phoneHref}
            className="mt-2 rounded-full bg-[var(--solar-lime)] px-5 py-3 text-center text-sm font-semibold text-[var(--ink-950)]"
          >
            Call now
          </a>
        </div>
      </div>
    </header>
  );
}
