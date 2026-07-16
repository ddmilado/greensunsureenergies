import type { Metadata } from "next";
import { ServiceLanding } from "../components/ServiceLanding";

export const metadata: Metadata = {
  title: "Solar Installation in Warri & Delta State | Green Sunsure Energy",
  description:
    "Solar panel and battery installation across Warri, Effurun, Udu, and wider Delta State. Local team, fast response, and a track record of residential and commercial installs.",
  alternates: { canonical: "/solar-installation-ogun-state" },
  openGraph: {
    title: "Solar Installation in Warri & Delta State | Green Sunsure Energy",
    description: "Local solar installers in Warri, Effurun, Udu, and Delta State.",
    url: "/solar-installation-ogun-state",
    type: "website",
  },
};

export default function SolarOgunStatePage() {
  return (
    <ServiceLanding
      slug="solar-installation-ogun-state"
      path="/solar-installation-ogun-state"
      title="Solar installation across Delta State."
      kicker="Warri solar"
      description="From Effurun to Udu, Okuokoko to the industrial layouts — we install residential and commercial solar systems across Warri and Delta State, plus all 36 states with certified installers in major cities."
      heroImage="/hero-2.jpg"
      pillars={[
        {
          title: "Local team, fast response",
          text: "Based in Warri. We can typically be on-site within 1–3 days for quotes and same-week for installations.",
        },
        {
          title: "Homes and businesses",
          text: "We install on flat roofs, pitched roofs, ground mounts, and commercial sheds. No project is too small or too complex.",
        },
        {
          title: "Support that stays local",
          text: "When you need us after installation, we're right here in Delta State — not a call centre in another state.",
        },
      ]}
      benefits={[
        "Free site assessment across Warri and Delta State",
        "1–3 day installation on most residential jobs",
        "Local after-install support and maintenance",
        "We cover all 36 states with certified installers in major cities",
        "No high-pressure sales tactics",
        "Honest quotes, line-by-line, no hidden costs",
      ]}
      includes={[
        { title: "On-site assessment", text: "We visit, measure your roof, and discuss your load expectations." },
        { title: "Written quote", text: "Line-by-line breakdown of equipment, installation, and warranty terms." },
        { title: "Permit guidance", text: "Help with any permits or inspections your estate or LGA may need." },
        { title: "Installation", text: "Mounting, electrical, inverter setup, and battery commissioning." },
        { title: "Handover & training", text: "We walk you through the system, monitoring app, and maintenance basics." },
        { title: "Local maintenance", text: "Quarterly or biannual cleaning and inspection plans are available." },
      ]}
      faq={[
        {
          question: "Which parts of Delta State do you cover?",
          answer:
            "Warri, Effurun, Udu, Okuokoko, and the surrounding areas. We also serve all 36 states with certified installers in major cities.",
        },
        {
          question: "How quickly can you come for a site visit?",
          answer: "Most site visits are scheduled within 1–3 business days of your request.",
        },
        {
          question: "Do you work on estates with restrictions?",
          answer:
            "Yes — we've installed on multiple gated estates. We coordinate access with the estate management in advance.",
        },
        {
          question: "Can I visit your office?",
          answer:
            "Of course. Our office is at 53 Udu Road, opposite Rainoil filling station, close to Udu Bridge, beside GKM, Warri, Delta State. Call ahead so we can have someone ready for you.",
        },
        {
          question: "Do you offer same-day installation?",
          answer:
            "For small jobs (a single battery + small inverter), sometimes. For full PV installs, we usually schedule within 1–2 weeks of quote approval.",
        },
      ]}
    />
  );
}
