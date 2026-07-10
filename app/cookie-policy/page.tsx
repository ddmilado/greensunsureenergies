import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../data/site";
import { JsonLd } from "../components/JsonLd";
import { breadcrumbsJsonLd } from "../data/jsonLd";

export const metadata: Metadata = {
  title: "Cookie policy | Damdavy Technologies",
  description: "How Damdavy Technologies uses cookies and similar technologies on this website.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <main id="main" className="overflow-x-hidden">
      <JsonLd data={breadcrumbsJsonLd([{ name: "Home", path: "/" }, { name: "Cookie policy", path: "/cookie-policy" }])} />
      <section className="px-4 pb-20 pt-28 md:px-8 md:pb-28 md:pt-48">
        <div className="mx-auto max-w-3xl">
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-blue)]">Legal</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.05em] md:text-6xl">
            Cookie policy
          </h1>
          <p className="mt-4 text-sm text-[var(--ink-600)]">Last updated: January 2026</p>
          <div className="prose-damdavy mt-10">
            <p>
              This page explains what cookies are, which ones {site.legalName} uses, and how you can control them.
            </p>

            <h2>What are cookies?</h2>
            <p>
              Cookies are small text files that websites ask your browser to store, so the site can remember
              things between requests. Some are essential for the site to work; others help us understand how
              the site is used.
            </p>

            <h2>Cookies we use</h2>
            <ul>
              <li>
                <strong>Essential cookies</strong> — for authentication (Supabase auth) and your shopping cart
                (guest or signed-in). These cannot be disabled.
              </li>
              <li>
                <strong>Preference cookies</strong> — to remember small UI choices (like closed banners).
              </li>
              <li>
                <strong>Analytics cookies</strong> — anonymized usage statistics to help us improve the site
                (only if you consent in a future consent banner).
              </li>
            </ul>

            <h2>Controlling cookies</h2>
            <p>
              You can clear or block cookies in your browser at any time. Blocking essential cookies will break
              parts of the site (you will not be able to stay logged in, and your cart will not be saved).
            </p>

            <h2>Questions</h2>
            <p>
              Contact us at <a href={site.emailHref}>{site.email}</a> if you have questions about our use of cookies.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
