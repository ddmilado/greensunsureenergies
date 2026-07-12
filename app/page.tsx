import type { Metadata } from "next";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "./components/ButtonLink";
import { CTASection } from "./components/CTASection";
import { JsonLd } from "./components/JsonLd";
import { ProcessStack } from "./components/ProcessStack";
import { ProjectGrid } from "./components/ProjectGrid";
import { Reveal } from "./components/Reveal";
import { ScrollChoreography } from "./components/ScrollChoreography";
import { HeroVideo } from "./components/HeroVideo";
import { SectionHeading } from "./components/SectionHeading";
import { ServiceBento } from "./components/ServiceBento";
import {
  aboutCopy,
  featureList,
  site,
  stats,
  testimonials,
  valueCards,
  whyChooseUs,
} from "./data/site";
import { AnimatedCounter } from "./components/AnimatedCounter";
import { faqJsonLd, serviceListJsonLd } from "./data/jsonLd";
import { listProjects } from "./lib/dal";

export const metadata: Metadata = {
  title: "Solar Installation in Ogun State | Mainstream Green Energy Solutions",
  description:
    "Dependable solar systems for Nigerian homes and businesses. Cut fuel costs, enjoy uninterrupted power, and get expert installation, batteries, and long-term support.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mainstream Green Energy Solutions — Solar Installation in Ogun State",
    description:
      "Dependable solar systems for Nigerian homes and businesses. Cut fuel costs, enjoy uninterrupted power, and get expert installation and support.",
    url: site.url,
    type: "website",
  },
};

export const revalidate = 60;

