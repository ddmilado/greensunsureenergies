import Image from "next/image";
import Link from "next/link";
import { EnvelopeSimple, FacebookLogo, InstagramLogo, MapPin, Phone, XLogo } from "@phosphor-icons/react/dist/ssr";
import { navItems, site, supportLinks } from "../data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[var(--ink-950)] px-4 py-12 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-4">
            <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-[var(--line)] bg-white">
              <Image src="/favicon.png" alt="" width={44} height={44} className="object-contain" />
            </span>
            <div className="text-sm font-semibold tracking-[-0.02em] text-white">
              Damdavy<br />Technologies
            </div>
          </div>
          <p className="mt-5 max-w-md text-base leading-7 text-white/68">
            We help homes and businesses cut fuel costs and enjoy true energy freedom with dependable solar systems, expert installation, and long-term support.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href={site.social.facebook} target="_blank" rel="noreferrer" className="grid size-9 place-items-center rounded-full border border-white/20 text-white/60 transition hover:border-[var(--solar-lime)] hover:text-[var(--solar-lime)]" aria-label="Facebook">
              <FacebookLogo size={18} />
            </a>
            <a href={site.social.instagram} target="_blank" rel="noreferrer" className="grid size-9 place-items-center rounded-full border border-white/20 text-white/60 transition hover:border-[var(--solar-lime)] hover:text-[var(--solar-lime)]" aria-label="Instagram">
              <InstagramLogo size={18} />
            </a>
            <a href={site.social.twitter} target="_blank" rel="noreferrer" className="grid size-9 place-items-center rounded-full border border-white/20 text-white/60 transition hover:border-[var(--solar-lime)] hover:text-[var(--solar-lime)]" aria-label="X (Twitter)">
              <XLogo size={18} />
            </a>
          </div>
          <div className="mt-6 grid gap-2 text-sm text-white/72">
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
          <div className="mt-4 grid gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-base text-white/72 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/48">Support</h3>
          <div className="mt-4 grid gap-2">
            {supportLinks.map((item) => (
              <Link key={item.label} href={item.href} className="text-base text-white/72 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/48 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Damdavy Technologies. All rights reserved.</p>
      </div>
    </footer>
  );
}
