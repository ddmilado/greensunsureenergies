import Image from "next/image";
import { projects } from "../data/site";
import { Reveal } from "./Reveal";

export function ProjectShowcase({ full = false }: { full?: boolean }) {
  const list = full ? projects : projects.slice(0, 3);

  return (
    <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-12">
      {list.map((project, index) => (
        <Reveal
          key={project.title}
          className={`${index === 0 ? "lg:col-span-7" : "lg:col-span-5"}`}
          delay={index * 0.06}
        >
          <article data-float-card className="group h-full rounded-[2.5rem] bg-white/8 p-1.5 ring-1 ring-white/12">
            <div className="relative flex h-full min-h-[430px] overflow-hidden rounded-[2.05rem] bg-[var(--ink-900)]">
              <Image
                src={project.image}
                alt={`${project.title} by Damdavy Technologies`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover opacity-78 saturate-[0.92] transition duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 group-hover:opacity-95"
                data-kinetic-image
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,13,24,0.08),rgba(3,13,24,0.86))]" />
              <div className="relative mt-auto p-7 text-white md:p-9">
                <span className="mb-4 inline-flex rounded-full bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/78 backdrop-blur-md">
                  {project.category}
                </span>
                <h3 className="max-w-xl text-3xl font-semibold tracking-[-0.05em] md:text-5xl">
                  {project.title}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/74">{project.text}</p>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
