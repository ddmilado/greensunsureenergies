import type { Metadata } from "next";
import { Clock, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "../components/ContactForm";
import { JsonLd } from "../components/JsonLd";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { site } from "../data/site";
import { breadcrumbsJsonLd } from "../data/jsonLd";

export const metadata: Metadata = {
  title: "Contact Green Sunsure Energy | Get a Solar Quote",
  description:
    "Request a free solar quote or talk to the Green Sunsure Energy team about installation, batteries, and maintenance in Warri, Delta State, and Nigeria.",
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: "Contact Green Sunsure Energy | Get a Solar Quote",
    description: "Request a free quote or call the Green Sunsure solar team in Warri, Delta State, Nigeria.",
    url: "/contact-us",
    type: "website",
  },
};

export default function ContactPage() {
  const contactCards = [
    { title: "Head office", text: site.address.full, icon: MapPin, href: site.mapHref },
    { title: "Office hour", text: site.hours, icon: Clock },
    { title: "Email support", text: site.email, icon: EnvelopeSimple, href: site.emailHref },
    { title: "Phone", text: site.phone, icon: Phone, href: site.phoneHref },
  ];

  return (
    <main id="main" className="overflow-x-hidden">
      <JsonLd data={breadcrumbsJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact-us" }])} />
      <PageHero
        title="Tell us how we can support your power needs."
        kicker="Contact us"
        text="Connect with the team for tailored solar advice and a smoother path to installation."
        image="/hero-1.jpg"
      />

      <section className="px-4 py-24 md:px-8 md:py-36">
        <SectionHeading eyebrow="Reach Green Sunsure" title="A quote call, a site visit, or a direct message.">
          <p>Send the details of what you want powered, or call the team directly for the next step.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-4">
          {contactCards.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <article className="h-full rounded-[2.25rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)] transition duration-500 hover:-translate-y-1">
                <div className="h-full rounded-[1.85rem] bg-white p-6">
                  <Icon size={28} weight="duotone" className="text-[var(--brand-blue)]" />
                  <h2 className="mt-7 text-xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[var(--ink-600)]">{item.text}</p>
                </div>
              </article>
            );
            return (
              <Reveal key={item.title} delay={index * 0.05}>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>
                    {content}
                  </a>
                ) : (
                  content
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="quote" className="bg-[var(--ink-950)] px-4 py-24 text-white md:px-8 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="sticky top-32">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--solar-lime)]">Request support</p>
              <h2 className="max-w-3xl text-4xl font-semibold leading-[0.96] tracking-[-0.06em] md:text-6xl">
                Send a message or request a free quote call.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
                Share your location, your load expectations, and whether you need home, business, or industrial backup.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-5 md:grid-cols-2">
              <ContactForm />
              <ContactForm quoteOnly />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
