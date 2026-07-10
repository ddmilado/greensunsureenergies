import Link from "next/link";
import { ButtonLink } from "./components/ButtonLink";
import { CTASection } from "./components/CTASection";

export default function NotFound() {
  return (
    <main id="main" className="overflow-x-hidden">
      <section className="relative bg-[var(--ink-950)] px-4 pb-28 pt-40 text-white md:px-8 md:pt-48">
        <div className="energy-grid absolute inset-0 opacity-50" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(47,224,255,0.18),transparent_35%),linear-gradient(180deg,rgba(3,17,31,0.1),rgba(3,17,31,0.92))]" aria-hidden />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--solar-lime)]">404 · Off-grid</p>
          <h1 className="mt-6 text-balance text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.92] tracking-[-0.06em]">
            This page is not on the circuit.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/72">
            The link you followed does not exist, or it has been moved. Let&rsquo;s get you back to the main panel.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
            <ButtonLink href="/contact-us#quote" variant="primary">
              Request a quote
            </ButtonLink>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-3 text-sm text-white/60">
            <Link href="/services" className="rounded-full border border-white/14 px-4 py-2 transition hover:bg-white/8 hover:text-white">
              Services
            </Link>
            <Link href="/projects" className="rounded-full border border-white/14 px-4 py-2 transition hover:bg-white/8 hover:text-white">
              Projects
            </Link>
            <Link href="/store" className="rounded-full border border-white/14 px-4 py-2 transition hover:bg-white/8 hover:text-white">
              Store
            </Link>
            <Link href="/our-blog" className="rounded-full border border-white/14 px-4 py-2 transition hover:bg-white/8 hover:text-white">
              Blog
            </Link>
          </div>
        </div>
      </section>
      <CTASection />
    </main>
  );
}
