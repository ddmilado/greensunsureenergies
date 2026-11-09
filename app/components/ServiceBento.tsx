import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { services } from "../data/site";
import { Reveal } from "./Reveal";

const destinations = [
  { href: "/residential-solar", label: "Explore solar installation" },
  { href: "/store", label: "Shop solar products" },
  { href: "/solar-maintenance", label: "Explore maintenance" },
  { href: "/training", label: "Explore training" },
  { href: "/contact-us", label: "Discuss your security needs" },
  { href: "/solar-calculator", label: "Estimate your power needs" },
];

export function ServiceBento() {
  return (
    <div className="service-grid mx-auto max-w-7xl">
      {services.map((service, index) => {
        const Icon = service.icon;
        const destination = destinations[index];
        return (
          <Reveal key={service.title} delay={index * 0.04}>
            <Link href={destination.href} className={`service-tile ${index === 0 ? "service-tile-featured" : ""}`}>
              <div className="service-tile-top">
                <span className="service-tile-icon"><Icon size={28} weight="duotone" /></span>
                <span className="service-tile-number">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <span className="service-tile-link">{destination.label}<ArrowUpRight size={19} aria-hidden="true" /></span>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
