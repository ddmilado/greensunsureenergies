import type { Metadata } from "next";
import { CheckCircle, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
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
import { packages } from "./data/catalog";
import { AnimatedCounter } from "./components/AnimatedCounter";
import { faqJsonLd, serviceListJsonLd } from "./data/jsonLd";
import { listProjects } from "./lib/dal";

export const metadata: Metadata = {
  title: "Solar Solutions in Warri, Delta State | Green Sunsure Energy",
  description:
    "Professional solar installation, products, maintenance & energy solutions in Warri, Delta State. Get certified training and instant load estimation. Serving Delta State & beyond.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Green Sunsure Energy — Solar Solutions in Warri, Delta State",
    description:
      "Expert solar installations, products, and certified technician training. Cutting fuel costs and empowering homes and businesses.",
    url: site.url,
    type: "website",
  },
};

export const revalidate = 60;

export default async function Home() {
  const projectsList = await listProjects({ limit: 4 });
  return (
    <main id="main" className="w-full max-w-full overflow-x-hidden">
      <JsonLd data={[faqJsonLd(), ...serviceListJsonLd()]} />
      <ScrollChoreography />

      {/* Hero section */}
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-[var(--ink-950)] px-4 pt-24 text-white md:px-8 md:pt-28">
        <HeroVideo />

        <div className="relative z-10 mx-auto w-full max-w-7xl py-20">
          <Reveal>
            <p className="mb-6 inline-flex rounded-full border border-white/14 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--solar-lime)] backdrop-blur-md">
              Green Sunsure Energy Solutions
            </p>
            <h1 className="max-w-5xl text-balance text-[clamp(3.6rem,8vw,8.4rem)] font-semibold leading-[1.08] tracking-[-0.065em] [text-shadow:0_2px_28px_rgba(0,0,0,0.55)]">
              Bright power,<br />brighter smiles.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/90 md:text-xl [text-shadow:0_1px_18px_rgba(0,0,0,0.5)]">
              Professional solar installations, products, and training in Warri, Delta State. Empowering homes and businesses with clean, reliable energy.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact-us#quote">Request quote</ButtonLink>
              <ButtonLink href={site.phoneHref} variant="secondary">
                Call Green Sunsure
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Statistics */}
      <section className="px-4 py-24 md:px-8 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.05}>
              <div className="rounded-[2rem] bg-white p-7 shadow-[0_24px_80px_rgba(3,30,48,0.07)] ring-1 ring-[var(--line)] dark:bg-[var(--shell)]">
                <p className="text-5xl font-semibold tracking-[-0.07em] text-[var(--brand-green-dark)] tabular-nums">
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

      {/* Value statement */}
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
                  <div className="relative h-full overflow-hidden rounded-[1.85rem] bg-white p-7 dark:bg-[var(--shell)]">
                    {index === 1 && (
                      <div className="absolute -bottom-10 -right-10 h-52 w-52 rounded-full bg-[var(--energy-cyan)] opacity-[0.06] blur-3xl" />
                    )}
                    {index === 2 && (
                      <div className="absolute -bottom-8 -right-8 h-44 w-44 rounded-full bg-[var(--solar-lime)] opacity-[0.06] blur-3xl" />
                    )}
                    <span className="grid size-14 place-items-center rounded-2xl bg-[var(--mist)] text-[var(--brand-blue-dark)] dark:text-[var(--solar-lime)]">
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

      {/* Services grid */}
      <section className="px-4 py-24 md:px-8 md:py-40">
        <SectionHeading eyebrow="What we offer" title="Solar solutions engineered around the way you actually use power.">
          <p>Save costs, boost productivity, and enjoy uninterrupted clean power with systems designed for your property, load, and long-term support needs.</p>
        </SectionHeading>
        <div className="mt-14">
          <ServiceBento />
        </div>
      </section>

      {/* Solar packages section */}
      <section className="px-4 py-24 md:px-8 md:py-40 bg-[var(--shell)] border-y border-[var(--line)]">
        <SectionHeading eyebrow="Solar Packages" title="Pre-configured solar packages built for Nigerian homes and offices.">
          <p>Choose from our reliable, NERC-accredited solar installations. Includes free site assessment, professional installation, and warranty support.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
          {packages.map((pkg, idx) => (
            <Reveal key={pkg.id} delay={idx * 0.1}>
              <article className="flex h-full flex-col overflow-hidden rounded-[2.5rem] bg-white p-2 shadow-[0_24px_80px_rgba(3,30,48,0.05)] ring-1 ring-[var(--line)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_100px_rgba(0,100,50,0.08)] dark:bg-[var(--shell)]">
                <div className="relative aspect-video w-full overflow-hidden rounded-[2.1rem] bg-[var(--mist)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pkg.image} alt={pkg.name} className="h-full w-full object-cover" />
                  <div className="absolute left-4 top-4 rounded-full bg-[var(--ink-950)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                    {pkg.slug === 'lite' ? 'Basic Power' : 'Full Backup'}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="text-2xl font-bold tracking-[-0.03em] text-[var(--ink-950)] sm:text-3xl">{pkg.name}</h3>
                  <p className="mt-2 text-sm text-[var(--ink-600)]">{pkg.description}</p>
                  <div className="mt-5 flex items-baseline gap-1 border-y border-[var(--line)] py-4">
                    <span className="text-3xl font-extrabold tracking-[-0.04em] text-[var(--brand-green-dark)]">₦{pkg.price.toLocaleString()}</span>
                    <span className="text-xs text-[var(--ink-300)] font-medium">all-inclusive</span>
                  </div>
                  
                  <div className="mt-6 flex-1">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-300)]">Key Features</p>
                    <ul className="mt-3 space-y-2.5">
                      {pkg.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-sm text-[var(--ink-700)] leading-6">
                          <CheckCircle size={18} className="shrink-0 text-[var(--brand-green)] mt-0.5" />
                          {feat}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-300)]">Powers Appliances</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {pkg.appliances.map((app) => (
                        <span key={app} className="rounded-full bg-[var(--mist)] px-3 py-1 text-xs font-medium text-[var(--brand-blue-dark)] dark:text-[var(--solar-lime)]">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <ButtonLink href="/contact-us#quote" className="flex-1 text-center justify-center">Request Quote</ButtonLink>
                    <a
                      href={`https://wa.me/2349038260459?text=Hello%20Green%20Sunsure,%20I%20am%20interested%20in%20your%20${encodeURIComponent(pkg.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-700)] transition duration-300 hover:bg-[var(--mist)] hover:text-[var(--brand-blue-dark)] active:scale-[0.98] flex-1 dark:bg-[var(--shell)]"
                    >
                      WhatsApp Enquiry
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-[var(--ink-950)] px-4 py-24 text-white md:px-8 md:py-40">
        <SectionHeading eyebrow="Why choose us" title="Power you can trust, comfort you can feel.">
          <p className="text-white/70 font-medium">We do not just install solar systems. We deliver long-lasting energy freedom for homes and businesses.</p>
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

      {/* Recent projects */}
      <section className="bg-[var(--ink-950)] px-4 pb-24 text-white md:px-8 md:pb-40">
        <SectionHeading eyebrow="Recent projects" title="Real solar work for roofs, facilities, and businesses.">
          <p className="text-white/70">A project gallery built from the current Green Sunsure website assets, demonstrating high-quality installation proof.</p>
        </SectionHeading>
        <div className="mt-14">
          <ProjectGrid projects={projectsList} />
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-24 md:px-8 md:py-40">
        <SectionHeading eyebrow="How it works" title="A clear roadmap from audit to reliable power.">
          <p>The team assesses your needs, designs the right system, installs safely, and hands over a solar setup you understand.</p>
        </SectionHeading>
        <div className="mt-14">
          <ProcessStack />
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-24 md:px-8 md:py-36">
        <SectionHeading eyebrow="Testimonials" title="What customers say about Green Sunsure.">
          <p>Real feedback from real clients — pulled from training events, commercial projects, and direct reviews.</p>
        </SectionHeading>
        
        {/* Testimonial grid */}
        <div className="mx-auto mt-14 columns-1 gap-5 space-y-5 md:columns-2 xl:columns-3 max-w-7xl">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.04}>
              <figure className="break-inside-avoid rounded-[2rem] bg-white p-6 shadow-[0_24px_80px_rgba(3,30,48,0.07)] ring-1 ring-[var(--line)] dark:bg-[var(--shell)]">
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

        {/* Video testimonials */}
        <div className="mx-auto mt-24 max-w-7xl border-t border-[var(--line)] pt-20">
          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--ink-950)] text-center mb-10">Video Reviews & Project Proof</h3>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            <div className="overflow-hidden rounded-[2.25rem] bg-white p-2.5 shadow-[0_24px_80px_rgba(3,30,48,0.05)] ring-1 ring-[var(--line)] dark:bg-[var(--shell)]">
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.85rem]">
                <iframe
                  src="https://www.youtube.com/embed/j_ag7FBQFyY"
                  title="Green Sunsure Customer Review 1"
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="mt-4 text-center text-xs font-semibold text-[var(--ink-600)] pb-2">Solar system proof @Joemarine Nautical Training Institute</p>
            </div>
            <div className="overflow-hidden rounded-[2.25rem] bg-white p-2.5 shadow-[0_24px_80px_rgba(3,30,48,0.05)] ring-1 ring-[var(--line)] dark:bg-[var(--shell)]">
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.85rem]">
                <iframe
                  src="https://www.youtube.com/embed/fWtgbOgQC3Y"
                  title="Green Sunsure Customer Review 2"
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="mt-4 text-center text-xs font-semibold text-[var(--ink-600)] pb-2">Residential backup system client review</p>
            </div>
            <div className="overflow-hidden rounded-[2.25rem] bg-white p-8 shadow-[0_24px_80px_rgba(3,30,48,0.05)] ring-1 ring-[var(--line)] flex flex-col justify-center items-center text-center dark:bg-[var(--shell)] min-h-[350px]">
              <span className="grid size-16 place-items-center rounded-2xl bg-[var(--mist)] text-[var(--brand-green-dark)]">
                <YoutubeLogo size={36} weight="duotone" />
              </span>
              <h4 className="mt-6 text-xl font-bold text-[var(--ink-950)]">More Proof of Work</h4>
              <p className="mt-3 text-sm text-[var(--ink-600)] leading-6 max-w-xs">We install and maintain clean energy systems with absolute transparency. Check our social media for constant updates.</p>
              <a
                href="https://facebook.com/greensunsure"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--ink-950)] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[var(--brand-blue-dark)] hover:text-white"
              >
                Visit Facebook Page
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
