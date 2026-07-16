import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTASection } from "../../components/CTASection";
import { JsonLd } from "../../components/JsonLd";
import { Reveal } from "../../components/Reveal";
import { getProjectBySlug, listAllProjectSlugs, listProjects } from "../../lib/dal";
import { breadcrumbsJsonLd } from "../../data/jsonLd";
import { site } from "../../data/site";

export const revalidate = 60;
export const dynamicParams = true;

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = await listAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} | Green Sunsure Project`,
    description: project.excerpt ?? `Green Sunsure ${project.category.toLowerCase()} solar installation case study.`,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.excerpt ?? undefined,
      url: `/projects/${project.slug}`,
      type: "article",
      images: project.cover_image ? [{ url: project.cover_image, alt: project.title }] : undefined,
    },
  };
}

function renderMarkdown(md: string): string {
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = md.split(/\r?\n/);
  const out: string[] = [];
  let inList = false;
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line) {
      if (inList) {
        out.push("</ul>");
        inList = false;
      }
      continue;
    }
    if (line.startsWith("### ")) {
      if (inList) {
        out.push("</ul>");
        inList = false;
      }
      out.push(`<h3>${escape(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith("## ")) {
      if (inList) {
        out.push("</ul>");
        inList = false;
      }
      out.push(`<h2>${escape(line.slice(3))}</h2>`);
      continue;
    }
    if (/^[-*] /.test(line)) {
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${escape(line.replace(/^[-*] /, ""))}</li>`);
      continue;
    }
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
    out.push(`<p>${escape(line)}</p>`);
  }
  if (inList) out.push("</ul>");
  return out.join("\n");
}

const specRows = [
  { key: "system_size", label: "System size" },
  { key: "panels", label: "Panels" },
  { key: "batteries", label: "Batteries" },
  { key: "inverter", label: "Inverter" },
  { key: "installation", label: "Install time" },
  { key: "location", label: "Location" },
  { key: "client_type", label: "Client type" },
] as const;

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const related = (await listProjects({ limit: 6 }))
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  const html = project.body ? renderMarkdown(project.body) : "";
  const gallery = (project.gallery ?? []).slice().sort(
    (a, b) => (a.position ?? 0) - (b.position ?? 0),
  );

  return (
    <main id="main" className="overflow-x-hidden">
      <JsonLd
        data={[
          breadcrumbsJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
        ]}
      />

      <article>
        <header className="bg-[var(--ink-950)] px-4 pb-20 pt-40 text-white md:px-8 md:pb-28 md:pt-48">
          <div className="mx-auto max-w-4xl">
            <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--solar-lime)]">
              <span>{project.category}</span>
              {project.client_type ? (
                <>
                  <span className="text-white/30">·</span>
                  <span className="text-white/70">{project.client_type}</span>
                </>
              ) : null}
              {project.location ? (
                <>
                  <span className="text-white/30">·</span>
                  <span className="text-white/70">{project.location}</span>
                </>
              ) : null}
            </div>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.05em] md:text-6xl">
              {project.title}
            </h1>
            {project.excerpt && (
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">{project.excerpt}</p>
            )}
            {project.outcome && (
              <p className="mt-6 inline-flex rounded-full border border-[var(--solar-lime)]/40 bg-[var(--solar-lime)]/10 px-4 py-2 text-sm font-medium text-[var(--solar-lime)]">
                Result: {project.outcome}
              </p>
            )}
          </div>
        </header>

        {project.cover_image && (
          <Reveal>
            <div className="mx-auto -mt-12 max-w-6xl px-4 md:px-8">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-[var(--ink-900)] shadow-[0_32px_120px_rgba(3,30,48,0.18)]">
                <Image
                  src={project.cover_image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1280px) 1152px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </Reveal>
        )}

        <section className="px-4 py-20 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_320px]">
            <div
              className="prose-damdavy text-[var(--ink-700)]"
              dangerouslySetInnerHTML={{ __html: html || "<p>This case study is being written. Check back soon.</p>" }}
            />
            <aside className="h-fit rounded-[2rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]">
              <div className="rounded-[1.6rem] bg-white p-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
                  Project specs
                </h2>
                <dl className="mt-5 space-y-4 text-sm">
                  {specRows.map((row) => {
                    const value = (project as Record<string, unknown>)[row.key];
                    if (typeof value !== "string" || !value) return null;
                    return (
                      <div key={row.key} className="flex flex-col gap-1 border-b border-[var(--line)] pb-3 last:border-b-0 last:pb-0">
                        <dt className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--ink-600)]">
                          {row.label}
                        </dt>
                        <dd className="font-semibold text-[var(--ink-950)]">{value}</dd>
                      </div>
                    );
                  })}
                </dl>
                <Link
                  href="/contact-us#quote"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[var(--ink-950)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-blue)]"
                >
                  Request a similar system
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {gallery.length > 1 && (
          <section className="px-4 py-12 md:px-8">
            <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
              {gallery.slice(1).map((g, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--ink-900)]">
                  <Image src={g.url} alt={g.alt ?? project.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="bg-[var(--ink-950)] px-4 py-24 text-white md:px-8 md:py-28">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-2xl font-semibold tracking-[-0.04em] md:text-3xl">More Green Sunsure projects</h2>
              <ul className="mt-10 grid gap-5 md:grid-cols-3">
                {related.map((p) => (
                  <li key={p.id} className="rounded-[2rem] bg-white/8 p-1.5 ring-1 ring-white/12">
                    <Link href={`/projects/${p.slug}`} className="block overflow-hidden rounded-[1.6rem]">
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--ink-900)]">
                        {p.cover_image ? (
                          <Image src={p.cover_image} alt={p.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover opacity-80 transition group-hover:scale-105" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm text-white/60">No image</div>
                        )}
                      </div>
                      <div className="bg-white/[0.04] p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--solar-lime)]">{p.category}</p>
                        <h3 className="mt-2 text-lg font-semibold tracking-[-0.04em]">{p.title}</h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </article>

      <CTASection />
    </main>
  );
}
