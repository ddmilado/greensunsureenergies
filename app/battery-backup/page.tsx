import type { Metadata } from "next";
import { ServiceLanding } from "../components/ServiceLanding";

export const metadata: Metadata = {
  title: "Battery Backup & Inverter Systems | Mainstream Green Energy Solutions",
  description:
    "Lithium and gel battery banks, hybrid and pure sine wave inverters for Nigerian homes and businesses. Instant switchover, long cycle life, and proper sizing.",
  alternates: { canonical: "/battery-backup" },
  openGraph: {
    title: "Battery Backup & Inverter Systems | Mainstream Green Energy Solutions",
    description: "Lithium and gel batteries, hybrid and pure sine wave inverters.",
    url: "/battery-backup",
    type: "website",
  },
};

export default function BatteryBackupPage() {
  return (
    <ServiceLanding
      slug="battery-backup"
      path="/battery-backup"
      title="Battery backup that holds the line."
      kicker="Energy storage"
      description="Lithium and gel battery banks paired with hybrid or pure sine wave inverters — for instant switchover, long cycle life, and storage you can rely on."
      heroImage="/solar-install-2.jpg"
      pillars={[
        {
          title: "Lithium (LiFePO4) for new builds",
          text: "6,000+ cycles, 80% depth of discharge, built-in BMS, 7+ year warranty. The default for new installations.",
        },
        {
          title: "Gel for budget systems",
          text: "Maintenance-free deep-cycle gel batteries for inverter backups where lithium is over-budget.",
        },
        {
          title: "Hybrid and pure sine wave",
          text: "We size the inverter to your actual load including motor start surges (fridges, ACs, pumps).",
        },
      ]}
      benefits={[
        "Instant switchover during grid drops",
        "6,000+ cycles on LiFePO4 (≈15 years of daily use)",
        "Built-in BMS protects against overcharge and deep discharge",
        "WiFi/app monitoring on supported inverters",
        "Parallel-ready for larger systems",
        "Compatible with new and existing solar arrays",
      ]}
      includes={[
        { title: "Battery sizing", text: "We size the bank to your essential loads and desired backup hours." },
        { title: "Inverter selection", text: "Hybrid, off-grid, or pure sine wave — we match the inverter to your loads and growth plans." },
        { title: "Protection integration", text: "Breakers, fuses, surge protection, and proper cable sizing throughout." },
        { title: "BMS configuration", text: "Communication cables, DIP switches, and app setup for supported batteries." },
        { title: "Monitoring access", text: "Web and mobile dashboards for inverter and battery telemetry." },
        { title: "Warranty registration", text: "We register the manufacturer warranty on your behalf." },
      ]}
      faq={[
        {
          question: "How long will a battery backup run my essentials?",
          answer:
            "A 10kWh LiFePO4 battery typically runs fridge, fans, lights, and a TV for 10–14 hours. Larger banks extend this further.",
        },
        {
          question: "Can I keep my existing inverter?",
          answer:
            "Often yes, depending on age and compatibility. We&rsquo;ll assess during the site visit and recommend the cleanest path.",
        },
        {
          question: "What&rsquo;s the difference between lithium and gel?",
          answer:
            "Lithium (LiFePO4) lasts roughly 3× as long as gel, weighs about half, and gives you more usable capacity per kWh. Gel is cheaper upfront but more expensive per cycle.",
        },
        {
          question: "Do you install second-life or repurposed batteries?",
          answer:
            "No. We only install new, manufacturer-warranted batteries. Battery safety is not a place to cut costs.",
        },
        {
          question: "Can I monitor the battery from my phone?",
          answer:
            "Yes — most modern inverters and LiFePO4 batteries support WiFi monitoring. We set this up during commissioning.",
        },
      ]}
    />
  );
}
