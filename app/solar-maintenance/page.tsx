import type { Metadata } from "next";
import { ServiceLanding } from "../components/ServiceLanding";

export const metadata: Metadata = {
  title: "Solar Maintenance & Monitoring | Green Sunsure Energy",
  description:
    "Scheduled cleaning, inspections, performance monitoring, and 24/7 fault response for residential and commercial solar systems across Nigeria.",
  alternates: { canonical: "/solar-maintenance" },
  openGraph: {
    title: "Solar Maintenance & Monitoring | Green Sunsure Energy",
    description: "Keep your solar system performing like new.",
    url: "/solar-maintenance",
    type: "website",
  },
};

export default function SolarMaintenancePage() {
  return (
    <ServiceLanding
      slug="solar-maintenance"
      path="/solar-maintenance"
      title="Keep your system performing like new."
      kicker="Maintenance & monitoring"
      description="A 20-year asset needs care. We provide scheduled cleaning, inspections, performance monitoring, and fast fault response for any solar system — even if we didn&rsquo;t install it."
      heroImage="/solar-inspect.jpg"
      pillars={[
        {
          title: "Scheduled cleaning",
          text: "Panel cleaning, inverter checks, and tightening of connections on a quarterly or biannual schedule.",
        },
        {
          title: "Performance monitoring",
          text: "We watch your system remotely and flag production drops before they become expensive problems.",
        },
        {
          title: "Fast fault response",
          text: "A working support phone line and a technician on-call for breakdowns.",
        },
      ]}
      benefits={[
        "Catch faults early, before they become costly",
        "Keep production within 90%+ of nameplate",
        "Extend equipment life with regular cleaning",
        "Maintain warranty coverage on panels and inverters",
        "Quarterly performance reports for businesses",
        "Priority response for contracted customers",
      ]}
      includes={[
        { title: "Quarterly site visit", text: "Panel cleaning, visual inspection, electrical checks, and torque verification." },
        { title: "Remote monitoring", text: "We connect to your inverter/battery monitoring and review it monthly." },
        { title: "Annual health report", text: "A written summary of production, anomalies, and recommendations." },
        { title: "Fault response", text: "Same-week callout for any production drop or alarm in your monitoring." },
        { title: "Battery health checks", text: "SoH testing, balancing, and replacement recommendations before failures." },
        { title: "Spare parts", text: "Stocked breakers, fuses, and connectors for quick swap on callout." },
      ]}
      faq={[
        {
          question: "Do you maintain systems you didn&rsquo;t install?",
          answer:
            "Yes. We pick up systems from other installers all the time. We&rsquo;ll do a one-time audit and then put you on a maintenance plan.",
        },
        {
          question: "How often should panels be cleaned?",
          answer:
            "In most Nigerian locations, every 3–6 months. Dust, leaves, and bird droppings can drop production by 10–30% if left unattended.",
        },
        {
          question: "What does the performance report include?",
          answer:
            "Monthly kWh produced, peak output, comparison to expected, fault events, and any recommendations for repair or upgrade.",
        },
        {
          question: "Do you have a maintenance contract for businesses?",
          answer:
            "Yes. We have monthly and quarterly contracts for commercial sites with SLA response times and dedicated support.",
        },
        {
          question: "Can you fix a system that another installer quoted as needing replacement?",
          answer:
            "Often yes. We&rsquo;ll do an independent audit before recommending any replacement. Many issues are simpler than they first appear.",
        },
      ]}
    />
  );
}
