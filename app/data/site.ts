import {
  BatteryCharging,
  ChartLineUp,
  CheckCircle,
  Headset,
  HouseLine,
  Lightning,
  Monitor,
  PlugCharging,
  ShieldCheck,
  SolarPanel,
  TrendUp,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";

export const site = {
  name: "Damdavy Technologies",
  legalName: "Damdavy Technologies",
  tagline: "Energy that works. Smiles that last.",
  headline: "Bright power, brighter smiles.",
  description:
    "Dependable solar systems that light up homes, strengthen businesses, and bring peace of mind.",
  longDescription:
    "Damdavy Technologies is a Nigerian solar energy company in Ogun State that designs, installs, and maintains solar power systems for homes and businesses. We help clients reduce fuel and generator costs, enjoy uninterrupted electricity, and get long-term support after installation. Services include solar panel sales and installation, commercial and residential solar systems, battery backup and inverters, energy audits, and performance monitoring.",
  url: "https://damdavytechnologies.com.ng",
  phone: "+234 706 667 0673",
  phoneHref: "tel:+2347066670673",
  email: "ask@damdavytechnologies.com.ng",
  emailHref: "mailto:ask@damdavytechnologies.com.ng",
  address: {
    street: "214 Ibadan road, beside Gatelink filling station, express",
    locality: "Imowo",
    postalCode: "120101",
    region: "Ogun State",
    country: "NG",
    full: "214 Ibadan road, beside Gatelink filling station, express, Imowo 120101, Ogun State",
  },
  hours: "Mon-Sat: 8am-6pm · Sunday: Closed",
  openingHours: [
    "Mo-Sa 08:00-18:00",
  ],
  geo: { latitude: 6.7, longitude: 3.27 },
  areasServed: ["Ogun State", "Lagos State", "Ibadan", "Nigeria"],
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=Damdavy%20Technologies%20214%20Ibadan%20road%20Imowo%20Ogun%20State",
  social: {
    facebook: "https://www.facebook.com/damdavytechnologies",
    instagram: "https://www.instagram.com/damdavytechnologies",
    twitter: "https://twitter.com/damdavytech",
  },
  keywords: [
    "solar installation Nigeria",
    "solar panel installation Ogun State",
    "solar inverter installation Nigeria",
    "commercial solar Nigeria",
    "residential solar systems",
    "battery backup and inverters",
    "solar maintenance and monitoring",
    "solar energy audit",
    "Damdavy Technologies",
  ],
};

export const faqPageItems = [
  {
    question: "What solar services does Damdavy Technologies offer?",
    answer:
      "Damdavy Technologies offers solar panel sales and installation, commercial and residential solar systems, battery backup and inverter systems, energy audits and consultation, and ongoing maintenance with performance monitoring.",
  },
  {
    question: "Where is Damdavy Technologies located?",
    answer:
      "Our head office is at 214 Ibadan road, beside Gatelink filling station, express, Imowo 120101, Ogun State, Nigeria. We serve clients across Ogun State, Lagos, Ibadan, and wider Nigeria.",
  },
  {
    question: "How do I know what solar system size I need?",
    answer:
      "We start with an energy audit that reviews your appliances, operating hours, backup expectations, and budget before recommending panel, battery, and inverter sizes. The assessment can be done on-site or virtually.",
  },
  {
    question: "Does Damdavy install solar for businesses?",
    answer:
      "Yes. We design commercial solar systems that reduce fuel costs and keep operations productive during grid outages, for offices, retail, facilities, and industrial sites.",
  },
  {
    question: "Do you support the system after installation?",
    answer:
      "Yes. Support includes post-installation monitoring, quick fault resolution, maintenance, energy usage reports, and 24/7 customer support.",
  },
  {
    question: "How do I request a solar quote?",
    answer:
      "Call +234 706 667 0673 or request a quote on the contact page. We provide a breakdown of cost, equipment, installation steps, and long-term savings.",
  },
];

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Store", href: "/store" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/our-blog" },
  { label: "Contact", href: "/contact-us" },
];

export const stats = [
  { value: "300+", label: "Happy clients" },
  { value: "23+", label: "Engineers" },
  { value: "540+", label: "Projects done" },
  { value: "4.8", label: "Client rating" },
];

export const valueCards = [
  {
    title: "Solar installation",
    text: "Reliable solar systems built to deliver clean, uninterrupted power daily.",
    icon: SolarPanel,
  },
  {
    title: "Energy storage",
    text: "Smart batteries provide backup power during outages and unstable grid supply.",
    icon: BatteryCharging,
  },
  {
    title: "Maintenance support",
    text: "Monitoring and support keep your solar system performing efficiently after installation.",
    icon: Wrench,
  },
];

export const services = [
  {
    title: "Solar panel sales & installation",
    text: "High-quality solar panels installed professionally for reliable, long-lasting energy.",
    icon: SolarPanel,
  },
  {
    title: "Commercial solar solutions",
    text: "Custom solar systems designed to reduce fuel costs and improve business productivity.",
    icon: ChartLineUp,
  },
  {
    title: "Residential solar systems",
    text: "Dependable home solar solutions that keep your electricity running with less interruption.",
    icon: HouseLine,
  },
  {
    title: "Battery backup & inverters",
    text: "Energy storage and inverter systems that keep essential loads online when power drops.",
    icon: PlugCharging,
  },
  {
    title: "Energy audits & consultation",
    text: "Expert assessments to determine the most efficient and cost-saving solar setup.",
    icon: Monitor,
  },
  {
    title: "Maintenance & performance monitoring",
    text: "Ongoing support to ensure your solar system operates at peak efficiency.",
    icon: Wrench,
  },
];

