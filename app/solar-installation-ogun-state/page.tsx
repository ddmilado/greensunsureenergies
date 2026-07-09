import type { Metadata } from "next";
import { ServiceLanding } from "../components/ServiceLanding";

export const metadata: Metadata = {
  title: "Solar Installation in Ogun State | Damdavy Technologies",
  description:
    "Solar panel and battery installation across Ogun State, Lagos, and Ibadan. Local team, fast response, and a track record of residential and commercial installs.",
  alternates: { canonical: "/solar-installation-ogun-state" },
  openGraph: {
    title: "Solar Installation in Ogun State | Damdavy Technologies",
    description: "Local solar installers in Ogun State, Lagos, and Ibadan.",
    url: "/solar-installation-ogun-state",
    type: "website",
  },
};

export default function SolarOgunStatePage() {
  return (
    <ServiceLanding
      slug="solar-installation-ogun-state"
      path="/solar-installation-ogun-state"
      title="Solar installation across Ogun State."
      kicker="Ogun State solar"
      description="From Sagamu to Ado-Odo, Ibafo to Imowo — we install residential and commercial solar systems across Ogun State, plus Lagos and Ibadan."
      heroImage="/hero-2.jpg"
      pillars={[
        {
          title: "Local team, fast response",
          text: "Based in Imowo. We can typically be on-site within 1–3 days for quotes and same-week for installations.",
        },
        {
          title: "Homes and businesses",
          text: "We install on flat roofs, pitched roofs, ground mounts, and commercial sheds. No project is too small or too complex.",
        },
        {
          title: "Support that stays local",
          text: "When you need us after installation, we&rsquo;re a short drive away — not a call centre in another state.",
        },
      ]}
      benefits={[
        "Free site assessment across Ogun State",
        "1–3 day installation on most residential jobs",
        "Local after-install support and maintenance",
        "We also serve Lagos and Ibadan",
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
          question: "Which parts of Ogun State do you cover?",
          answer:
            "Sagamu, Ibafo, Mowe, Imowo, Ado-Odo, Otta, Abeokuta, Ijebu-Ode, and the surrounding areas. We also serve Lagos and Ibadan.",
        },
        {
          question: "How quickly can you come for a site visit?",
          answer: "Most site visits are scheduled within 1–3 business days of your request.",
        },
        {
          question: "Do you work on estates with restrictions?",
          answer:
            "Yes — we&rsquo;ve installed on multiple gated estates. We coordinate access with the estate management in advance.",
        },
        {
          question: "Can I visit your office?",
          answer:
            "Of course. Our office is at 214 Ibadan road, beside Gatelink filling station, Imowo, Ogun State. Call ahead so we can have someone ready for you.",
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
