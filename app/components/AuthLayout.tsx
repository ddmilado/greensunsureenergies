import Image from "next/image";
import Link from "next/link";
import { site } from "../data/site";

export function AuthLayout({
  eyebrow,
  title,
  subtitle,
  children,
  image = "/hero-3.jpg",
  imageAlt = "Mainstream Green solar installation",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[var(--mist)] pt-24 md:pt-28">
      {/* desktop: split layout, mobile: stacked with a small hero on top */}
      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl grid-cols-1 gap-0 px-0 md:grid-cols-[1.05fr_1fr] md:px-6">
        {/* photo panel */}
        <div className="relative h-64 overflow-hidden md:h-auto md:rounded-l-[2rem]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,13,24,0.18),rgba(3,13,24,0.78))]" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--solar-lime)]">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-white md:text-4xl">
              {title}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/76 md:text-base">
              {subtitle}
            </p>
          </div>
        </div>

        {/* form panel */}
        <div className="flex items-center justify-center bg-[var(--mist)] px-6 py-10 md:py-16">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
