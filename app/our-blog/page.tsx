import type { Metadata } from "next";
import Image from "next/image";
import { CTASection } from "../components/CTASection";
import { JsonLd } from "../components/JsonLd";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { blogPosts } from "../data/site";
import { breadcrumbsJsonLd } from "../data/jsonLd";

export const metadata: Metadata = {
  title: "Solar Tips & Insights | Damdavy Blog",
  description:
    "Practical solar advice from Damdavy Technologies: choosing a solar installer, calculating solar ROI, and reducing generator dependence in Nigeria.",
  alternates: { canonical: "/our-blog" },
  openGraph: {
    title: "Solar Tips & Insights | Damdavy Blog",
    description: "Choosing an installer, calculating ROI, and reducing generator costs in Nigeria.",
    url: "/our-blog",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <main id="main" className="overflow-x-hidden">
      <JsonLd data={breadcrumbsJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/our-blog" }])} />
      <PageHero
        title="Solar advice without the jargon."
        kicker="Article & news"
        text="Guides for choosing the right solar installer and understanding the business case for solar in Nigeria."
        image="/hero-4.jpg"
      />

      <section className="px-4 py-24 md:px-8 md:py-36">
        <SectionHeading eyebrow="Our blog and news" title="Two strong articles to turn into a useful content engine.">
          <p>
            The current website lists two blog posts. The rebuild presents them cleanly and recommends deeper article pages in the improvement report.
          </p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-2">
          {blogPosts.map((post, index) => (
            <Reveal key={post.title} delay={index * 0.06}>
              <article id={index === 0 ? "solar-installer-questions" : "solar-business-roi"} className="group h-full rounded-[2.5rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]">
                <div className="h-full overflow-hidden rounded-[2rem] bg-white">
                  <div className="relative min-h-[280px] overflow-hidden">
                    <Image
                      src={index === 0 ? "/solar-inspect.jpg" : "/solar-install-2.jpg"}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                    />
                  </div>
                  <div className="p-7 md:p-9">
                    <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-blue)]">
                      <span>{post.category}</span>
                      <span>·</span>
                      <span>{post.date}</span>
                    </div>
                    <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-[var(--ink-950)] md:text-4xl">
                      {post.title}
                    </h2>
                    <p className="mt-5 text-base leading-7 text-[var(--ink-600)]">{post.excerpt}</p>
                  </div>
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
