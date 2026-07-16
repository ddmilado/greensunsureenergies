import Image from "next/image";
import Link from "next/link";
import { Logo } from "./Logo";

export function AuthLayout({
  eyebrow,
  title,
  subtitle,
  children,
  image = "/assets/solar1-Bl0Gsz9o.jpg",
  imageAlt = "Green Sunsure solar installation",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[var(--paper)]">
      <div className="mx-auto grid min-h-screen grid-cols-1 md:grid-cols-[1.1fr_1fr]">
        {/* Photo panel — left side on desktop, hidden on mobile */}
        <div className="relative hidden overflow-hidden md:block">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="50vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,13,24,0.25),rgba(3,13,24,0.82))]" />
          <div className="absolute inset-0 flex flex-col justify-between p-10">
            <Link href="/" className="inline-flex">
              <Logo />
            </Link>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--solar-lime)]">
                {eyebrow}
              </p>
              <h2 className="mt-3 max-w-md text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.04em] text-white md:text-4xl">
                {title}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/72 md:text-base">
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Form panel — right side */}
        <div className="flex flex-col items-center justify-center bg-[var(--shell)] px-6 py-12 md:px-12">
          {/* Mobile-only logo */}
          <div className="mb-8 md:hidden">
            <Link href="/" className="inline-flex">
              <Logo />
            </Link>
          </div>
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
