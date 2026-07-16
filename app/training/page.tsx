import type { Metadata } from "next";
import Image from "next/image";
import { Lightning, Gear, TrendUp, CheckCircle, WhatsappLogo, Phone } from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { CTASection } from "../components/CTASection";
import { ButtonLink } from "../components/ButtonLink";
import { site } from "../data/site";
import { JsonLd } from "../components/JsonLd";
import { breadcrumbsJsonLd, faqJsonLd } from "../data/jsonLd";

export const metadata: Metadata = {
  title: "Professional Solar Training Programs | Green Sunsure Energy",
  description:
    "Become a certified solar energy specialist through hands-on training courses at Green Sunsure Energy, Warri, Delta State. Solar installation, advanced technician, and sales consulting certifications.",
  alternates: { canonical: "/training" },
  openGraph: {
    title: "Professional Solar Training Programs | Green Sunsure Energy",
    description: "Certified solar training courses — installation, advanced technician, and sales consulting. Hands-on workshops in Warri, Delta State.",
    url: "https://www.greensunsurenergy.com/training",
    type: "website",
  },
};

export const revalidate = 60;

const courses = [
  {
    title: "Solar Installation Certification",
    icon: Lightning,
    color: "var(--solar-lime)",
    topics: [
      "Photovoltaic System Fundamentals",
      "Electrical Safety Standards",
      "Panel Mounting Techniques",
      "System Commissioning",
      "Troubleshooting & Maintenance",
    ],
  },
  {
    title: "Advanced Solar Technician",
    icon: Gear,
    color: "var(--energy-cyan)",
    topics: [
      "Battery Storage Systems",
      "Hybrid System Design",
      "Inverter Configuration",
      "Grid Integration",
      "Performance Optimization",
    ],
  },
  {
    title: "Solar Sales & Consulting",
    icon: TrendUp,
    color: "var(--brand-green)",
    topics: [
      "Technical Product Knowledge",
      "Customer Needs Analysis",
      "System Cost Calculation",
      "Government Incentives",
      "Project Proposal Development",
    ],
  },
];

const gallerySections = [
  {
    title: "Installation Certification Class",
    images: [
      { src: "/assets/trainingimg1-isYYNoeK.jpg", alt: "Hands-on panel installation training" },
      { src: "/assets/trainingimg2-Dss0kd5p.jpg", alt: "Students practicing wiring techniques" },
    ],
    video: { src: "/assets/trainingvid1-0ZstAWOS.mp4", alt: "Instructor demonstrating safety procedures" },
  },
  {
    title: "Advanced Technician Workshop",
    images: [
      { src: "/assets/trainingimg3-BMJk-1m-.jpg", alt: "Battery system configuration" },
      { src: "/assets/trainingimg4-Bbw0K5Va.jpg", alt: "Graduates receiving certificates" },
    ],
    video: { src: "/assets/trainingvid2-68FJvpJv.mp4", alt: "Inverter troubleshooting session" },
  },
  {
    title: "Sales Training Session",
    images: [
      { src: "/assets/trainingimg5-D3b-km2a.jpg", alt: "Customer consultation roleplay" },
      { src: "/assets/trainingimg6-O_9nFmSH.jpg", alt: "Group discussion on market strategies" },
    ],
    video: { src: "/assets/trainingvid3-CGIpX5YO.mp4", alt: "Expert sharing sales techniques" },
  },
];

const trainingFaqs = [
  {
    question: "How do I register for training?",
    answer: "Contact us directly via WhatsApp or phone to begin your registration process. Our team will guide you through enrollment and provide current session options.",
  },
  {
    question: "What are the prerequisites?",
    answer: "Basic technical knowledge is helpful but not required. We provide all necessary training materials. Our courses are designed for both beginners and experienced professionals.",
  },
  {
    question: "Is certification provided?",
    answer: "Yes, all participants receive a Green Sunsure Energy certification upon successful completion. Our certifications are recognized throughout Nigeria's solar industry.",
  },
  {
    question: "Can I schedule private training?",
    answer: "Absolutely! We offer customized training for companies and groups. Contact us to discuss your specific needs and schedule.",
  },
];

