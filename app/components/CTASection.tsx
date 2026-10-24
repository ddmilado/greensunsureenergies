import { site } from "../data/site";
import { ButtonLink } from "./ButtonLink";
import { Reveal } from "./Reveal";

export function CTASection() {
  return (
    <section className="px-4 py-20 md:px-8 md:py-36">
      <Reveal className="mx-auto max-w-7xl">
        <div className="doppelrand bg-[var(--surface)] text-white shadow-[0_40px_140px_rgba(0,26,45,0.28)]">
          <div className="doppelrand-inner relative overflow-hidden bg-gradient-to-br from-[var(--surface)] via-[#042014] to-[var(--surface)] px-6 py-16 md:px-14 md:py-24 border border-white/12">
            <div className="absolute -right-28 -top-28 size-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-36 left-12 size-96 rounded-full bg-[var(--solar-lime)]/15 blur-3xl pointer-events-none" />
            
            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <span className="hud-pill mb-5 border-emerald-400/40 text-emerald-300">
                  ⚡ 100% CLEAN ENERGY TRANSITION
                </span>
                <h2 className="max-w-4xl text-balance text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.04] tracking-[-0.05em] text-white">
                  Stop burning money on generator diesel.
                </h2>
                <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-white/75">
                  Calculate your custom residential or commercial load in 60 seconds, or connect directly with our certified solar engineers in Warri.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col shrink-0">
                <ButtonLink href="/solar-calculator" variant="primary">
                  Instant Load Calculator
                </ButtonLink>
                <ButtonLink href={site.phoneHref} variant="secondary">
                  Speak With Lead Engineer
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