export default async function Home() {
  const projects = await listProjects({ limit: 4 });
  return (
    <main id="main" className="w-full max-w-full overflow-x-hidden">
      <JsonLd data={[faqJsonLd(), ...serviceListJsonLd()]} />
      <ScrollChoreography />

      <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-[var(--ink-950)] px-4 pt-24 text-white md:px-8 md:pt-28">
        <HeroVideo />

        <div className="relative z-10 mx-auto w-full max-w-7xl py-20">
          <Reveal>
            <p className="mb-6 inline-flex rounded-full border border-white/14 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--solar-lime)] backdrop-blur-md">
              Solar energy systems for homes and businesses
            </p>
            <h1 className="max-w-5xl text-balance text-[clamp(3.6rem,8vw,8.4rem)] font-semibold leading-[1.08] tracking-[-0.065em] [text-shadow:0_2px_28px_rgba(0,0,0,0.55)]">
              Bright power,<br />brighter smiles.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/90 md:text-xl [text-shadow:0_1px_18px_rgba(0,0,0,0.5)]">
              Dependable solar systems that light up homes, strengthen businesses, and bring peace of mind.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact-us#quote">Request quote</ButtonLink>
              <ButtonLink href={site.phoneHref} variant="secondary">
                Call Mainstream Green
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-24 md:px-8 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.05}>
              <div className="rounded-[2rem] bg-white p-7 shadow-[0_24px_80px_rgba(3,30,48,0.07)] ring-1 ring-[var(--line)]">
                <p className="text-5xl font-semibold tracking-[-0.07em] text-[var(--brand-blue)] tabular-nums">
                  {stat.value.endsWith("+") ? (
                    <AnimatedCounter value={Number.parseInt(stat.value)} suffix="+" />
                  ) : (
                    <AnimatedCounter value={Number.parseFloat(stat.value)} decimals={1} />
                  )}
                </p>
                <p className="mt-3 text-sm font-medium text-[var(--ink-600)]">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 py-24 md:px-8 md:py-36">
        <SectionHeading eyebrow="Energy that works" title="Power back in your hands. Comfort back in your day.">
          <p>{aboutCopy.intro}</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-3">
          {valueCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={index * 0.06}>
                <article className="group h-full rounded-[2.25rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]">
                  <div className="relative h-full overflow-hidden rounded-[1.85rem] bg-white p-7">
                    {index === 1 && (
                      <div className="absolute -bottom-10 -right-10 h-52 w-52 rounded-full bg-[var(--energy-cyan)] opacity-[0.06] blur-3xl" />
                    )}
                    {index === 2 && (
                      <div className="absolute -bottom-8 -right-8 h-44 w-44 rounded-full bg-[var(--solar-lime)] opacity-[0.06] blur-3xl" />
                    )}
                    <span className="grid size-14 place-items-center rounded-2xl bg-[var(--mist)] text-[var(--brand-blue)]">
                      <Icon size={30} weight="duotone" />
                    </span>
                    <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">{card.title}</h3>
                    <p className="mt-4 text-base leading-7 text-[var(--ink-600)]">{card.text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="px-4 py-24 md:px-8 md:py-40">
        <SectionHeading eyebrow="What we offer" title="Solar solutions engineered around the way you actually use power.">
          <p>Save costs, boost productivity, and enjoy uninterrupted green power with systems designed for your property, load, and long-term support needs.</p>
        </SectionHeading>
        <div className="mt-14">
          <ServiceBento />
        </div>
      </section>

      <section className="bg-[var(--ink-950)] px-4 py-24 text-white md:px-8 md:py-40">
        <SectionHeading eyebrow="Why choose us" title="Power you can trust, comfort you can feel.">
          <p className="text-white/70">We do not just install solar systems. We deliver long-lasting energy freedom for homes and businesses.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-2">
          {whyChooseUs.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article data-float-card className="rounded-[2.25rem] bg-white/8 p-1.5 ring-1 ring-white/12">
                <div className="rounded-[1.85rem] bg-white/[0.06] p-7">
                  <CheckCircle size={30} weight="duotone" className="text-[var(--solar-lime)]" />
                  <h3 className="mt-7 text-2xl font-semibold tracking-[-0.04em]">{item.title}</h3>
                  <p className="mt-4 text-base leading-7 text-white/68">{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-12 grid max-w-7xl gap-3 md:grid-cols-4">
          {featureList.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex items-center gap-3 rounded-xl md:rounded-full border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/72">
                <Icon size={19} className="shrink-0 text-[var(--solar-lime)]" />
                {feature.title}
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[var(--ink-950)] px-4 pb-24 text-white md:px-8 md:pb-40">
        <SectionHeading eyebrow="Recent projects" title="Real solar work for roofs, facilities, and businesses.">
          <p className="text-white/70">A project gallery built from the current Mainstream Green website assets, modernized for stronger visual proof.</p>
        </SectionHeading>
        <div className="mt-14">
          <ProjectGrid projects={projects} />
        </div>
      </section>

      <section className="px-4 py-24 md:px-8 md:py-40">
        <SectionHeading eyebrow="How it works" title="A clear roadmap from audit to reliable power.">
          <p>The team assesses your needs, designs the right system, installs safely, and hands over a solar setup you understand.</p>
        </SectionHeading>
        <div className="mt-14">
          <ProcessStack />
        </div>
      </section>

      <section className="px-4 py-24 md:px-8 md:py-36">
        <SectionHeading eyebrow="Testimonials" title="What customers say about Mainstream Green.">
          <p>Real feedback from real clients — pulled from Google My Business, training events, and direct conversations.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 columns-1 gap-5 space-y-5 md:columns-2 xl:columns-3 max-w-7xl">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.04}>
              <figure className="break-inside-avoid rounded-[2rem] bg-white p-6 shadow-[0_24px_80px_rgba(3,30,48,0.07)] ring-1 ring-[var(--line)]">
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#f5b342" className="text-[#f5b342]">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-4 text-base leading-7 tracking-[-0.01em] text-[var(--ink-700)]">“{item.quote}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-2 border-t border-[var(--line)] pt-4 text-sm font-semibold text-[var(--ink-950)]">
                  <span className="grid size-8 place-items-center rounded-full text-[11px] font-bold text-white" style={{ backgroundColor: `var(--avatar-${(item.name.length * 7 + item.name.charCodeAt(0)) % 16})` }}>{item.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</span>
                  {item.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </main>
  );
}
