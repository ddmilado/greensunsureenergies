import { services } from "../data/site";
import { Reveal } from "./Reveal";

export function ServiceBento() {
  return (
    <div className="mx-auto grid max-w-7xl grid-flow-dense grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[210px]">
      {services.map((service, index) => {
        const Icon = service.icon;
        const span = index === 0 || index === 3 ? "md:col-span-3 md:row-span-2" : "md:col-span-3";
        return (
          <Reveal key={service.title} delay={index * 0.05} className={`group ${span}`}>
            <article className="h-full overflow-hidden rounded-[2.25rem] bg-[var(--shell)] p-1.5 shadow-[0_24px_90px_rgba(0,39,61,0.08)] ring-1 ring-[var(--line)] transition duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-2 hover:shadow-[0_34px_110px_rgba(0,83,122,0.16)]">
              <div className="flex h-full flex-col justify-between rounded-[1.85rem] bg-white p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
                <div className="flex items-start justify-between gap-6">
                  <span className="grid size-13 place-items-center rounded-2xl bg-[var(--mist)] text-[var(--brand-blue)] transition duration-700 group-hover:rotate-3 group-hover:scale-105">
                    <Icon size={27} weight="duotone" />
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-[var(--ink-300)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-10">
                  <h3 className="line-clamp-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--ink-950)] md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-md line-clamp-3 text-base leading-7 text-[var(--ink-600)]">{service.text}</p>
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
