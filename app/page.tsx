import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle, YoutubeLogo, Certificate, Handshake, TrendUp, SealCheck } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "./components/ButtonLink";
import { CTASection } from "./components/CTASection";
import { JsonLd } from "./components/JsonLd";
import { ProcessStack } from "./components/ProcessStack";
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
  projects,
  teamMembers,
  faqItems,
} from "./data/site";
import { packages } from "./data/catalog";
import { AnimatedCounter } from "./components/AnimatedCounter";
import { faqJsonLd, serviceListJsonLd } from "./data/jsonLd";

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

export default function Home() {
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
              Professional solar installation, maintenance & energy solutions in Warri, Delta State. Solar products, training & instant cost estimation. Empowering homes & businesses with clean, reliable energy.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/solar-calculator">Get instant solar estimate</ButtonLink>
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
      <section className="px-4 py-24 md:px-8 md:py-40 bg-[var(--shell)] border-y border-[var(--line)]">
        <SectionHeading eyebrow="Recent projects" title="Real solar work for roofs, facilities, and businesses.">
          <p>See our latest installations across Warri, Delta State — from residential rooftops to commercial hotels and industrial plants.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((project, index) => (
            <Reveal key={project.title} delay={index * 0.06}>
              <article className={`group relative overflow-hidden rounded-[2.5rem] bg-white ring-1 ring-[var(--line)] dark:bg-[var(--shell)] ${index === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}>
                <div className={`relative w-full overflow-hidden bg-[var(--mist)] ${index === 0 ? "aspect-[16/7]" : "aspect-[16/9]"}`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes={index === 0 ? "(min-width: 768px) 100vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
                    className="object-cover transition duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute left-5 top-5 inline-flex rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                    {project.category}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                    <h3 className="line-clamp-2 text-2xl font-semibold tracking-[-0.04em] text-white md:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/78">
                      {project.text}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <ButtonLink href="/projects" variant="secondary">View All Projects</ButtonLink>
        </div>
      </section>

      {/* Team section */}
      <section className="px-4 py-24 md:px-8 md:py-36">
        <SectionHeading eyebrow="Our team" title="Experienced professionals powering clean energy across Delta State.">
          <p>Meet the certified engineers and technicians behind every successful Green Sunsure installation.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-3">
          {teamMembers.map((member, index) => (
            <Reveal key={member.name} delay={index * 0.1}>
              <article className="group overflow-hidden rounded-[2.5rem] bg-white p-2 shadow-[0_24px_80px_rgba(3,30,48,0.07)] ring-1 ring-[var(--line)] dark:bg-[var(--shell)]">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-[var(--mist)]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="text-xl font-bold tracking-[-0.03em] text-[var(--ink-950)]">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-[var(--brand-green)]">{member.role}</p>
                  <p className="mt-3 text-sm leading-6 text-[var(--ink-600)]">{member.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Certification & accreditation */}
      <section className="bg-[var(--ink-950)] px-4 py-24 text-white md:px-8 md:py-36">
        <SectionHeading eyebrow="Certifications" title="Trusted, accredited, and certified.">
          <p className="text-white/70">Green Sunsure Energy meets national and international standards for solar installation and renewable energy consulting.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl gap-6 md:grid-cols-3">
          <Reveal delay={0}>
            <div className="flex flex-col items-center text-center rounded-[2.25rem] bg-white/8 p-8 ring-1 ring-white/12">
              <span className="grid size-16 place-items-center rounded-2xl bg-[var(--solar-lime)]/15">
                <Certificate size={32} weight="duotone" className="text-[var(--solar-lime)]" />
              </span>
              <h3 className="mt-6 text-xl font-bold">NERC Accredited</h3>
              <p className="mt-3 text-sm leading-6 text-white/68">Licensed by the Nigerian Electricity Regulatory Commission for solar installation and energy consulting.</p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="flex flex-col items-center text-center rounded-[2.25rem] bg-white/8 p-8 ring-1 ring-white/12">
              <span className="grid size-16 place-items-center rounded-2xl bg-[var(--solar-lime)]/15">
                <SealCheck size={32} weight="duotone" className="text-[var(--solar-lime)]" />
              </span>
              <h3 className="mt-6 text-xl font-bold">ISO Certified</h3>
              <p className="mt-3 text-sm leading-6 text-white/68">Compliant with international quality management standards for solar engineering and project delivery.</p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex flex-col items-center text-center rounded-[2.25rem] bg-white/8 p-8 ring-1 ring-white/12">
              <span className="grid size-16 place-items-center rounded-2xl bg-[var(--solar-lime)]/15">
                <CheckCircle size={32} weight="duotone" className="text-[var(--solar-lime)]" />
              </span>
              <h3 className="mt-6 text-xl font-bold">5-Year Warranty</h3>
              <p className="mt-3 text-sm leading-6 text-white/68">Every installation comes with a 5-year workmanship warranty. Products carry 2-5 year manufacturer warranties.</p>
            </div>
          </Reveal>
        </div>
        <div className="mx-auto mt-12 max-w-3xl text-center">
          <p className="text-sm text-white/50">All systems installed by certified engineers adhering strictly to national and international safety regulations.</p>
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
                <blockquote className="mt-4 text-base leading-7 tracking-[-0.01em] text-[var(--ink-700)]">"{item.quote}"</blockquote>
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
                href={site.social.facebook}
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

      {/* Referral / Affiliate program */}
      <section className="px-4 py-24 md:px-8 md:py-36 bg-[var(--shell)] border-y border-[var(--line)]">
        <SectionHeading eyebrow="Referral program" title="Earn rewards by referring friends and businesses.">
          <p>Love our solar solutions? Share the benefits and earn commissions when your referrals go solar with Green Sunsure.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-3">
          <Reveal delay={0}>
            <div className="flex flex-col items-center text-center rounded-[2.25rem] bg-white p-8 shadow-[0_24px_80px_rgba(3,30,48,0.05)] ring-1 ring-[var(--line)] dark:bg-[var(--shell)]">
              <span className="grid size-16 place-items-center rounded-2xl bg-[var(--mist)] text-[var(--brand-blue-dark)] dark:text-[var(--solar-lime)]">
                <Handshake size={32} weight="duotone" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-[var(--ink-950)]">Refer a Client</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-600)]">Share our contact with anyone needing solar — residential or commercial. No limits on how many people you refer.</p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="flex flex-col items-center text-center rounded-[2.25rem] bg-white p-8 shadow-[0_24px_80px_rgba(3,30,48,0.05)] ring-1 ring-[var(--line)] dark:bg-[var(--shell)]">
              <span className="grid size-16 place-items-center rounded-2xl bg-[var(--mist)] text-[var(--brand-blue-dark)] dark:text-[var(--solar-lime)]">
                <CheckCircle size={32} weight="duotone" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-[var(--ink-950)]">They Go Solar</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-600)]">Once your referral completes a solar installation or product purchase, you become eligible for a referral reward.</p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex flex-col items-center text-center rounded-[2.25rem] bg-white p-8 shadow-[0_24px_80px_rgba(3,30,48,0.05)] ring-1 ring-[var(--line)] dark:bg-[var(--shell)]">
              <span className="grid size-16 place-items-center rounded-2xl bg-[var(--mist)] text-[var(--brand-blue-dark)] dark:text-[var(--solar-lime)]">
                <TrendUp size={32} weight="duotone" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-[var(--ink-950)]">Earn Commission</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-600)]">Receive a commission for every successful referral. The more you refer, the more you earn. Simple as that.</p>
            </div>
          </Reveal>
        </div>
        <div className="mt-12 text-center">
          <a href={`mailto:${site.referralEmail}?subject=Referral%20Program%20Inquiry`} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--brand-green)] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-green-dark)] active:scale-[0.98]">
            Start Referring via Email
          </a>
        </div>
      </section>

      {/* Solar Energy FAQs */}
      <section className="px-4 py-24 md:px-8 md:py-36">
        <SectionHeading eyebrow="FAQs" title="Solar Energy FAQs — Answers to common questions about going solar.">
          <p>Get clarity on solar installation, costs, warranties, and more before you decide.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-2">
          {faqItems.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.04}>
              <article className="h-full rounded-[2.25rem] bg-white p-1.5 ring-1 ring-[var(--line)] dark:bg-[var(--shell)]">
                <div className="h-full rounded-[1.85rem] bg-white p-7 dark:bg-[var(--shell)]">
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--ink-950)]">{item.question}</h3>
                  <p className="mt-4 text-base leading-7 text-[var(--ink-600)]">{item.answer}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <ButtonLink href="/contact-us" variant="secondary">Still have questions? Contact us</ButtonLink>
        </div>
      </section>

      {/* Incorporation Certificate */}
      <section className="bg-[var(--ink-950)] px-4 py-24 text-white md:px-8 md:py-36">
        <SectionHeading eyebrow="Certificate of Incorporation" title="Green Sunsure Energy Solution And Technology Ltd">
          <p className="text-white/70">Officially registered and incorporated in Nigeria. We operate with full legal compliance and regulatory approvals.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 max-w-3xl">
          <Reveal>
            <div className="overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-[0_34px_100px_rgba(0,0,0,0.3)]">
              <Image
                src="/assets/cert-BNadzdnc.png"
                alt="Certificate of Incorporation — Green Sunsure Energy Solution And Technology Ltd"
                width={800}
                height={600}
                className="h-auto w-full rounded-[2rem] object-contain"
                priority
              />
            </div>
            <p className="mt-6 text-center text-sm text-white/50">Green Sunsure Energy Solution And Technology Ltd — Certificate of Incorporation, Corporate Affairs Commission (CAC), Nigeria.</p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
