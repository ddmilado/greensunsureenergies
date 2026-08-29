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
  whatsapp: "https://wa.me/2349038260459",
  email: "info@greensunsurenergy.com",
  emailHref: "mailto:info@greensunsurenergy.com",
  referralEmail: "referrals@GreenSunSure.ng",
  address: {
    street: "53 Udu road, opposite Rainoil filling station, close to Udu bridge beside GKM",
    locality: "Warri",
    postalCode: "300011",
    region: "Delta State",
    country: "NG",
    full: "53 Udu Road, Warri, Delta State, Nigeria",
  },
  hours: "Mon-Sat: 8am-6pm · Sunday: Closed",
  openingHours: ["Mo-Sa 08:00-18:00"],
  geo: { latitude: 5.5167, longitude: 5.7500 },
  areasServed: ["Warri", "Delta State", "Effurun", "Udu", "Benin", "Nigeria"],
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=Green%20Sunsure%20Energy%20Warri%20Delta%20State",
  social: {
    facebook: "https://facebook.com/greensunsure",
    instagram: "https://instagram.com/greensunsure",
    twitter: "https://twitter.com/greensunsure",
    linkedin: "https://linkedin.com/company/greensunsure",
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

export const teamMembers = [
  {
    name: "Mr Emmanuel Akpomujare",
    role: "CEO & Founder",
    image: "/assets/ceop-DME2QEmv.jpg",
    description: "Renewable energy expert with 15+ years in solar solutions. Founded Green Sunsure Energy to empower Nigerian communities through sustainable energy. NERC-certified energy consultant.",
  },
  {
    name: "Engineering Team",
    role: "Lead Engineers",
    image: "/assets/team-DLc0vo_D.jpg",
    description: "Our certified engineers bring years of hands-on experience in designing and installing solar systems across Delta State and Nigeria.",
  },
  {
    name: "Installation Crew",
    role: "Field Technicians",
    image: "/assets/solarteam-D6fEeHlV.jpg",
    description: "Professional solar technicians trained in the latest installation techniques, safety standards, and system commissioning.",
  },
];

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
  { label: "Solar Calculator", href: "/solar-calculator" },
  { label: "Contact", href: "/contact-us" },
];

export const stats = [
  { value: "150+", label: "Happy clients" },
  { value: "12+", label: "Engineers" },
  { value: "180+", label: "Projects done" },
  { value: "4.8", label: "Client rating" },
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
    title: "2.5kVA solar installation — Usiefrun Road",
    category: "Residential",
    image: "/assets/uu1-Dj_eAXZI.jpg",
    text: "2.5Kva capacity of solar installation at Usiefrun Road, Warri.",
  },
  {
    title: "5kVA solar installation — Joemarine Nautical Training Institute",
    category: "Training Institute",
    image: "/assets/uu2-BKQ-xD2h.jpg",
    text: "5Kva capacity of solar installation at Joemarine Nautical Training Institute, Effurun.",
  },
  {
    title: "5kVA solar installation — Joemarine",
    category: "Training Institute",
    image: "/assets/uu3-DLVhEw8J.jpg",
    text: "5Kva capacity of solar installation at Joemarine.",
  },
  {
    title: "Commercial installation — Udu Road",
    category: "Commercial",
    image: "/assets/uu4-v8BQLOOo.jpg",
    text: "Commercial solar installation at Udu Road, Warri.",
  },
  {
    title: "Residential installation — Effurun, Warri",
    category: "Residential",
    image: "/assets/uu5-BlTiL_t0.jpg",
    text: "Residential solar installation in Effurun, Warri.",
  },
  {
    title: "Hotel installation — Porneco Hotel, Okuokoko",
    category: "Commercial",
    image: "/assets/uu6-CBAZV5cA.jpg",
    text: "Hotel solar installation at Porneco Hotel, Okuokoko, Delta State.",
  },
  {
    title: "Industrial Layout, Warri",
    category: "Industrial",
    image: "/assets/uu7-CHbicjIh.jpg",
    text: "Large-scale industrial solar installation in Warri.",
  },
  {
    title: "500kW solar plant — industrial installation",
    category: "Industrial",
    image: "/assets/uu8-W1hKCy0x.jpg",
    text: "500kW solar plant installed with zero production disruption.",
  },
  {
    title: "Residential transformation — Warri",
    category: "Residential",
    image: "/assets/uu9-C39wcvJg.jpg",
    text: "From 3 hours of power daily to uninterrupted solar energy.",
  },
  {
    title: "Hotel 24/7 solar — commercial solution",
    category: "Commercial",
    image: "/assets/uu10-DQJLxWKT.jpg",
    text: "Hotel now runs 24/7 on solar power. Eliminated diesel costs completely.",
  },
  {
    title: "Solar installation at Warri residence",
    category: "Residential",
    image: "/assets/solar1-Bl0Gsz9o.jpg",
    text: "Green Sunsure solar installation in Warri, Delta State Nigeria.",
  },
  {
    title: "Professional solar technicians",
    category: "Team",
    image: "/assets/solar2-7GlQQyMk.jpg",
    text: "Professional solar technicians from Green Sunsure Energy.",
  },
  {
    title: "High-quality solar panels",
    category: "Equipment",
    image: "/assets/solar3--CipiYsv.jpg",
    text: "High-quality solar panels available in Warri.",
  },
  {
    title: "Solar training program",
    category: "Training",
    image: "/assets/solar4-C8Xf_6NB.jpg",
    text: "Solar training program at Green Sunsure Energy.",
  },
  {
    title: "Solar installation — commercial building",
    category: "Commercial",
    image: "/assets/solar5-BNpRpaJY.jpg",
    text: "Commercial solar installation for businesses in Warri.",
  },
  {
    title: "Large-scale solar array",
    category: "Industrial",
    image: "/assets/solar6-Cyd0tW-v.jpg",
    text: "Large-scale solar installation with professional mounting.",
  },
  {
    title: "Residential rooftop solar",
    category: "Residential",
    image: "/assets/solar7-B9QILUpm.jpg",
    text: "Rooftop solar installation for homes in Delta State.",
  },
  {
    title: "Solar panel close-up",
    category: "Equipment",
    image: "/assets/solar8-B6-vTvyA.jpg",
    text: "High-efficiency monocrystalline solar panels.",
  },
];

