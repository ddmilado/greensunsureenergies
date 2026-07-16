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
  Camera,
  GraduationCap,
} from "@phosphor-icons/react/dist/ssr";

export const site = {
  name: "Green Sunsure Energy",
  legalName: "Green Sunsure Energy Solution And Technology Ltd",
  tagline: "Empowering homes & businesses with clean, reliable energy.",
  headline: "Solar Energy Solutions in Warri",
  description:
    "Professional solar installation, maintenance & energy solutions in Warri, Delta State. Solar products, training & instant cost estimation. Serving Delta & beyond.",
  longDescription:
    "Green Sunsure Energy Solution And Technology Ltd is a professional solar installation and renewable energy company in Warri, Delta State. We provide high-quality solar panel sales and installations, battery backup systems, hybrid inverters, solar street lights, professional maintenance, and hands-on solar technical training programs. We serve residential, commercial, and industrial clients in Delta State and across Nigeria.",
  url: "https://www.greensunsurenergy.com",
  phone: "+234 903 826 0459",
  phoneHref: "tel:+2349038260459",
  email: "info@greensunsurenergy.com",
  emailHref: "mailto:info@greensunsurenergy.com",
  address: {
    street: "53 Udu road, opposite Rainoil filling station, close to Udu bridge beside GKM",
    locality: "Warri",
    postalCode: "300011",
    region: "Delta State",
    country: "NG",
    full: "53 Udu Road, Warri, Delta State, Nigeria",
  },
  hours: "Mon-Sat: 8am-6pm · Sunday: Closed",
  openingHours: [
    "Mo-Sa 08:00-18:00",
  ],
  geo: { latitude: 5.5167, longitude: 5.7500 },
  areasServed: ["Warri", "Delta State", "Effurun", "Udu", "Benin", "Nigeria"],
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=Green%20Sunsure%20Energy%20Warri%20Delta%20State",
  social: {
    facebook: "https://facebook.com/greensunsure",
    instagram: "https://instagram.com/greensunsure",
    twitter: "",
  },
  keywords: [
    "solar company warri",
    "solar installation delta state",
    "solar products nigeria",
    "solar power solutions",
    "solar training delta",
    "solar cost estimator",
    "renewable energy warri",
    "solar maintenance",
    "green energy delta",
  ],
};

export const faqPageItems = [
  {
    question: "What solar services does Green Sunsure Energy offer?",
    answer:
      "Green Sunsure Energy offers professional commercial and residential solar installation, high-quality solar product sales (panels, batteries, inverters, street lights), system maintenance and cleaning, CCTV security systems, and certified hands-on renewable energy training courses.",
  },
  {
    question: "Where is Green Sunsure Energy located?",
    answer:
      "Our main office is located at 53 Udu road, opposite Rainoil filling station, close to Udu bridge beside GKM, Warri, Delta State, Nigeria. We serve clients across Delta State and wider Nigeria.",
  },
  {
    question: "How do I know what solar system size I need?",
    answer:
      "You can use our online Solar Load Calculator to get an instant system size recommendation based on your appliances, or request a free site assessment and energy audit from our certified solar engineering team.",
  },
  {
    question: "Does Green Sunsure install solar for businesses?",
    answer:
      "Yes. We design and install high-performance commercial and industrial solar systems that help businesses eliminate diesel cost and maintain 24/7 uptime without grid dependence.",
  },
  {
    question: "Do you offer a warranty on installations?",
    answer:
      "Yes! All of our professional solar installations come with a 5-year workmanship warranty, and all individual products (panels, batteries, inverters) come with 2-5 year manufacturer warranties.",
  },
  {
    question: "How do I register for the solar training program?",
    answer:
      "You can contact us via WhatsApp or phone to register for our hands-on certified solar technician training course. We hold regular classes in Warri, Delta State.",
  },
];

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Store", href: "/store" },
  { label: "Projects", href: "/projects" },
  { label: "Training", href: "/training" },
  { label: "Contact", href: "/contact-us" },
];

