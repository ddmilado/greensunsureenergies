import Link from "next/link";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { site } from "../../data/site";

type Search = { kind?: string };

export const metadata = {
  title: "Thank you | Green Sunsure Energy",
  robots: { index: false, follow: false },
};

const messages: Record<string, { title: string; body: string }> = {
  quote: {
    title: "Your quote request is in.",
    body: "A Green Sunsure team member will call you back within one business day to discuss your load, location, and the right system for your home or business.",
  },
  support: {
    title: "Your support request was sent.",
    body: "We&rsquo;ll get back to you as soon as possible with the right next step for your system.",
  },
  contact: {
    title: "Your message is on the way.",
    body: "Thanks for reaching out. We&rsquo;ll reply to your message within one business day.",
  },
};

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const kind = (sp.kind ?? "contact").toLowerCase();
  const message = messages[kind] ?? messages.contact;

  return (
    <main id="main" className="overflow-x-hidden">
      <section className="px-4 pb-20 pt-40 md:px-8 md:pb-28 md:pt-48">
        <div className="mx-auto max-w-2xl text-center">
          <CheckCircle size={64} weight="duotone" className="mx-auto text-[var(--solar-lime)]" />
          <h1
            className="mt-8 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.05em] md:text-6xl"
            dangerouslySetInnerHTML={{ __html: message.title }}
          />
          <p
            className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[var(--ink-600)]"
            dangerouslySetInnerHTML={{ __html: message.body }}
          />
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={site.phoneHref}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-blue)]"
            >
              Call {site.phone}
            </a>

          </div>
        </div>
      </section>
    </main>
  );
}
