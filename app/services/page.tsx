import type { Metadata } from "next";
import { CTASection } from "../components/CTASection";
import { JsonLd } from "../components/JsonLd";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { ServiceBento } from "../components/ServiceBento";
import { featureList, whyChooseUs } from "../data/site";
import { breadcrumbsJsonLd, serviceListJsonLd } from "../data/jsonLd";

export const metadata: Metadata = {
  title: "Solar Services | Installation, Batteries & Maintenance",
  description:
    "Solar panel installation, commercial and residential solar systems, battery backup, inverters, energy audits, and performance monitoring from Green Sunsure Energy in Nigeria.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Solar Services | Green Sunsure Energy",
    description:
      "Installation, batteries, inverters, energy audits, and monitoring for homes and businesses in Nigeria.",
    url: "/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <main id="main" className="overflow-x-hidden">
      <JsonLd data={[breadcrumbsJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]), ...serviceListJsonLd()]} />
      <PageHero
        title="Solar solutions tailored to your power needs."
        kicker="Services"
        text="Save costs, boost productivity, and enjoy uninterrupted green power with systems designed for homes and businesses."
        image="/solar-install-1.jpg"
      />

      <section className="px-4 py-24 md:px-8 md:py-40">
        <SectionHeading eyebrow="What we offer" title="From first audit to long-term monitoring.">
          <p>Every project starts with understanding your load, your budget, and how much comfort you expect when the grid goes down.</p>
        </SectionHeading>
        <div className="mt-14">
          <ServiceBento />
        </div>
      </section>

      <section className="bg-[var(--surface)] px-4 py-24 text-white md:px-8 md:py-36">
        <SectionHeading eyebrow="Support layer" title="The support around the system matters as much as the equipment.">
          <p className="text-white/70">Green Sunsure positions support, monitoring, and fast fault response as core parts of the solar experience.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl gap-3 md:grid-cols-4">
          {featureList.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delay={index * 0.03}>
                <div className="flex h-full items-center gap-3 rounded-2xl border border-white/10 bg-white/6 p-4 text-sm text-white/74">
                  <Icon size={21} className="shrink-0 text-[var(--solar-lime)]" />
                  {feature.title}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="px-4 py-24 md:px-8 md:py-36">
        <SectionHeading eyebrow="Why Green Sunsure" title="A clearer way to invest in solar.">
          <p>Reliability, savings, transparency, and customer-first support shape the way each system is planned and handed over.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-2">
          {whyChooseUs.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className="h-full rounded-[2.25rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]">
                <div className="h-full rounded-[1.85rem] bg-white p-7 dark:bg-[var(--shell)]">
                  <h2 className="text-2xl font-semibold tracking-[-0.04em]">{item.title}</h2>
                  <p className="mt-4 text-base leading-7 text-[var(--ink-600)]">{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[var(--surface)] px-4 py-24 text-white md:px-8 md:py-36">
        <SectionHeading eyebrow="Popular pages" title="Deep-dive into the services you need most.">
          <p className="text-white/70">Each of these pages is built for a specific buying moment — sizing, ROI, or post-install care.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Residential solar", desc: "Sized-to-home systems for reliable backup.", href: "/residential-solar" },
            { title: "Commercial solar", desc: "Systems that protect your margins and uptime.", href: "/commercial-solar" },
            { title: "Battery backup & inverters", desc: "Lithium banks, hybrid and pure sine wave inverters.", href: "/battery-backup" },
            { title: "Solar maintenance", desc: "Cleaning, monitoring, and fast fault response.", href: "/solar-maintenance" },
            { title: "Solar in Ogun State", desc: "Local installs across Sagamu, Ibafo, Otta, and more.", href: "/solar-installation-ogun-state" },
            { title: "Our projects", desc: "Real case studies from recent installs.", href: "/projects" },
          ].map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="group block rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 transition hover:border-[var(--solar-lime)]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold tracking-[-0.04em] text-white">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">{card.desc}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--solar-lime)]">
                Read more
                <span aria-hidden className="transition group-hover:translate-x-1">→</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <CTASection />
    </main>
  );
}
