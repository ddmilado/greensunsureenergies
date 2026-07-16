import type { Metadata } from "next";
import { CTASection } from "../components/CTASection";
import { JsonLd } from "../components/JsonLd";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { aboutCopy, stats, valueCards } from "../data/site";
import { breadcrumbsJsonLd } from "../data/jsonLd";

export const metadata: Metadata = {
  title: "About Green Sunsure Energy | Solar Energy Experts in Nigeria",
  description:
    "Green Sunsure Energy is a Nigerian solar company helping homes and businesses reduce fuel costs and enjoy steady electricity with dependable, cost-saving solar systems.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Green Sunsure Energy | Solar Energy Experts",
    description:
      "A Nigerian solar company delivering dependable, cost-saving solar systems for homes and businesses.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main id="main" className="overflow-x-hidden">
      <JsonLd data={breadcrumbsJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <PageHero
        title="Energy that works. Smiles that last."
        kicker="Who we are"
        text="Green Sunsure Energy makes energy simple, dependable, and truly yours with solar systems built around real homes and businesses."
        image="/hero-3.jpg"
      />

      <section className="px-4 py-24 md:px-8 md:py-36">
        <SectionHeading eyebrow="Our story" title="We install solar for the moment after installation too.">
          <p>{aboutCopy.intro}</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-3">
          {valueCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={index * 0.06}>
                <article className="h-full rounded-[2.25rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]">
                  <div className="h-full rounded-[1.85rem] bg-white p-7">
                    <Icon size={32} weight="duotone" className="text-[var(--brand-blue)]" />
                    <h2 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">{card.title}</h2>
                    <p className="mt-4 text-base leading-7 text-[var(--ink-600)]">{card.text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-[var(--ink-950)] px-4 py-24 text-white md:px-8 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {[
            ["Vision", aboutCopy.vision],
            ["Mission", aboutCopy.mission],
            ["Promise", aboutCopy.promise],
          ].map(([title, text], index) => (
            <Reveal key={title} delay={index * 0.06}>
              <article className="h-full rounded-[2.25rem] bg-white/8 p-1.5 ring-1 ring-white/12">
                <div className="h-full rounded-[1.85rem] bg-white/[0.06] p-7">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--solar-lime)]">{title}</p>
                  <p className="mt-8 text-xl leading-9 tracking-[-0.03em] text-white/82">{text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 py-24 md:px-8 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.05}>
              <div className="rounded-[2rem] bg-white p-7 shadow-[0_24px_80px_rgba(3,30,48,0.07)] ring-1 ring-[var(--line)]">
                <p className="text-5xl font-semibold tracking-[-0.07em] text-[var(--brand-blue)] tabular-nums">{stat.value}</p>
                <p className="mt-3 text-sm font-medium text-[var(--ink-600)]">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </main>
  );
}
