import Link from "next/link";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "./ButtonLink";
import { CTASection } from "./CTASection";
import { JsonLd } from "./JsonLd";
import { PageHero } from "./PageHero";
import { ProcessStack } from "./ProcessStack";
import { SectionHeading } from "./SectionHeading";
import { faqJsonLd, breadcrumbsJsonLd, serviceListJsonLd } from "../data/jsonLd";

export type ServiceLandingProps = {
  title: string;
  kicker: string;
  description: string;
  heroImage: string;
  slug: string;
  path: string; // canonical path, e.g. /residential-solar
  pillars: { title: string; text: string }[];
  benefits: string[];
  faq: { question: string; answer: string }[];
  includes: { title: string; text: string }[];
  processTitle?: string;
};

export function ServiceLanding({
  title,
  kicker,
  description,
  heroImage,
  slug,
  path,
  pillars,
  benefits,
  faq,
  includes,
  processTitle,
}: ServiceLandingProps) {
  return (
    <main id="main" className="overflow-x-hidden">
      <JsonLd
        data={[
          breadcrumbsJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: title, path }]),
          faqJsonLd(),
          ...serviceListJsonLd(),
        ]}
      />
      <PageHero title={title} kicker={kicker} text={description} image={heroImage} />

      <section className="px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="h-full rounded-[2.25rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]">
              <div className="h-full rounded-[1.85rem] bg-white p-7 dark:bg-[var(--shell)]">
                <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">{pillar.title}</h2>
                <p className="mt-4 text-base leading-7 text-[var(--ink-600)]">{pillar.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[var(--surface)] px-4 py-24 text-white md:px-8 md:py-32">
        <SectionHeading eyebrow="What you get" title={processTitle ?? "Built around the way you actually use power."}>
          <p className="text-white/70">
            Every system we deliver is sized against your real load, installed by certified technicians, and supported after handover.
          </p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-2">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-white/80">
              <CheckCircle size={22} weight="duotone" className="mt-0.5 shrink-0 text-[var(--solar-lime)]" />
              <span className="text-base leading-7">{benefit}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-24 md:px-8 md:py-32">
        <SectionHeading eyebrow="What is included" title="An end-to-end solar package, not just equipment.">
          <p>
            We don&rsquo;t just hand you components. Our team handles assessment, design, supply, installation, and
            after-install support so you don&rsquo;t have to coordinate multiple contractors.
          </p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {includes.map((item) => (
            <article key={item.title} className="h-full rounded-[2rem] bg-white p-6 ring-1 ring-[var(--line)] dark:bg-[var(--shell)]">
              <h3 className="text-lg font-semibold tracking-[-0.04em] text-[var(--ink-950)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-600)]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-24 md:px-8 md:py-32">
        <SectionHeading eyebrow="How it works" title="A clear roadmap from audit to reliable power.">
          <p>The team assesses your needs, designs the right system, installs safely, and hands over a solar setup you understand.</p>
        </SectionHeading>
        <div className="mt-14">
          <ProcessStack />
        </div>
      </section>

      <section className="px-4 py-24 md:px-8 md:py-32">
        <SectionHeading eyebrow="Frequently asked questions" title="Common questions before you pay.">
          <p>
            Honest answers to the questions most customers ask. If yours is not here, send us a message and we&rsquo;ll respond.
          </p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-4xl gap-4">
          {faq.map((item) => (
            <details
              key={item.question}
              className="group rounded-[1.5rem] bg-white p-6 ring-1 ring-[var(--line)] transition open:bg-[var(--shell)] dark:bg-[var(--shell)]"
            >
              <summary className="cursor-pointer list-none text-lg font-semibold tracking-[-0.03em] text-[var(--ink-950)]">
                {item.question}
              </summary>
              <p className="mt-4 text-base leading-7 text-[var(--ink-600)]">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-[var(--surface)] px-4 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto grid max-w-5xl items-center gap-8 rounded-[2.5rem] border border-white/12 bg-white/8 p-8 md:grid-cols-[1.4fr_1fr] md:p-12">
          <div>
            <h2 className="text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-5xl">
              Ready to talk through your {slug} project?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/72">
              Tell us what you need to power and the team will put together a tailored proposal — no obligation, no
              high-pressure sales calls.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <ButtonLink href={`/contact-us#quote?topic=${slug}`}>Request a free quote</ButtonLink>
            <Link
              href="/services"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/16 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore other services
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
