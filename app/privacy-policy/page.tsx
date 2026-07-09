import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../data/site";
import { JsonLd } from "../components/JsonLd";
import { breadcrumbsJsonLd } from "../data/jsonLd";

export const metadata: Metadata = {
  title: "Privacy policy | Damdavy Technologies",
  description:
    "How Damdavy Technologies collects, uses, and protects your personal information when you use our website, request a quote, or buy from our store.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main id="main" className="overflow-x-hidden">
      <JsonLd data={breadcrumbsJsonLd([{ name: "Home", path: "/" }, { name: "Privacy policy", path: "/privacy-policy" }])} />
      <section className="px-4 pb-20 pt-40 md:px-8 md:pb-28 md:pt-48">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-600)] transition hover:text-[var(--ink-950)]">
            <span aria-hidden>←</span> Back to home
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-blue)]">Legal</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.05em] md:text-6xl">
            Privacy policy
          </h1>
          <p className="mt-4 text-sm text-[var(--ink-600)]">Last updated: January 2026</p>
          <div className="prose-damdavy mt-10">
            <p>
              This privacy policy explains how {site.legalName} (&ldquo;Damdavy&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects,
              uses, and protects your personal information when you visit our website at {site.url}, request a quote,
              or buy from our online store.
            </p>

            <h2>1. What we collect</h2>
            <ul>
              <li>Contact information you provide directly: name, email, phone number, address.</li>
              <li>Order information when you buy from the store: shipping address, order history.</li>
              <li>Account information when you sign up: email, encrypted password, profile name.</li>
              <li>Automatic information: IP address, browser, device, and pages visited.</li>
              <li>Cookies and similar technologies for cart, authentication, and analytics.</li>
            </ul>

            <h2>2. How we use it</h2>
            <ul>
              <li>To respond to your quote, contact, and support requests.</li>
              <li>To process and deliver orders, including payment via Paystack.</li>
              <li>To create and maintain your account.</li>
              <li>To improve our website, products, and customer experience.</li>
              <li>To send important service messages (order updates, security notices).</li>
            </ul>

            <h2>3. Payment processing</h2>
            <p>
              Payments are processed by Paystack. We do not store your full card details on our servers. Paystack
              handles card information under their own privacy policy and PCI-DSS controls.
            </p>

            <h2>4. Sharing</h2>
            <p>
              We do not sell your personal information. We share it only with service providers that help us run
              the business (Paystack for payments, Supabase for hosting our database, and shipping providers for
              delivery) and where required by law.
            </p>

            <h2>5. Cookies</h2>
            <p>
              We use cookies for authentication, your shopping cart, and basic analytics. You can disable cookies
              in your browser, but parts of the site (like checkout) may stop working.
            </p>

            <h2>6. Your rights</h2>
            <p>
              You can request access, correction, or deletion of your personal data at any time by emailing{" "}
              <a href={site.emailHref}>{site.email}</a>. We respond within 30 days.
            </p>

            <h2>7. Data retention</h2>
            <p>
              We keep your account data while your account is active and for as long as needed to comply with
              legal, tax, and accounting obligations. Order records are kept for at least 7 years.
            </p>

            <h2>8. Security</h2>
            <p>
              We use HTTPS, encrypted passwords, row-level security in our database, and restricted access to
              customer data. No system is 100% secure; please contact us if you suspect any issue with your data.
            </p>

            <h2>9. Children</h2>
            <p>Our website is not directed at children under 16, and we do not knowingly collect their data.</p>

            <h2>10. Changes</h2>
            <p>
              We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top will reflect
              any change.
            </p>

            <h2>11. Contact</h2>
            <p>
              Questions? Call {site.phone} or email <a href={site.emailHref}>{site.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
