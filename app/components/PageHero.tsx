import Image from "next/image";
import { ButtonLink } from "./ButtonLink";

export function PageHero({
  title,
  kicker,
  text,
  image = "/hero-2.jpg",
}: {
  title: string;
  kicker: string;
  text: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--ink-950)] px-4 pb-20 pt-28 text-white md:px-8 md:pb-28 md:pt-44">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(47,224,255,0.22),transparent_34%),radial-gradient(circle_at_82%_16%,rgba(146,210,67,0.18),transparent_30%)]" />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
        <div className="relative z-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--solar-lime)] md:text-sm">{kicker}</p>
          <h1 className="max-w-5xl text-balance text-[2.5rem] font-semibold leading-[0.92] tracking-[-0.07em] md:text-7xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 md:text-lg md:mt-7">{text}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact-us#quote">Request quote</ButtonLink>
            <ButtonLink href="/services" variant="secondary">Explore services</ButtonLink>
          </div>
        </div>
        <div className="relative z-10 rounded-[2.5rem] bg-white/8 p-1.5 ring-1 ring-white/14">
          <div className="relative min-h-[200px] overflow-hidden rounded-[2rem] md:min-h-[360px]">
            <Image src={image} alt="Solar energy installation by Damdavy Technologies" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(3,13,24,0.45))]" />
          </div>
        </div>
      </div>
    </section>
  );
}
