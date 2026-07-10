import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../data/site";
import { JsonLd } from "../components/JsonLd";
import { breadcrumbsJsonLd } from "../data/jsonLd";

export const metadata: Metadata = {
  title: "Terms of service | Damdavy Technologies",
  description:
    "The terms and conditions that govern your use of the Damdavy Technologies website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main id="main" className="overflow-x-hidden">
      <JsonLd data={breadcrumbsJsonLd([{ name: "Home", path: "/" }, { name: "Terms of service", path: "/terms" }])} />
      <section className="px-4 pb-20 pt-28 md:px-8 md:pb-28 md:pt-48">
        <div className="mx-auto max-w-3xl">
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-blue)]">Legal</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.05em] md:text-6xl">
            Terms of service
          </h1>
          <p className="mt-4 text-sm text-[var(--ink-600)]">Last updated: January 2026</p>
          <div className="prose-damdavy mt-10">
            <p>
              By using {site.url} or any service provided by {site.legalName} (&ldquo;Damdavy&rdquo;), you agree to the
              following terms. Please read them carefully.
            </p>

            <h2>1. About us</h2>
            <p>
              {site.legalName} designs, sells, and installs solar power systems and related products. We are
              registered in Nigeria and operate from {site.address.full}.
            </p>

            <h2>2. Use of the website</h2>
            <ul>
              <li>You must provide accurate information when filling any form on the site.</li>
              <li>You agree not to misuse the site (no scraping, attacks, or attempts to disrupt the service).</li>
              <li>We may update or remove the site or any part of it at any time without notice.</li>
            </ul>

            <h2>3. Quotes and installations</h2>
            <ul>
              <li>Quotes are valid for 30 days from the date of issue unless stated otherwise.</li>
              <li>A formal quote becomes a binding order only after both parties sign an installation agreement.</li>
              <li>Site conditions (roof type, distance to DB board, accessibility) may affect final pricing.</li>
            </ul>

            <h2>4. Online store orders</h2>
            <ul>
              <li>Prices are listed in Nigerian Naira (NGN) and may change without notice.</li>
              <li>An order is accepted only after payment is confirmed by Paystack.</li>
              <li>Delivery timelines are estimates; we are not liable for courier delays outside our control.</li>
            </ul>

            <h2>5. Returns and refunds</h2>
            <p>
              Unused products in their original packaging may be returned within 7 days of delivery for a refund
              less shipping. Installed systems are not eligible for return. Warranty claims are handled under
              each product&rsquo;s warranty terms.
            </p>

            <h2>6. Warranties</h2>
            <p>
              Equipment is covered by the manufacturer&rsquo;s warranty. Installation workmanship is warranted for
              12 months. Warranty does not cover damage from misuse, lightning, floods, or unauthorized
              modification.
            </p>

            <h2>7. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, Damdavy is not liable for any indirect, incidental, or
              consequential damages arising from the use of the site, products, or installed systems.
            </p>

            <h2>8. Intellectual property</h2>
            <p>
              All content on this site (text, images, logos, design) is owned by Damdavy or our licensors and
              may not be copied or republished without written permission.
            </p>

            <h2>9. Governing law</h2>
            <p>These terms are governed by the laws of the Federal Republic of Nigeria. Any dispute will be resolved in Nigerian courts.</p>

            <h2>10. Contact</h2>
            <p>
              Questions about these terms? Email <a href={site.emailHref}>{site.email}</a> or call {site.phone}.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
