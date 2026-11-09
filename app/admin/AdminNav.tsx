"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    label: "Commerce",
    items: [
      { href: "/admin", label: "Overview", icon: "M3 12h7V3H3v9Zm11 9h7v-9h-7v9ZM14 3v6h7V3h-7ZM3 21h7v-5H3v5Z" },
      { href: "/admin/orders", label: "Orders", icon: "M3 6h11v10H3V6Zm11 3h4l3 3v4h-7V9ZM7 18.5a1.3 1.3 0 1 0 0 .01M17.5 18.5a1.3 1.3 0 1 0 0 .01" },
      { href: "/admin/products", label: "Products", icon: "M21 8 12 3 3 8v8l9 5 9-5V8ZM3.3 8.4 12 13m0 0 8.7-4.6M12 13v8" },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/projects", label: "Projects", icon: "M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" },
      { href: "/admin/posts", label: "Blog posts", icon: "M6 4h9l5 5v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1ZM14 4v6h6M9 13h6M9 17h4" },
      { href: "/admin/others", label: "Others", icon: "M5 6h14M5 12h14M5 18h14" },
    ],
  },
  {
    label: "Inbox",
    items: [
      { href: "/admin/leads", label: "Leads", icon: "M21 11.5a8.4 8.4 0 0 1-8.5 8.3 8.9 8.9 0 0 1-3.9-.9L3 20l1.2-5.1a8.1 8.1 0 0 1-.9-3.4A8.4 8.4 0 0 1 11.8 3a8.4 8.4 0 0 1 9.2 8.5Z" },
      { href: "/admin/messages", label: "Messages", icon: "M3 5h18v14H3V5Zm.5 2 8.5 6 8.5-6" },
    ],
  },
];

export function AdminNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      {/* Desktop sidebar nav */}
      <nav aria-label="Admin" className="hidden md:block">
        {sections.map((section) => (
          <div key={section.label} className="mb-3 last:mb-0">
            <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
              {section.label}
            </p>
            <ul>
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`group flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition duration-300 ${
                      isActive(item.href)
                        ? "bg-[var(--solar-lime)] font-semibold text-[var(--ink-950)]"
                        : "font-medium text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`size-4 shrink-0 ${isActive(item.href) ? "text-[var(--ink-950)]" : "text-white/50 group-hover:text-[var(--solar-lime)]"}`}
                    >
                      <path d={item.icon} />
                    </svg>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Mobile: horizontal scrollable pill row */}
      <nav aria-label="Admin" className="md:hidden">
        <div className="-mx-5 flex gap-1.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.flatMap((s) => s.items).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-semibold transition ${
                isActive(item.href)
                  ? "bg-[var(--solar-lime)] text-[var(--ink-950)]"
                  : "bg-white/10 text-white/75 hover:bg-white/15 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