export const stats = [
  { value: "500+", label: "Happy clients" },
  { value: "15+", label: "Engineers" },
  { value: "650+", label: "Projects done" },
  { value: "4.9", label: "Client rating" },
];

export const valueCards = [
  {
    title: "Solar installation",
    text: "Reliable solar systems built to deliver clean, uninterrupted power daily for your home or business.",
    icon: SolarPanel,
  },
  {
    title: "Energy storage",
    text: "Smart lithium and tubular batteries provide backup power during outages and unstable grid supply.",
    icon: BatteryCharging,
  },
  {
    title: "Maintenance support",
    text: "Quarterly cleanings, performance audits, and emergency support keep your solar system operating at peak output.",
    icon: Wrench,
  },
];

export const services = [
  {
    title: "Commercial & Residential Installation",
    text: "Professional solar setups tailored for houses, hotels, schools, offices, and manufacturing plants.",
    icon: SolarPanel,
  },
  {
    title: "Solar Product Sales",
    text: "Buy top-tier solar panels, inverters, deep cycle batteries, charge controllers, and outdoor street lights.",
    icon: PlugCharging,
  },
  {
    title: "Solar System Maintenance",
    text: "Keep your system running smoothly with panel cleaning, battery balancing, and diagnostic checkups.",
    icon: Wrench,
  },
  {
    title: "Renewable Energy Training",
    text: "Become a certified solar engineer through our hands-on technical academy in Delta State.",
    icon: GraduationCap,
  },
  {
    title: "CCTV & Security Systems",
    text: "Solar-powered 4G wireless surveillance cameras and security lighting solutions for homes and sites.",
    icon: Camera,
  },
  {
    title: "Energy Audits & Consulting",
    text: "Comprehensive load analysis to design the most cost-effective and optimal system size for your needs.",
    icon: Monitor,
  },
];

export const featureList = [
  { title: "24/7 customer support", icon: Headset },
  { title: "NERC & ISO accredited", icon: ShieldCheck },
  { title: "Hands-on solar training", icon: GraduationCap },
  { title: "Flexible installment plans", icon: TrendUp },
  { title: "Free site assessments", icon: CheckCircle },
  { title: "Reliable battery backups", icon: BatteryCharging },
  { title: "Quick fault troubleshooting", icon: Wrench },
  { title: "CCTV integration", icon: Camera },
];

export const whyChooseUs = [
  {
    title: "Warri-Based Experts",
    text: "Our team lives and works right here in Delta State. We understand your power challenges because we face them too.",
  },
  {
    title: "Proven fuel savings",
    text: "We help hotels, factories, and homes reduce diesel and grid electricity bills by 70% to 100% with payback in 3-5 years.",
  },
  {
    title: "Clean Energy Commitment",
    text: "We stand for dependable, efficient, and transparent solar solutions designed to perform exactly as promised. No hidden fees.",
  },
  {
    title: "NERC & ISO Certification",
    text: "Our systems are designed and installed by certified engineers adhering strictly to national and international safety regulations.",
  },
];

export const processSteps = [
  {
    title: "Load assessment",
    text: "We assess your power usage using our calculator or an on-site audit to recommend the right capacity.",
  },
  {
    title: "System engineering",
    text: "We design a customized package, choosing optimal panels, batteries, inverters, and mounts.",
  },
  {
    title: "Professional install",
    text: "Certified engineers install your solar array safely and configure the backups with minimal downtime.",
  },
  {
    title: "Support & maintenance",
    text: "We guide you through operation, hand over warranties, and provide long-term maintenance visits.",
  },
];

export const projects = [
  {
    title: "500kW industrial solar installation",
    category: "Industrial",
    image: "/assets/solar6-Cyd0tW-v.jpg",
    text: "Large-scale rooftop industrial solar plant installed with zero downtime to operations.",
  },
  {
    title: "Hotel installation at Porneco Hotel",
    category: "Commercial",
    image: "/assets/solar5-BNpRpaJY.jpg",
    text: "Solar and battery system eliminating diesel costs and powering hotel rooms 24/7 in Okuokoko.",
  },
  {
    title: "5kVA solar installation @Joemarine",
    category: "Training Institute",
    image: "/assets/solar1-Bl0Gsz9o.jpg",
    text: "Rooftop solar install powering computers and labs at Joemarine Nautical Training Institute in Effurun.",
  },
  {
    title: "Residential solar system in Udu",
    category: "Residential",
    image: "/assets/solar2-7GlQQyMk.jpg",
    text: "2.5kVA home installation providing uninterrupted power for appliances, fans, and light bulbs.",
  },
];