export const projectImages = [
  { src: "/assets/pr1-B4mMQAR_.jpeg", alt: "Solar project — residential installation" },
  { src: "/assets/pr2-CsMCBJj9.jpeg", alt: "Solar project — commercial rooftop" },
  { src: "/assets/pr3-LsYv1xTE.jpeg", alt: "Solar project — industrial layout" },
  { src: "/assets/pr4-CoLHELy2.jpeg", alt: "Solar project — hotel installation" },
  { src: "/assets/pr5-BJs4taJV.jpeg", alt: "Solar project — training institute" },
  { src: "/assets/pl1-DYScccW0.jpg", alt: "Project location — Warri" },
  { src: "/assets/pl2-ByEsemoQ.jpg", alt: "Project location — Effurun" },
  { src: "/assets/pl3-CqJZJmI9.jpg", alt: "Project location — Delta State" },
  { src: "/assets/add1-bmPA8aqM.jpg", alt: "Installation detail — mounting" },
  { src: "/assets/add2-BMtQbzQa.jpg", alt: "Installation detail — wiring" },
  { src: "/assets/add3-CxmndQ6s.jpg", alt: "Installation detail — panels" },
  { src: "/assets/add4-jxI71Uqs.jpg", alt: "Installation detail — completion" },
];

export const projectVideos = [
  { src: "/assets/solarvid1-CGFNe1Mc.mp4", title: "Solar installation walkthrough — Warri residential" },
  { src: "/assets/solarvid2-C3838NXt.mp4", title: "Commercial solar project — Warri" },
  { src: "/assets/solarvid3-DHmeF2OZ.mp4", title: "Solar system commissioning — Delta State" },
  { src: "/assets/trainingvid1-0ZstAWOS.mp4", title: "Solar training session — hands-on workshop" },
  { src: "/assets/trainingvid2-68FJvpJv.mp4", title: "Panel installation training — Warri" },
  { src: "/assets/trainingvid3-CGIpX5YO.mp4", title: "Inverter configuration training" },
];

export const youtubeVideos = [
  { id: "j_ag7FBQFyY", title: "Solar system proof — Joemarine Nautical Training Institute" },
  { id: "fWtgbOgQC3Y", title: "Residential backup system — client review" },
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
  {
    name: "Warri Homeowner",
    quote: "Green Sunsure installed our 7.5kVA solar system and now we enjoy 24/7 light without generator noise. Our electricity bills reduced by 80%! Their team in Warri is professional and reliable.",
  },
  {
    name: "Business Owner, Asaba",
    quote: "Green Sunsure is hands down the best solar company in Delta State! They guided us through every step and our energy bills have drastically reduced. We now enjoy reliable, eco-friendly power. I highly recommend Green Sunsure!",
  },
  {
    name: "Residential Client, Effurun",
    quote: "From 3 hours of power daily to uninterrupted solar energy. Green Sunsure transformed our home in Warri!",
  },
  {
    name: "Hotel Manager, Delta State",
    quote: "Our hotel now runs 24/7 on solar power. Green Sunsure's commercial solution eliminated our diesel costs completely!",
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
    question: "Can solar power my home 24/7?",
    answer:
      "Yes! With proper battery storage sizing and energy management, our systems provide uninterrupted power day and night.",
  },
  {
    question: "How long does a solar installation take?",
    answer:
      "Most residential installations are completed within 1 to 2 days. Larger commercial installations depend on the system capacity and typically take 3 to 7 days.",
  },
  {
    question: "How much can I save with solar?",
    answer:
      "Savings depend on energy usage, but most customers reduce electricity bills by 70–100% with payback periods of 3–5 years.",
  },
  {
    question: "Do you offer maintenance packages?",
    answer:
      "Yes, we offer comprehensive maintenance plans with 24/7 support, quarterly panel cleaning, and annual professional inspections.",
  },
  {
    question: "What maintenance does my solar system require?",
    answer:
      "Solar systems need minimal maintenance. We recommend quarterly panel cleaning and annual professional inspections for optimal performance.",
  },
  {
    question: "Can I finance my solar system?",
    answer:
      "Yes! We provide flexible payment plans including 12–36 month installment options and partnership with green energy financiers.",
  },
  {
    question: "What areas in Nigeria do you serve?",
    answer:
      "We cover all 36 states with certified installers in major cities. Our main office is in Warri, Delta State.",
  },
  {
    question: "Can I pay for my solar package in installments?",
    answer:
      "Yes! We offer flexible payment terms with custom installment structures for verified residential and commercial clients in Warri and Delta State.",
  },
  {
    question: "Do I get a warranty?",
    answer:
      "Yes! All systems come with 2–5 year warranties and free support. Installations carry a 5-year workmanship warranty.",
  },
  {
    question: "How quickly can I get a solar installation quote?",
    answer:
      "We provide preliminary quotes within 24 hours of receiving your information. Use our Solar Cost Estimator for an instant estimate.",
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
