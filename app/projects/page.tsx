import type { Metadata } from "next";
import { CTASection } from "../components/CTASection";
import { JsonLd } from "../components/JsonLd";
import { PageHero } from "../components/PageHero";
import { ProjectShowcase } from "../components/ProjectShowcase";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { faqItems } from "../data/site";
import { breadcrumbsJsonLd, faqJsonLd } from "../data/jsonLd";

export const metadata: Metadata = {
  title: "Solar Projects & Installations | Damdavy Technologies",
  description:
    "See Damdavy Technologies solar installations for residential roofs, commercial buildings, industrial backup, and open-field arrays across Nigeria.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Solar Projects & Installations | Damdavy Technologies",
    description: "Residential, commercial, industrial, and open-field solar installations in Nigeria.",
    url: "/projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <main id="main" className="overflow-x-hidden">
      <JsonLd
        data={[
          breadcrumbsJsonLd([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }]),
          faqJsonLd(),
        ]}
      />
      <PageHero
        title="Solar projects built for daily reliability."
        kicker="Projects"
        text="A visual look at residential, commercial, industrial, and larger solar installations using the current Damdavy project imagery."
        image="/solar-inspect.jpg"
      />

      <section className="bg-[var(--ink-950)] px-4 py-24 text-white md:px-8 md:py-40">
        <SectionHeading eyebrow="Featured work" title="Roofs, facilities, fields, and business sites.">
          <p className="text-white/70">
            The previous website had project titles but placeholder descriptions. This rebuild keeps the project categories and adds practical draft descriptions that should be replaced with full case studies later.
          </p>
        </SectionHeading>
        <div className="mt-14">
          <ProjectShowcase full />
        </div>
      </section>

      <section className="px-4 py-24 md:px-8 md:py-36">
        <SectionHeading eyebrow="Common questions" title="Useful questions before paying for solar.">
          <p>
            The crawled FAQ section was incomplete, so these draft questions focus on the buying decisions customers usually need answered before an assessment.
          </p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-3">
          {faqItems.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.06}>
              <article className="h-full rounded-[2.25rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]">
                <div className="h-full rounded-[1.85rem] bg-white p-7">
                  <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">{item.question}</h2>
                  <p className="mt-5 text-base leading-7 text-[var(--ink-600)]">{item.answer}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </main>
  );
}
