import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTASection } from "../../components/CTASection";
import { JsonLd } from "../../components/JsonLd";
import { Reveal } from "../../components/Reveal";
import { listAllPostSlugs, getPostBySlug, listPosts } from "../../lib/dal";
import { articleJsonLd, breadcrumbsJsonLd } from "../../data/jsonLd";
import { site } from "../../data/site";

export const revalidate = 60;
export const dynamicParams = true;

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = await listAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `/our-blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      url: `/our-blog/${post.slug}`,
      type: "article",
      images: post.cover_image ? [{ url: post.cover_image, alt: post.title }] : undefined,
    },
  };
}

function formatDate(value: string): string {
  try {
    return new Date(value).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return value;
  }
}

function renderMarkdown(md: string): string {
  // very small markdown renderer for headings, paragraphs, and lists.
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

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = (await listPosts({ limit: 3 })).filter((p) => p.id !== post.id).slice(0, 2);
  const html = post.body ? renderMarkdown(post.body) : "";

  return (
    <main id="main" className="overflow-x-hidden">
      <JsonLd
        data={[
          breadcrumbsJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/our-blog" },
            { name: post.title, path: `/our-blog/${post.slug}` },
          ]),
          articleJsonLd({
            title: post.title,
            description: post.excerpt ?? "",
            image: post.cover_image ?? undefined,
            datePublished: post.published_at,
            author: post.author_name ?? site.name,
            url: `${site.url}/our-blog/${post.slug}`,
          }),
        ]}
      />

      <article>
        <header className="bg-[var(--ink-950)] px-4 pb-20 pt-40 text-white md:px-8 md:pb-28 md:pt-48">
          <div className="mx-auto max-w-3xl">
            <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--solar-lime)]">
              <span>{post.category ?? "Article"}</span>
              <span className="text-white/30">·</span>
              <span className="text-white/70">{formatDate(post.published_at)}</span>
              {post.reading_minutes ? (
                <>
                  <span className="text-white/30">·</span>
                  <span className="text-white/70">{post.reading_minutes} min read</span>
                </>
              ) : null}
            </div>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.05em] md:text-6xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">{post.excerpt}</p>
            )}
            <p className="mt-8 text-sm text-white/56">
              By <span className="font-semibold text-white/80">{post.author_name ?? "Damdavy Team"}</span>
            </p>
          </div>
        </header>

        {post.cover_image && (
          <Reveal>
            <div className="mx-auto -mt-12 max-w-5xl px-4 md:px-8">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-[var(--ink-900)] shadow-[0_32px_120px_rgba(3,30,48,0.18)]">
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </Reveal>
        )}

        <section className="px-4 py-24 md:px-8 md:py-28">
          <div
            className="prose-damdavy mx-auto max-w-3xl text-[var(--ink-700)]"
            dangerouslySetInnerHTML={{ __html: html || "<p>This article is being written. Check back soon.</p>" }}
          />
        </section>

        {related.length > 0 && (
          <section className="bg-[var(--ink-950)] px-4 py-24 text-white md:px-8 md:py-28">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-2xl font-semibold tracking-[-0.04em] md:text-3xl">Keep reading</h2>
              <ul className="mt-10 grid gap-5 md:grid-cols-2">
                {related.map((p) => (
                  <li key={p.id} className="rounded-[2rem] bg-white/8 p-1.5 ring-1 ring-white/12">
                    <Link href={`/our-blog/${p.slug}`} className="flex h-full flex-col rounded-[1.6rem] bg-white/[0.04] p-7 transition hover:bg-white/[0.08]">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--solar-lime)]">
                        {p.category ?? "Article"}
                      </span>
                      <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em]">{p.title}</h3>
                      {p.excerpt && <p className="mt-3 text-sm leading-6 text-white/70">{p.excerpt}</p>}
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
