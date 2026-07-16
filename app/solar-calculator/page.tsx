import type { Metadata } from "next";
import { SolarLoadCalculator } from "../components/SolarLoadCalculator";
import { PageHero } from "../components/PageHero";
import { site } from "../data/site";
import { ButtonLink } from "../components/ButtonLink";
import { Phone, ChatCircleDots, Lightning } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Solar Cost Estimator",
  description:
    "Instant solar system cost calculator for Nigerian homes and businesses. Select your appliances, see estimated system sizes, cost range, and monthly savings — all before you call us.",
  alternates: { canonical: "/solar-calculator" },
  openGraph: {
    title: "Solar Cost Estimator | Green Sunsure Energy",
    description: "Get an instant solar estimate for your home or business in Warri, Delta State.",
    url: "/solar-calculator",
    type: "website",
  },
};

export default function SolarCalculatorPage() {
  return (
    <main id="main">
      <PageHero
        kicker="Solar tool"
        title="Solar Cost Estimator"
        text="Immediate solar system cost calculation without human contact. Select your appliances, see estimated system sizes and cost range, then contact us for a free site assessment."
      />

      <section className="mx-auto max-w-5xl px-4 pb-24">
        <SolarLoadCalculator />

        {/* CTA block */}
        <div className="mt-16 rounded-[2rem] bg-[var(--surface)] p-8 text-center text-white md:p-12">
          <Lightning size={32} className="mx-auto mb-4 text-[var(--solar-lime)]" />
          <h3 className="text-2xl font-semibold tracking-[-0.03em]">Stop wasting money on fuel and generators.</h3>
          <p className="mt-3 max-w-xl mx-auto text-base text-white/70">
            Chat with our solar experts in Warri today. We provide preliminary quotes within 24 hours and free site assessments for all Warri and Delta State residents.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={`https://wa.me/2349038260459?text=${encodeURIComponent("Hello Green Sunsure, I used your solar calculator and would like a free site assessment.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[var(--solar-lime)] px-6 py-3 text-sm font-semibold text-[var(--ink-950)] transition hover:bg-white active:scale-[0.98]"
            >
              <ChatCircleDots size={18} weight="fill" />
              Chat on WhatsApp
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/45 hover:bg-white/16 active:scale-[0.98]"
            >
              <Phone size={18} weight="duotone" />
              Call {site.phone}
            </a>
          </div>
        </div>

        {/* 4 Easy Steps */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-center text-[var(--ink-950)]">
            4 Easy Steps to Get Solar in Warri
          </h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "1", title: "Calculate", desc: "Use the estimator above to find your system size and cost." },
              { step: "2", title: "Contact us", desc: "Chat on WhatsApp or call for a free site assessment." },
              { step: "3", title: "Install", desc: "Our certified team installs your system in 1–2 days." },
              { step: "4", title: "Enjoy 24/7 power", desc: "Reliable solar energy with 5-year warranty support." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto grid size-12 place-items-center rounded-full bg-[var(--solar-lime)] text-lg font-bold text-[var(--ink-950)]">{s.step}</div>
                <p className="mt-3 font-semibold text-[var(--ink-950)]">{s.title}</p>
                <p className="mt-1 text-sm text-[var(--ink-600)]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
