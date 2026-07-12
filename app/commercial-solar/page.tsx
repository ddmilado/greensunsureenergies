import type { Metadata } from "next";
import { ServiceLanding } from "../components/ServiceLanding";

export const metadata: Metadata = {
  title: "Commercial Solar Systems | Mainstream Green Energy Solutions",
  description:
    "Commercial and industrial solar systems that cut fuel costs, keep operations productive during outages, and lock in energy spend. Offices, retail, facilities, and more.",
  alternates: { canonical: "/commercial-solar" },
  openGraph: {
    title: "Commercial Solar Systems | Mainstream Green Energy Solutions",
    description: "Cut fuel costs, keep operations productive, lock in energy spend.",
    url: "/commercial-solar",
    type: "website",
  },
};

export default function CommercialSolarPage() {
  return (
    <ServiceLanding
      slug="commercial-solar"
      path="/commercial-solar"
      title="Commercial solar that protects your margins."
      kicker="Business solar"
      description="A solar + battery system designed around your operating hours, load profile, and outage risk — so the generator becomes the backup, not the primary."
      heroImage="/solar-install-1.jpg"
      pillars={[
        {
          title: "Sized to your operations",
          text: "We model your real load (not just square-meterage of roof) to right-size the system, including future expansion.",
        },
        {
          title: "Three-phase ready",
          text: "We design for 3-phase commercial sites, with parallel inverters for higher capacities and balanced phase loading.",
        },
        {
          title: "Generator as backup",
          text: "Solar + battery handles the daily load. The generator only fires in a long, deep outage — saving hours of fuel every week.",
        },
      ]}
      benefits={[
        "Cut diesel spend by 60–90%",
        "Stable voltage and frequency for sensitive equipment",
        "Instant switchover for refrigeration and POS",
        "Remote monitoring and proactive fault response",
        "Predictable monthly energy costs",
        "Improved ESG profile for partners and clients",
      ]}
      includes={[
        { title: "Load audit & ROI model", text: "We build a side-by-side cost comparison so you can see the payback before paying." },
        { title: "Three-phase system design", text: "Single or parallel inverters, balanced phase loading, surge protection." },
        { title: "Rooftop or ground-mount install", text: "Whatever fits the site. We survey and design the structure." },
        { title: "Generator integration", text: "Automatic changeover with solar-first, grid-second, generator-last priority." },
        { title: "Monitoring dashboard", text: "See production, consumption, and battery state on web or mobile." },
        { title: "Maintenance contract", text: "Scheduled cleaning, inspections, and 24/7 fault response." },
      ]}
      faq={[
        {
          question: "How long is the payback period for a commercial system?",
          answer:
            "Most commercial customers in Nigeria see payback within 2–4 years, depending on current fuel spend and the size of the system. We model this for you in the proposal.",
        },
        {
          question: "Can you work around our operating hours?",
          answer:
            "Yes. We schedule installations to minimize disruption — including nights or weekends for active sites.",
        },
        {
          question: "Do you handle permits and inspections?",
          answer:
            "We handle the technical installation, and we help coordinate any inspections or utility notifications your site may need.",
        },
        {
          question: "What size system do I need?",
          answer:
            "That depends on your load and the hours you want to cover. Most SMEs we work with land between 10kVA and 30kVA, paired with 20–60kWh of battery.",
        },
        {
          question: "Can I expand the system later?",
          answer:
            "Yes. We design with parallel inverters and modular battery banks so you can grow as your business grows.",
        },
      ]}
    />
  );
}
