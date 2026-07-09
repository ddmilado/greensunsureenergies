import type { Metadata } from "next";
import Image from "next/image";
import { EnergyScene } from "./components/EnergyScene";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "./components/ButtonLink";
import { CTASection } from "./components/CTASection";
import { JsonLd } from "./components/JsonLd";
import { ProcessStack } from "./components/ProcessStack";
import { ProjectShowcase } from "./components/ProjectShowcase";
import { Reveal } from "./components/Reveal";
import { ScrollChoreography } from "./components/ScrollChoreography";
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
import { faqJsonLd, serviceListJsonLd } from "./data/jsonLd";

export const metadata: Metadata = {
  title: "Solar Installation in Ogun State | Damdavy Technologies",
  description:
    "Dependable solar systems for Nigerian homes and businesses. Cut fuel costs, enjoy uninterrupted power, and get expert installation, batteries, and long-term support.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Damdavy Technologies — Solar Installation in Ogun State",
    description:
      "Dependable solar systems for Nigerian homes and businesses. Cut fuel costs, enjoy uninterrupted power, and get expert installation and support.",
    url: site.url,
    type: "website",
  },
};

export default function Home() {
  return (
    <main id="main" className="w-full max-w-full overflow-x-hidden">
      <JsonLd data={[faqJsonLd(), ...serviceListJsonLd()]} />
      <ScrollChoreography />

      <section className="relative min-h-[100dvh] overflow-hidden bg-[var(--ink-950)] px-4 pb-20 pt-32 text-white md:px-8 md:pt-40">
        <EnergyScene />
        <div className="energy-grid absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(47,224,255,0.24),transparent_35%),linear-gradient(180deg,rgba(3,17,31,0.15),rgba(3,17,31,0.92))]" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-10rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.72fr]">
          <Reveal>
            <p className="mb-6 inline-flex rounded-full border border-white/14 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--solar-lime)] backdrop-blur-md">
              Solar energy systems for homes and businesses
            </p>
            <h1 className="max-w-6xl text-balance text-[clamp(3.6rem,8vw,8.4rem)] font-semibold leading-[0.84] tracking-[-0.085em]">
              Bright power, brighter smiles.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
              Dependable solar systems that light up homes, strengthen businesses, and bring peace of mind.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact-us#quote">Request quote</ButtonLink>
              <ButtonLink href={site.phoneHref} variant="secondary">
                Call Damdavy
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="relative hidden lg:block">
            <div className="rounded-[2.75rem] bg-white/8 p-2 ring-1 ring-white/14 backdrop-blur-md">
              <div className="relative min-h-[560px] overflow-hidden rounded-[2.25rem] bg-[var(--ink-900)]">
                <Image
                  src="/hero-2.jpg"
                  alt="Solar panels and clean energy infrastructure"
                  fill
                  sizes="42vw"
                  preload
                  className="object-cover opacity-74 saturate-[0.9]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(3,17,31,0.82))]" />
                <div className="absolute bottom-6 left-6 right-6 rounded-[1.75rem] border border-white/12 bg-white/10 p-5 backdrop-blur-xl">
                  <p className="text-sm text-white/62">Live energy mission</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Fuel-free freedom for everyday power.</p>
                </div>
              </div>
            </div>
          </Reveal>
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

      <section className="px-4 py-24 md:px-8 md:py-36">
        <SectionHeading eyebrow="Energy that works" title="Power back in your hands. Comfort back in your day.">
          <p>{aboutCopy.intro}</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-3">
          {valueCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={index * 0.06}>
                <article className="h-full rounded-[2.25rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]">
                  <div className="h-full rounded-[1.85rem] bg-white p-7">
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
              <div key={feature.title} className="flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/72">
                <Icon size={19} className="shrink-0 text-[var(--solar-lime)]" />
                {feature.title}
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[var(--ink-950)] px-4 pb-24 text-white md:px-8 md:pb-40">
        <SectionHeading eyebrow="Recent projects" title="Real solar work for roofs, facilities, and businesses.">
          <p className="text-white/70">A project gallery built from the current Damdavy website assets, modernized for stronger visual proof.</p>
        </SectionHeading>
        <div className="mt-14">
          <ProjectShowcase />
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
        <SectionHeading eyebrow="Testimonials" title="Customers talk about reliability, support, and practical training.">
          <p>Reviews extracted from the current Damdavy website and tightened for readability.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 columns-1 gap-5 space-y-5 md:columns-2 xl:columns-3 max-w-7xl">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.04}>
              <figure className="break-inside-avoid rounded-[2rem] bg-white p-7 shadow-[0_24px_80px_rgba(3,30,48,0.07)] ring-1 ring-[var(--line)]">
                <blockquote className="text-lg leading-8 tracking-[-0.02em] text-[var(--ink-700)]">“{item.quote}”</blockquote>
                <figcaption className="mt-6 text-sm font-semibold text-[var(--ink-950)]">{item.name}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </main>
  );
}
