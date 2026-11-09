import { site } from "../data/site";
import { ButtonLink } from "./ButtonLink";
import { Reveal } from "./Reveal";

export function CTASection() {
  return (
    <section className="px-4 py-20 md:px-8 md:py-36">
      <Reveal className="mx-auto max-w-7xl">
        <div className="relative rounded-[2.5rem] p-1.5 md:p-2 bg-gradient-to-b from-emerald-500/25 via-emerald-500/10 to-emerald-500/5 shadow-[0_30px_90px_-15px_rgba(0,200,83,0.2)]">
          <div
            className="relative overflow-hidden rounded-[calc(2.5rem-0.375rem)] px-6 py-14 sm:px-10 sm:py-16 md:px-14 md:py-20 text-white border border-emerald-500/20"
            style={{ backgroundColor: "#03150d" }}
          >
            {/* Rich gradient layers & ambient photon glows */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#042416] via-[#03150d] to-[#021008] pointer-events-none" />
            <div className="absolute -right-24 -top-24 size-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-28 -left-20 size-80 rounded-full bg-[var(--solar-lime)]/15 blur-3xl pointer-events-none" />
            <div
              className="absolute inset-0 opacity-[0.035] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#00e676 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-950/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300 backdrop-blur-md mb-5">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  100% Clean Energy Transition
                </div>
                <h2 className="max-w-3xl text-balance text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-[-0.035em] text-white">
                  Stop burning money on generator diesel.
                </h2>
                <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-emerald-100/90 font-normal">
                  Calculate your custom residential or commercial load in 60 seconds, or connect directly with our certified solar engineers in Warri.
                </p>
              </div>

              <div className="flex flex-col gap-3.5 sm:flex-row lg:flex-col shrink-0">
                <ButtonLink
                  href="/solar-calculator"
                  variant="primary"
                  className="shadow-[0_10px_32px_rgba(0,230,118,0.35)]"
                >
                  Instant Load Calculator
                </ButtonLink>
                <ButtonLink
                  href={site.phoneHref}
                  variant="secondary"
                  className="border-2 border-white/35 bg-white/10 text-white hover:bg-white hover:text-[#03150d] hover:border-white shadow-[0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-md font-semibold"
                >
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

