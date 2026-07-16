import type { Metadata } from "next";
import Image from "next/image";
import { CTASection } from "../components/CTASection";
import { JsonLd } from "../components/JsonLd";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { projects, projectImages, projectVideos, youtubeVideos, faqPageItems } from "../data/site";
import { breadcrumbsJsonLd, faqJsonLd } from "../data/jsonLd";

export const metadata: Metadata = {
  title: "Solar Projects & Installations | Green Sunsure Energy",
  description:
    "See Green Sunsure Energy solar installations for residential homes, commercial buildings, hotels, industrial facilities, and training institutes across Delta State and Nigeria.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Solar Projects & Installations | Green Sunsure Energy",
    description: "Real residential, commercial, industrial, and training solar installations across Warri, Delta State.",
    url: "https://www.greensunsurenergy.com/projects",
    type: "website",
  },
};

export const revalidate = 60;

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
        text="A visual look at residential, commercial, industrial, and training solar installations delivered by Green Sunsure Energy across Warri, Delta State and Nigeria."
        image="/assets/solar1-Bl0Gsz9o.jpg"
      />

      {/* Featured installations */}
      <section className="bg-[var(--ink-950)] px-4 py-24 text-white md:px-8 md:py-40">
        <SectionHeading eyebrow="Featured work" title="Roofs, facilities, hotels, and industrial sites.">
          <p className="text-white/70">
            Every project below is a real installation by Green Sunsure Energy. From 2.5kVA residential systems to 500kW industrial plants — we design, install, and maintain.
          </p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.04}>
              <article className={`group relative overflow-hidden rounded-[2.5rem] bg-white/8 ring-1 ring-white/12 ${index === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}>
                <div className={`relative w-full overflow-hidden bg-[var(--ink-900)] ${index === 0 ? "aspect-[16/7]" : "aspect-[16/9]"}`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes={index === 0 ? "(min-width: 768px) 100vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
                    className="object-cover opacity-80 saturate-[0.9] transition duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 group-hover:opacity-95"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,13,24,0.06),rgba(3,13,24,0.86))]" />
                  <div className="absolute left-6 top-6 inline-flex rounded-full bg-white/12 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/82 backdrop-blur-md">
                    {project.category}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <h3 className="line-clamp-2 max-w-2xl text-2xl font-semibold tracking-[-0.04em] text-white md:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-6 text-white/74 md:text-base">
                      {project.text}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Project image gallery */}
      <section className="px-4 py-24 md:px-8 md:py-36">
        <SectionHeading eyebrow="Installation gallery" title="From panels to commissioning — every step of the way.">
          <p>Browse additional photos from our solar installations, panel arrays, equipment, and training sessions.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {projectImages.map((img, index) => (
            <Reveal key={img.src} delay={index * 0.03}>
              <div className="group relative overflow-hidden rounded-[1.5rem] bg-[var(--shell)] ring-1 ring-[var(--line)]">
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                  <p className="absolute inset-x-0 bottom-0 p-4 text-xs font-medium text-white opacity-0 transition duration-500 group-hover:opacity-100">
                    {img.alt}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Video gallery */}
      <section className="bg-[var(--ink-950)] px-4 py-24 text-white md:px-8 md:py-36">
        <SectionHeading eyebrow="Video proof" title="Watch our installations and training sessions in action.">
          <p className="text-white/70">Real footage from real solar projects — residential walk-throughs, commercial commissions, and hands-on training workshops.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectVideos.map((video, index) => (
            <Reveal key={video.src} delay={index * 0.06}>
              <div className="overflow-hidden rounded-[2.25rem] bg-white/8 p-2.5 ring-1 ring-white/12">
                <div className="relative aspect-video w-full overflow-hidden rounded-[1.85rem] bg-[var(--ink-900)]">
                  <video
                    src={video.src}
                    controls
                    preload="metadata"
                    className="h-full w-full object-cover"
                    poster="/assets/solar1-Bl0Gsz9o.jpg"
                  />
                </div>
                <p className="mt-4 px-1 pb-2 text-center text-xs font-semibold text-white/72">
                  {video.title}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* YouTube embeds */}
      <section className="px-4 py-24 md:px-8 md:py-36">
        <SectionHeading eyebrow="Video reviews" title="Client reviews and project proof on YouTube.">
          <p>Watch real client feedback and project proof videos from our solar installations in Warri and Delta State.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
          {youtubeVideos.map((video, index) => (
            <Reveal key={video.id} delay={index * 0.1}>
              <div className="overflow-hidden rounded-[2.5rem] bg-white p-2.5 shadow-[0_24px_80px_rgba(3,30,48,0.07)] ring-1 ring-[var(--line)] dark:bg-[var(--shell)]">
                <div className="relative aspect-video w-full overflow-hidden rounded-[2rem]">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    className="absolute inset-0 h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="mt-5 text-center text-sm font-semibold text-[var(--ink-950)] px-2 pb-1">
                  {video.title}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ section */}
      <section className="px-4 py-24 md:px-8 md:py-36 bg-[var(--shell)] border-y border-[var(--line)]">
        <SectionHeading eyebrow="Common questions" title="Useful questions before paying for solar.">
          <p>
            These are the buying-decision questions customers usually need answered before an assessment.
          </p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-3">
          {faqPageItems.map((item) => (
            <article key={item.question} className="h-full rounded-[2.25rem] bg-white p-1.5 ring-1 ring-[var(--line)]">
              <div className="h-full rounded-[1.85rem] bg-white p-7 dark:bg-[var(--shell)]">
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
