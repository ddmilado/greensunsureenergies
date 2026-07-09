import Image from "next/image";
import Link from "next/link";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { navItems, site, supportLinks } from "../data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[var(--ink-950)] px-4 py-16 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Image src="/footer-logo.svg" alt="Damdavy Technologies" width={236} height={88} className="h-auto w-56 invert" />
          <p className="mt-6 max-w-md text-base leading-8 text-white/68">
            We help homes and businesses cut fuel costs and enjoy true energy freedom with dependable solar systems, expert installation, and long-term support.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-white/72">
            <a className="flex items-start gap-3 hover:text-white" href={site.phoneHref}>
              <Phone size={18} className="mt-1 text-[var(--solar-lime)]" /> {site.phone}
            </a>
            <a className="flex items-start gap-3 hover:text-white" href={site.emailHref}>
              <EnvelopeSimple size={18} className="mt-1 text-[var(--solar-lime)]" /> {site.email}
            </a>
            <a className="flex items-start gap-3 hover:text-white" href={site.mapHref} target="_blank" rel="noreferrer">
              <MapPin size={18} className="mt-1 shrink-0 text-[var(--solar-lime)]" /> {site.address.full}
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/48">Explore</h3>
          <div className="mt-6 grid gap-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-base text-white/72 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/48">Support</h3>
          <div className="mt-6 grid gap-3">
            {supportLinks.map((item) => (
              <Link key={item.label} href={item.href} className="text-base text-white/72 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/48 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Damdavy Technologies. All rights reserved.</p>
        <p>Modern rebuild prepared from the current Damdavy website content.</p>
      </div>
    </footer>
  );
}