export const testimonials = [
  {
    name: "Chief Benson Efe",
    quote: "Our hotel now runs 24/7 on solar power. Green Sunsure's commercial solution eliminated our diesel costs completely!",
  },
  {
    name: "Joemarine Training Institute",
    quote: "From unstable power grids to steady solar energy. Green Sunsure transformed our learning labs and computer systems in Effurun!",
  },
  {
    name: "Industrial Facility Manager",
    quote: "A 500kW solar plant installed with zero production disruption. Expert team that understands Delta State's industrial needs.",
  },
  {
    name: "Usiefrun Road Homeowner",
    quote: "Very professional company. They installed our 2.5kVA residential system. Now my family enjoys 24/7 light without generator noise.",
  },
  {
    name: "Hotel Owner (Okuokoko)",
    quote: "Their team was knowledgeable, approachable, and completed the work on schedule. Best solar company in Delta State.",
  },
  {
    name: "B. Efe",
    quote: "Excellent post-installation support. Highly recommend Green Sunsure Energy to any business looking to cut overhead costs.",
  },
];

export const blogPosts = [
  {
    title: "Solar vs Diesel Generator in Delta State: ROI Analysis",
    slug: "solar-vs-diesel-generator-delta-state",
    category: "Cost Savings",
    date: "January 15, 2026",
    excerpt:
      "With rising diesel prices, solar has become the smartest financial decision for Nigerian businesses. We calculate the payback periods and ROI for commercial solar.",
    href: "/our-blog/solar-vs-diesel-generator-delta-state",
  },
  {
    title: "How to Size a Battery Bank for 24/7 Power",
    slug: "how-to-size-battery-bank-solar",
    category: "Technical Guide",
    date: "January 8, 2026",
    excerpt:
      "Learn how to choose between lithium and tubular batteries, size your battery bank, and avoid deep discharge to maximize your solar lifespan.",
    href: "/our-blog/how-to-size-battery-bank-solar",
  },
];

export const faqItems = [
  {
    question: "How long does a solar installation take?",
    answer:
      "Most residential installations are completed within 1 to 2 days. Larger commercial installations depend on the system capacity and typically take 3 to 7 days.",
  },
  {
    question: "What maintenance does my solar system require?",
    answer:
      "Solar panels need minimal maintenance. We recommend checking and cleaning the panels quarterly to remove dust, and scheduling an annual inspection for electrical connections.",
  },
  {
    question: "Can I pay for my solar package in installments?",
    answer:
      "Yes! We offer flexible payment terms with custom installment structures for verified residential and commercial clients in Warri and Delta State.",
  },
];

export const aboutCopy = {
  intro:
    "We exist to make clean energy simple, dependable, and accessible to everyone. By helping businesses eliminate fuel overhead and helping families enjoy steady electricity, we bring peace of mind and clean power to Delta State.",
  value:
    "We stand for absolute engineering precision, premium hardware components, and client trust. Our solar installations operate exactly as specified, with zero hidden costs.",
  vision:
    "To be the leading clean energy partner in South-South Nigeria, empowering every home, hotel, facility, and business with uninterrupted and affordable solar power.",
  mission:
    "To build top-tier, long-lasting solar infrastructure, provide hands-on technical training, and sell reliable energy products that accelerate Nigeria's green transition.",
  promise:
    "Clean, reliable energy with professional local support that is always close by when you need it.",
};

export const supportLinks = [
  { label: "Call support", href: site.phoneHref },
  { label: "Email support", href: site.emailHref },
  { label: "Request quote", href: "/contact-us#quote" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms of service", href: "/terms" },
  { label: "Cookie policy", href: "/cookie-policy" },
];
