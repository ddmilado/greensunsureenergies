import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "../lib/types";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (!projects.length) {
    return (
      <p className="mx-auto max-w-2xl text-center text-base text-white/60">
        New project case studies are being added. Check back soon, or browse the store to see the equipment we use.
      </p>
    );
  }
  return (
    <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
      {projects.map((project, index) => (
        <article
          key={project.id}
          className={`group relative overflow-hidden rounded-[2.5rem] bg-white/8 ring-1 ring-white/12 ${
            index === 0 ? "md:col-span-2" : ""
          }`}
        >
          <Link href={`/projects/${project.slug}`} className="block">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--ink-900)]">
              {project.cover_image ? (
                <Image
                  src={project.cover_image}
                  alt={project.title}
                  fill
                  sizes={index === 0 ? "(min-width: 768px) 100vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                  className="object-cover opacity-80 saturate-[0.9] transition duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 group-hover:opacity-95"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-white/50">
                  Image coming soon
                </div>
              )}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,13,24,0.06),rgba(3,13,24,0.86))]" />
              <div className="absolute left-6 top-6 inline-flex rounded-full bg-white/12 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/82 backdrop-blur-md">
                {project.category}
              </div>
              <div className="absolute right-6 top-6 grid size-10 place-items-center rounded-full bg-white/14 backdrop-blur-md transition group-hover:bg-[var(--solar-lime)]">
                <ArrowUpRight size={18} weight="bold" className="text-white group-hover:text-[var(--ink-950)]" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <h3 className="max-w-2xl text-2xl font-semibold tracking-[-0.04em] text-white md:text-3xl">
                  {project.title}
                </h3>
                {project.excerpt && (
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/74 md:text-base">
                    {project.excerpt}
                  </p>
                )}
                {project.location && (
                  <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--solar-lime)]">
                    {project.location}
                  </p>
                )}
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
