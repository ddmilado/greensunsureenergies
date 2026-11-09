import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, SunHorizon } from "@phosphor-icons/react/dist/ssr";

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
    <main id="main" className="auth-page">
      <div className="auth-shell">
        <aside className="auth-story" aria-label="Green Sunsure Energy">
          <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" preload />
          <div className="auth-story-shade" />
          <div className="auth-story-top"><SunHorizon size={26} weight="duotone" /><span>Good energy. Every day.</span></div>
          <div className="auth-story-copy">
            <p className="auth-story-eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
            <p>{subtitle}</p>
            <div className="auth-story-caption"><span>Warri, Delta State</span><span>Installation & local support</span></div>
          </div>
        </aside>
        <div className="auth-form-panel">
          <Link href="/" className="auth-back"><ArrowLeft size={16} aria-hidden="true" /> Back to home</Link>
          <div className="auth-form-content">{children}</div>
          <div className="auth-help"><span>Need a hand with your account?</span><Link href="/contact-us">Contact our team <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
        </div>
      </div>
    </main>
  );
}
