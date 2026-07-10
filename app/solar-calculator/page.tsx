import type { Metadata } from "next";
import { SolarLoadCalculator } from "../components/SolarLoadCalculator";
import { PageHero } from "../components/PageHero";
import { site } from "../data/site";
import { ButtonLink } from "../components/ButtonLink";
import { Phone } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Solar Load Calculator",
  description:
    "Estimate your daily energy consumption and get recommended solar panel, battery, and inverter sizes for your home or business in Nigeria.",
  alternates: { canonical: "/solar-calculator" },
};

export default function SolarCalculatorPage() {
  return (
    <>
      <PageHero
        kicker="Solar tool"
        title="Solar Load Calculator"
        text="Find out how much solar capacity your home or business needs. Add your appliances, see estimated system sizes, and get a cost range — all before you call us."
      />

      <section className="mx-auto max-w-4xl px-4 pb-24">
        <SolarLoadCalculator />

        <div className="mt-12 text-center">
          <p className="text-sm text-[var(--ink-600)]">
            Want a precise assessment? Our team can visit your site and give you an exact quote.
          </p>
          <ButtonLink
            href={site.phoneHref}
            variant="primary"
            className="mt-4 inline-flex"
          >
            <Phone size={18} weight="duotone" />
            Call {site.phone}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
