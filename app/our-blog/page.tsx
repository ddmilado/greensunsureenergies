import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CTASection } from "../components/CTASection";
import { JsonLd } from "../components/JsonLd";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { listPosts } from "../lib/dal";
import { breadcrumbsJsonLd } from "../data/jsonLd";

export const metadata: Metadata = {
  title: "Solar Tips & Insights | Mainstream Green Blog",
  description:
    "Practical solar advice from Mainstream Green Energy Solutions: choosing a solar installer, calculating solar ROI, and reducing generator dependence in Nigeria.",
  alternates: { canonical: "/our-blog" },
  openGraph: {
    title: "Solar Tips & Insights | Mainstream Green Blog",
    description: "Choosing an installer, calculating ROI, and reducing generator costs in Nigeria.",
    url: "/our-blog",
    type: "website",
  },
};

export const revalidate = 60;

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

export default async function BlogPage() {
  const posts = await listPosts();

  return (
    <main id="main" className="overflow-x-hidden">
      <JsonLd data={breadcrumbsJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/our-blog" }])} />
      <PageHero
        title="Solar advice without the jargon."
        kicker="Article & news"
        text="Guides for choosing the right solar installer, sizing a system for your home, and understanding the business case for solar in Nigeria."
        image="/hero-4.jpg"
      />

      <section className="px-4 py-24 md:px-8 md:py-36">
        <SectionHeading eyebrow="Our blog and news" title="Practical reading for buyers, owners, and businesses.">
          <p>
            Written by the Mainstream Green team. Each post is grounded in the same work we do on installations every week.
          </p>
        </SectionHeading>
        {posts.length === 0 ? (
          <p className="mx-auto mt-14 max-w-2xl text-center text-base text-[var(--ink-600)]">
            New posts are on the way. Check back soon.
          </p>
        ) : (
          <div className="mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-2">
            {posts.map((post) => (
              <article key={post.id} className="group h-full rounded-[2.5rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]">
                <Link href={`/our-blog/${post.slug}`} className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-white">
                  <div className="relative min-h-[260px] overflow-hidden">
                    {post.cover_image ? (
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[var(--mist)] text-sm text-[var(--ink-600)]">
                        No cover image
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-7 md:p-9">
                    <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-blue)]">
                      <span>{post.category ?? "Article"}</span>
                      <span>·</span>
                      <span>{formatDate(post.published_at)}</span>
                      {post.reading_minutes ? (
                        <>
                          <span>·</span>
                          <span>{post.reading_minutes} min read</span>
                        </>
                      ) : null}
                    </div>
                    <h2 className="mt-5 text-2xl font-semibold tracking-[-0.05em] text-[var(--ink-950)] md:text-3xl">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-4 line-clamp-3 text-base leading-7 text-[var(--ink-600)]">{post.excerpt}</p>
                    )}
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-blue)]">
                      Read article
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <CTASection />
    </main>
  );
}
