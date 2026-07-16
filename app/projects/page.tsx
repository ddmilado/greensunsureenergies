import type { Metadata } from "next";
import { CTASection } from "../components/CTASection";
import { JsonLd } from "../components/JsonLd";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { ProjectGrid } from "../components/ProjectGrid";
import { listProjects } from "../lib/dal";
import { faqItems } from "../data/site";
import { breadcrumbsJsonLd, faqJsonLd } from "../data/jsonLd";

export const metadata: Metadata = {
  title: "Solar Projects & Installations | Green Sunsure Energy",
  description:
    "See Green Sunsure Energy solar installations for residential roofs, commercial buildings, industrial backup, and open-field arrays across Nigeria.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Solar Projects & Installations | Green Sunsure Energy",
    description: "Residential, commercial, industrial, and open-field solar installations in Nigeria.",
    url: "/projects",
    type: "website",
  },
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await listProjects();

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
        text="A visual look at residential, commercial, industrial, and larger solar installations delivered by Green Sunsure Energy."
        image="/solar-inspect.jpg"
      />

      <section className="bg-[var(--ink-950)] px-4 py-24 text-white md:px-8 md:py-40">
        <SectionHeading eyebrow="Featured work" title="Roofs, facilities, fields, and business sites.">
          <p className="text-white/70">
            Every project below is a real installation. Each case study breaks down the system, the timeline, and the result — so you know what to expect before paying.
          </p>
        </SectionHeading>
        <div className="mt-14">
          <ProjectGrid projects={projects} />
        </div>
      </section>

      <section className="px-4 py-24 md:px-8 md:py-36">
        <SectionHeading eyebrow="Common questions" title="Useful questions before paying for solar.">
          <p>
            These are the buying-decision questions customers usually need answered before an assessment.
          </p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-3">
          {faqItems.map((item, index) => (
            <article key={item.question} className="h-full rounded-[2.25rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]">
              <div className="h-full rounded-[1.85rem] bg-white p-7">
                <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">{item.question}</h2>
                <p className="mt-5 text-base leading-7 text-[var(--ink-600)]">{item.answer}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection />
    </main>
  );
}
