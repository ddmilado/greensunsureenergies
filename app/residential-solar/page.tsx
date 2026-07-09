import type { Metadata } from "next";
import { ServiceLanding } from "../components/ServiceLanding";

export const metadata: Metadata = {
  title: "Residential Solar Installation | Damdavy Technologies",
  description:
    "Dependable home solar systems in Nigeria: roof-mounted panels, batteries, and hybrid inverters sized to your actual usage. Cut fuel costs and enjoy steady power.",
  alternates: { canonical: "/residential-solar" },
  openGraph: {
    title: "Residential Solar Installation | Damdavy Technologies",
    description: "Roof-mounted panels, batteries, and hybrid inverters for Nigerian homes.",
    url: "/residential-solar",
    type: "website",
  },
};

export default function ResidentialSolarPage() {
  return (
    <ServiceLanding
      slug="residential-solar"
      path="/residential-solar"
      title="Residential solar that pays you back."
      kicker="Home solar"
      description="A roof-mounted solar system sized to your real usage: fridge, fans, lights, TV, and backup for the essentials when the grid drops."
      heroImage="/hero-1.jpg"
      pillars={[
        {
          title: "Sized to your home",
          text: "We start with a load assessment of every appliance you actually want to run, then size the panels, batteries, and inverter to match — not over-sell you.",
        },
        {
          title: "Built for Nigerian conditions",
          text: "Monocrystalline panels and MPPT charge controllers designed for high heat, partial shading, and frequent grid instability.",
        },
        {
          title: "Quiet, clean backup",
          text: "Hybrid inverter + lithium battery bank delivers instant switchover for the essentials, with no noise, fumes, or fuel deliveries.",
        },
      ]}
      benefits={[
        "Cut monthly fuel spend by 60–80%",
        "Up to 12+ hours of essential-load backup",
        "Silent operation — no generator noise",
        "Lithium batteries with 6,000+ cycle life",
        "Mobile monitoring from anywhere",
        "Cleaner, cooler home during the day",
      ]}
      includes={[
        { title: "Free site assessment", text: "On-site or virtual review of your load, roof, and electrical setup." },
        { title: "Custom system design", text: "Panels, inverter, battery bank, and protection sized to your needs." },
        { title: "Certified installation", text: "Mounting, DC and AC wiring, breaker integration, and commissioning." },
        { title: "Monitoring setup", text: "WiFi/app monitoring on inverter and battery so you can see production." },
        { title: "Workmanship warranty", text: "12-month installation warranty plus manufacturer warranties on equipment." },
        { title: "After-install support", text: "Ongoing maintenance, fault response, and energy usage reports." },
      ]}
      faq={[
        {
          question: "How much does a home solar system cost in Nigeria?",
          answer:
            "A typical 3-bedroom home system (5kVA hybrid + 10kWh battery + 6 panels) lands between ₦2.4m and ₦2.8m installed. Final pricing depends on the system size, roof type, and equipment choice.",
        },
        {
          question: "How long does installation take?",
          answer: "Most residential installations are completed in 1–3 days once equipment is on site and the roof is ready.",
        },
        {
          question: "Will it work during grid outages?",
          answer:
            "Yes. A hybrid inverter with battery backup provides instant switchover. The size of the battery bank determines how long you can run on backup.",
        },
        {
          question: "Can I add capacity later?",
          answer:
            "Yes. We can add panels to grow generation, or add batteries in parallel to extend backup time. We design with future expansion in mind.",
        },
        {
          question: "Do you offer payment plans?",
          answer:
            "We partner with financing providers for customers who qualify. Ask the team about current options during your quote.",
        },
      ]}
    />
  );
}
