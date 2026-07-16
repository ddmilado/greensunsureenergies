import { faqPageItems, services, site } from "./site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/assets/greensunsure-logo-Cf3zECsy.jpeg`,
    image: `${site.url}/assets/greensunsure-logo-Cf3zECsy.jpeg`,
    description: site.longDescription,
    slogan: site.tagline,
    email: site.email,
    telephone: site.phone,
    foundingDate: "2019",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: site.areasServed.map((area) => ({ "@type": "Place", name: area })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: site.phone,
        email: site.email,
        areaServed: site.areasServed,
        availableLanguage: ["English"],
        contactOption: "TollFree",
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: site.phone,
        email: site.email,
        availableLanguage: ["English"],
      },
    ],
    sameAs: [site.social.facebook, site.social.instagram].filter(Boolean),
    knowsAbout: site.keywords,
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#localbusiness`,
    name: site.name,
    alternateName: "Green Sunsure Solar",
    description: site.longDescription,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/assets/greensunsure-logo-Cf3zECsy.jpeg`,
    logo: `${site.url}/assets/greensunsure-logo-Cf3zECsy.jpeg`,
    priceRange: "₦",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    hasMap: site.mapHref,
    openingHoursSpecification: site.openingHours.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.startsWith("Mo-Sa")
        ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        : ["Sunday"],
      opens: "08:00",
      closes: "18:00",
    })),
    areaServed: site.areasServed.map((area) => ({ "@type": "Place", name: area })),
    sameAs: [site.social.facebook, site.social.instagram].filter(Boolean),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
      worstRating: "1",
    },
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.text,
        provider: { "@type": "LocalBusiness", name: site.name },
        areaServed: site.areasServed.map((area) => ({ "@type": "Place", name: area })),
      },
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    alternateName: "Green Sunsure Energy Solar Solutions",
    description: site.longDescription,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en-NG",
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/our-blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function serviceListJsonLd() {
  return services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.text,
    provider: { "@id": `${site.url}/#localbusiness` },
    serviceType: "Solar energy installation",
    areaServed: site.areasServed.map((area) => ({ "@type": "Place", name: area })),
    url: `${site.url}/services`,
  }));
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqPageItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbsJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  author: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: input.image ? [`${site.url}${input.image.startsWith("/") ? "" : "/"}${input.image}`] : undefined,
    datePublished: input.datePublished,
    author: { "@type": "Organization", name: input.author },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/assets/greensunsure-logo-Cf3zECsy.jpeg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
  };
}