export default function TrainingPage() {
  return (
    <main id="main" className="overflow-x-hidden">
      <JsonLd
        data={[
          breadcrumbsJsonLd([{ name: "Home", path: "/" }, { name: "Training", path: "/training" }]),
          faqJsonLd(),
        ]}
      />
      <PageHero
        title="Professional Solar Training Programs"
        kicker="Training"
        text="Become a certified solar energy specialist through our hands-on courses at Green Sunsure Energy Solution And Technology Ltd, Warri, Delta State."
        image="/assets/trainingimg7-DsMtSCcX.jpg"
      />

      {/* Courses */}
      <section className="px-4 py-24 md:px-8 md:py-36">
        <SectionHeading eyebrow="Our courses" title="Three pathways to solar expertise.">
          <p>Choose the certification track that matches your career goals. All courses include hands-on practice with real equipment.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl gap-6 md:grid-cols-3">
          {courses.map((course, index) => {
            const Icon = course.icon;
            return (
              <Reveal key={course.title} delay={index * 0.08}>
                <article className="flex h-full flex-col rounded-[2.5rem] bg-white p-2 shadow-[0_24px_80px_rgba(3,30,48,0.07)] ring-1 ring-[var(--line)] dark:bg-[var(--shell)]">
                  <div className="flex flex-1 flex-col rounded-[2rem] bg-[var(--mist)] p-7 dark:bg-[var(--ink-950)]">
                    <span className="grid size-14 place-items-center rounded-2xl bg-white text-[var(--ink-950)] shadow-sm dark:bg-white/10" style={{ color: course.color }}>
                      <Icon size={28} weight="duotone" />
                    </span>
                    <h3 className="mt-7 text-2xl font-bold tracking-[-0.03em] text-[var(--ink-950)]">{course.title}</h3>
                    <ul className="mt-5 flex-1 space-y-3">
                      {course.topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-2.5 text-sm text-[var(--ink-700)]">
                          <CheckCircle size={16} className="mt-0.5 shrink-0 text-[var(--brand-green)]" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 text-xs text-[var(--ink-400)]">Contact Green Sunsure Energy for the next available session.</p>
                    <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                      <a
                        href={site.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[var(--brand-green)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--brand-green-dark)] active:scale-[0.98]"
                      >
                        <WhatsappLogo size={18} /> Enroll
                      </a>
                      <a
                        href={site.phoneHref}
                        className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-white px-5 text-sm font-semibold text-[var(--ink-700)] transition hover:bg-[var(--mist)] active:scale-[0.98] dark:bg-[var(--shell)]"
                      >
                        <Phone size={18} /> Call
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Training gallery */}
      <section className="bg-[var(--ink-950)] px-4 py-24 text-white md:px-8 md:py-36">
        <SectionHeading eyebrow="Training gallery" title="See our workshops and sessions in action.">
          <p className="text-white/70">Real training moments — from panel installation practice to certificate ceremonies.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl gap-10 lg:grid-cols-3">
          {gallerySections.map((section, sIdx) => (
            <Reveal key={section.title} delay={sIdx * 0.1}>
              <div className="space-y-4">
                <h3 className="text-xl font-bold tracking-[-0.02em] text-white">{section.title}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {section.images.map((img) => (
                    <div key={img.src} className="group relative overflow-hidden rounded-[1.5rem] bg-white/8">
                      <div className="relative aspect-square w-full overflow-hidden">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(min-width: 1024px) 17vw, 50vw"
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />
                      </div>
                      <p className="px-3 pb-3 pt-2 text-[11px] text-white/60">{img.alt}</p>
                    </div>
                  ))}
                </div>
                <div className="overflow-hidden rounded-[1.5rem] bg-white/8">
                  <div className="relative aspect-video w-full">
                    <video
                      src={section.video.src}
                      controls
                      preload="metadata"
                      width={640}
                      height={360}
                      className="h-full w-full object-cover"
                      poster="/assets/trainingimg7-DsMtSCcX.jpg"
                    />
                  </div>
                  <p className="px-3 pb-3 pt-2 text-[11px] text-white/60">{section.video.alt}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* All training images */}
      <section className="px-4 py-24 md:px-8 md:py-36">
        <SectionHeading eyebrow="Training in photos" title="From classroom theory to hands-on practice.">
          <p>Every session covers real equipment, real scenarios, and real certifications.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { src: "/assets/trainingimg1-isYYNoeK.jpg", alt: "Hands-on panel installation training" },
            { src: "/assets/trainingimg2-Dss0kd5p.jpg", alt: "Students practicing wiring techniques" },
            { src: "/assets/trainingimg3-BMJk-1m-.jpg", alt: "Battery system configuration" },
            { src: "/assets/trainingimg4-Bbw0K5Va.jpg", alt: "Graduates receiving certificates" },
            { src: "/assets/trainingimg5-D3b-km2a.jpg", alt: "Customer consultation roleplay" },
            { src: "/assets/trainingimg6-O_9nFmSH.jpg", alt: "Group discussion on market strategies" },
            { src: "/assets/trainingimg7-DsMtSCcX.jpg", alt: "Green Sunsure Energy training session" },
            { src: "/assets/solar4-C8Xf_6NB.jpg", alt: "Solar training program at Green Sunsure" },
          ].map((img, index) => (
            <Reveal key={img.src} delay={index * 0.04}>
              <div className="group relative overflow-hidden rounded-[1.5rem] bg-[var(--shell)] ring-1 ring-[var(--line)]">
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                  <p className="absolute inset-x-0 bottom-0 p-3 text-[11px] font-medium text-white opacity-0 transition duration-500 group-hover:opacity-100">
                    {img.alt}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Training videos */}
      <section className="bg-[var(--ink-950)] px-4 py-24 text-white md:px-8 md:py-36">
        <SectionHeading eyebrow="Training videos" title="Watch our training sessions in action.">
          <p className="text-white/70">Real footage from real workshops — installation, troubleshooting, and sales techniques.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            { src: "/assets/trainingvid1-0ZstAWOS.mp4", title: "Safety procedures & panel installation", poster: "/assets/trainingimg1-isYYNoeK.jpg" },
            { src: "/assets/trainingvid2-68FJvpJv.mp4", title: "Inverter troubleshooting session", poster: "/assets/trainingimg3-BMJk-1m-.jpg" },
            { src: "/assets/trainingvid3-CGIpX5YO.mp4", title: "Sales techniques & market strategies", poster: "/assets/trainingimg5-D3b-km2a.jpg" },
          ].map((video, index) => (
            <Reveal key={video.src} delay={index * 0.08}>
              <article className="overflow-hidden rounded-[2.25rem] bg-white/8 p-2.5 ring-1 ring-white/12">
                <div className="relative aspect-video w-full overflow-hidden rounded-[1.85rem] bg-[var(--ink-900)]">
                  <video
                    src={video.src}
                    controls
                    preload="metadata"
                    width={640}
                    height={360}
                    className="h-full w-full object-cover"
                    poster={video.poster}
                  />
                </div>
                <p className="mt-4 px-1 pb-2 text-center text-xs font-semibold text-white/72">
                  {video.title}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Enrollment / Contact */}
      <section className="px-4 py-24 md:px-8 md:py-36">
        <SectionHeading eyebrow="Get started" title="Training schedule & enrollment info.">
          <p>Training sessions are scheduled based on demand and instructor availability. Contact us to get the next available dates.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          <Reveal delay={0}>
            <article className="flex flex-col items-center text-center rounded-[2.5rem] bg-white p-8 shadow-[0_24px_80px_rgba(3,30,48,0.07)] ring-1 ring-[var(--line)] dark:bg-[var(--shell)]">
              <span className="grid size-14 place-items-center rounded-2xl bg-[var(--brand-green)]/10 text-[var(--brand-green)]">
                <WhatsappLogo size={28} weight="duotone" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-[var(--ink-950)]">WhatsApp Inquiry</h3>
              <p className="mt-3 text-sm text-[var(--ink-600)]">Message us on WhatsApp for instant enrollment info and schedule details.</p>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--brand-green)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--brand-green-dark)] active:scale-[0.98]"
              >
                <WhatsappLogo size={18} /> Chat on WhatsApp
              </a>
            </article>
          </Reveal>
          <Reveal delay={0.06}>
            <article className="flex flex-col items-center text-center rounded-[2.5rem] bg-white p-8 shadow-[0_24px_80px_rgba(3,30,48,0.07)] ring-1 ring-[var(--line)] dark:bg-[var(--shell)]">
              <span className="grid size-14 place-items-center rounded-2xl bg-[var(--brand-blue)]/10 text-[var(--brand-blue)]">
                <Phone size={28} weight="duotone" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-[var(--ink-950)]">Direct Call</h3>
              <p className="mt-3 text-sm text-[var(--ink-600)]">Speak directly with our training coordinator about course options and scheduling.</p>
              <a
                href={site.phoneHref}
                className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-white px-6 text-sm font-semibold text-[var(--ink-700)] transition hover:bg-[var(--mist)] active:scale-[0.98] dark:bg-[var(--shell)]"
              >
                <Phone size={18} /> {site.phone}
              </a>
            </article>
          </Reveal>
          <Reveal delay={0.12}>
            <article className="flex flex-col items-center text-center rounded-[2.5rem] bg-white p-8 shadow-[0_24px_80px_rgba(3,30,48,0.07)] ring-1 ring-[var(--line)] dark:bg-[var(--shell)]">
              <span className="grid size-14 place-items-center rounded-2xl bg-[var(--solar-lime)]/10 text-[var(--brand-green-dark)]">
                <CheckCircle size={28} weight="duotone" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-[var(--ink-950)]">Flexible Scheduling</h3>
              <p className="mt-3 text-sm text-[var(--ink-600)]">Corporate & group training available at our facility or your location.</p>
              <p className="mt-4 text-xs text-[var(--ink-400)] leading-5">{site.address.full}</p>
            </article>
          </Reveal>
        </div>
        <div className="mt-12 text-center">
          <p className="text-sm text-[var(--ink-400)]">Corporate training can be scheduled at your convenience. Contact us for group rates.</p>
        </div>
      </section>

      {/* Training FAQs */}
      <section className="px-4 py-24 md:px-8 md:py-36 bg-[var(--shell)] border-y border-[var(--line)]">
        <SectionHeading eyebrow="Training FAQs" title="Common questions about our training programs.">
          <p>Everything you need to know before enrolling.</p>
        </SectionHeading>
        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-2">
          {trainingFaqs.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.06}>
              <article className="h-full rounded-[2.25rem] bg-white p-1.5 ring-1 ring-[var(--line)] dark:bg-[var(--shell)]">
                <div className="h-full rounded-[1.85rem] bg-white p-7 dark:bg-[var(--shell)]">
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--ink-950)]">{item.question}</h3>
                  <p className="mt-4 text-base leading-7 text-[var(--ink-600)]">{item.answer}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <ButtonLink href="/contact-us" variant="secondary">Have more questions? Contact us</ButtonLink>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
