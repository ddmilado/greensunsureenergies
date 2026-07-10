import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JsonLd } from "./components/JsonLd";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { AnalyticsScripts } from "./components/AnalyticsScripts";
import { ChatBot } from "./components/ChatBot";
import { site } from "./data/site";
import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from "./data/jsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Damdavy Technologies — Solar Installation in Ogun State, Nigeria",
    template: "%s — Damdavy Technologies",
  },
  description: site.longDescription,
  applicationName: site.name,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: site.keywords,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Solar energy",
  alternates: {
    canonical: "/",
    languages: { "en-NG": "/" },
  },
  formatDetection: { email: false, address: true, telephone: true },
  openGraph: {
    title: "Damdavy Technologies — Solar Energy Systems in Nigeria",
    description:
      "Dependable solar systems that cut fuel costs, power homes and businesses, and keep support close after installation.",
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: "/logo-banner.png",
        width: 887,
        height: 330,
        alt: "Damdavy Technologies logo",
      },
      {
        url: "/hero-2.jpg",
        width: 1400,
        height: 969,
        alt: "Solar panels installed by Damdavy Technologies",
      },
    ],
    locale: "en_NG",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Damdavy Technologies — Solar Energy Systems in Nigeria",
    description:
      "Dependable solar systems for Nigerian homes and businesses. Installation, batteries, maintenance, and support.",
    images: ["/hero-2.jpg"],
    creator: "@damdavytech",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png" }],
  },
  manifest: "/site.webmanifest",
  verification: {
    // Add your real Google Search Console / Bing values here after verification.
    google: "",
    other: { me: [site.social.facebook, site.social.instagram, site.social.twitter] },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NG" className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full bg-[var(--paper)] text-[var(--ink-950)]">
        <JsonLd data={[organizationJsonLd(), localBusinessJsonLd(), websiteJsonLd()]} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <AnalyticsScripts />
        <ChatBot />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