export const featureList = [
  { title: "24/7 customer support", icon: Headset },
  { title: "Same-day installation", icon: Lightning },
  { title: "Post-installation monitoring", icon: Monitor },
  { title: "Installment payment plans", icon: TrendUp },
  { title: "Free site assessment", icon: CheckCircle },
  { title: "Reliable power backup", icon: BatteryCharging },
  { title: "Quick fault resolution", icon: ShieldCheck },
  { title: "Energy usage reports", icon: ChartLineUp },
];

export const whyChooseUs = [
  {
    title: "Proven reliability",
    text: "Systems are specified for day-and-night performance, using dependable components and installation practices that protect your energy supply.",
  },
  {
    title: "Real fuel and cost savings",
    text: "We help businesses reduce operating costs and help homeowners cut monthly energy expenses with efficient solar setups.",
  },
  {
    title: "Clear, transparent process",
    text: "No hidden charges and no confusing technical talk. Every step is explained clearly before work begins.",
  },
  {
    title: "Customer-first experience",
    text: "From first audit to final launch, the goal is a smooth installation and support that keeps the system working.",
  },
];

export const processSteps = [
  {
    title: "Energy audit",
    text: "We assess your power needs on-site or virtually to recommend the right solar solution.",
  },
  {
    title: "System design & proposal",
    text: "The team creates a tailored system layout with clear pricing, equipment, and savings expectations.",
  },
  {
    title: "Installation & setup",
    text: "Certified technicians install your system with precision, safety, and minimal disruption.",
  },
  {
    title: "Final launch & handover",
    text: "We power on the system, guide you through usage, and confirm that everything runs smoothly.",
  },
];

export const projects = [
  {
    title: "Residential roof installation",
    category: "Homes",
    image: "/hero-1.jpg",
    text: "Roof-mounted solar designed for dependable household backup and reduced generator dependence.",
  },
  {
    title: "Commercial building solar",
    category: "Business",
    image: "/solar-install-1.jpg",
    text: "Business power systems built to reduce diesel spend and keep operations productive during outages.",
  },
  {
    title: "Industrial facility backup",
    category: "Industrial",
    image: "/solar-inspect.jpg",
    text: "Higher-capacity solar and inverter planning for facilities that need stable energy and fast support.",
  },
  {
    title: "Open field solar array",
    category: "Scale",
    image: "/solar-install-2.jpg",
    text: "Ground and open-area installations for larger loads, farms, facilities, and commercial sites.",
  },
];

export const testimonials = [
  {
    name: "Adereti Joshua",
    quote: "Very interesting and beautiful seminar. I love it.",
  },
  {
    name: "Adewale Ogunnugba",
    quote:
      "The practical aspects made me understand how solar works, including calculations for panels, battery size, and inverter size. I look forward to more Damdavy Technologies training.",
  },
  {
    name: "Temitope Racheal",
    quote:
      "A very professional company. Damdavy Technologies installed a ground solar array on our property and everything worked perfectly. I highly recommend them.",
  },
  {
    name: "Omoyemi Adeyinka",
    quote: "Very good customer service, approachable, calm, and knowledgeable about the job.",
  },
  {
    name: "Jesubanwo Adejoke Oluwatoyin",
    quote:
      "Damdavy Technologies is the best of its kind. Their service is on a higher level. I would definitely do more business with them.",
  },
  {
    name: "Olayinka Olumide",
    quote: "Reliable solar company.",
  },
];

export const blogPosts = [
  {
    title: "5 non-negotiable questions to ask before you pay",
    category: "Info",
    date: "December 10, 2025",
    excerpt:
      "Choosing the right solar installer starts with the questions you ask before paying for your home or business system.",
    href: "/our-blog#solar-installer-questions",
  },
  {
    title: "The ROI of solar for Nigerian businesses",
    category: "Business",
    date: "December 10, 2025",
    excerpt:
      "For Nigerian SMEs, energy costs affect margins daily. Solar can shift fuel spend into a predictable long-term asset.",
    href: "/our-blog#solar-business-roi",
  },
];

export const faqItems = [
  {
    question: "How do I know what solar system size I need?",
    answer:
      "A load assessment is the safest starting point. We review your appliances, operating hours, backup expectations, and budget before recommending panels, batteries, and inverter size.",
  },
  {
    question: "Can I pay in installments?",
    answer:
      "The current site advertises installment payment plans. Final terms depend on your selected system and assessment, so the team confirms options during quotation.",
  },
  {
    question: "Do you support systems after installation?",
    answer:
      "Yes. Damdavy emphasizes post-installation monitoring, quick fault resolution, customer support, and maintenance.",
  },
];

export const aboutCopy = {
  intro:
    "We exist to make energy simple, dependable, and truly yours. By helping businesses cut fuel costs and helping families enjoy steady electricity, we bring comfort, confidence, and a little more happiness into every day.",
  value:
    "We stand for dependable, efficient, and transparent solar solutions designed to perform exactly as promised. Above all, we focus on customer happiness: saving you more, powering you better, and keeping you smiling.",
  vision:
    "A future where every business and home enjoys affordable, dependable, and renewable solar energy, leading to higher productivity, reduced costs, and happier living.",
  mission:
    "To deliver dependable, cost-saving solar systems that give businesses true fuel-free freedom and help homeowners enjoy uninterrupted electricity with ease and confidence.",
  promise:
    "Energy freedom that works day after day, bringing comfort, convenience, and peace of mind to every customer.",
};

export const supportLinks = [
  { label: "Call support", href: site.phoneHref },
  { label: "Email support", href: site.emailHref },
  { label: "Request quote", href: "/contact-us#quote" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms of service", href: "/terms" },
  { label: "Cookie policy", href: "/cookie-policy" },
];
