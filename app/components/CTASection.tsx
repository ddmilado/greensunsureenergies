import { site } from "../data/site";
import { ButtonLink } from "./ButtonLink";
import { Reveal } from "./Reveal";

export function CTASection() {
  return (
    <section className="px-4 py-24 md:px-8 md:py-36">
      <Reveal className="mx-auto max-w-7xl rounded-[2.75rem] bg-[var(--ink-950)] p-2 text-white shadow-[0_40px_140px_rgba(0,26,45,0.24)]">
        <div className="relative overflow-hidden rounded-[2.25rem] px-6 py-16 md:px-12 md:py-24">
          <div className="absolute -right-28 -top-28 size-72 rounded-full bg-[var(--brand-blue)] opacity-25 blur-3xl" />
          <div className="absolute -bottom-36 left-12 size-80 rounded-full bg-[var(--solar-lime)] opacity-18 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--solar-lime)]">
                Thinking about going solar?
              </p>
              <h2 className="max-w-4xl text-balance text-4xl font-semibold leading-[0.96] tracking-[-0.06em] md:text-6xl">
                Start your journey to reliable, affordable power.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
                Request a free solar estimate and get a breakdown of cost, equipment, installation steps, and long-term savings.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink href="/contact-us#quote">Request quote</ButtonLink>
              <ButtonLink href={site.phoneHref} variant="secondary">
                Call now
              </ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
