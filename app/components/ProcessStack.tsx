import { processSteps } from "../data/site";
import { Reveal } from "./Reveal";

export function ProcessStack() {
  return (
    <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-4">
      {processSteps.map((step, index) => (
        <Reveal key={step.title} delay={index * 0.08} className="lg:sticky lg:top-32" as="article">
          <div
            data-float-card
            className="min-h-[340px] overflow-hidden rounded-[2.25rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]"
            style={{ transform: `rotate(${(index - 1.5) * 0.8}deg)` }}
          >
            <div className="flex h-full flex-col justify-between rounded-[1.85rem] bg-white p-7 dark:bg-[var(--ink-900)]">
              <span className="text-5xl font-semibold tracking-[-0.07em] text-[var(--brand-blue)] tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="line-clamp-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">{step.title}</h3>
                <p className="mt-4 line-clamp-3 text-base leading-7 text-[var(--ink-600)]">{step.text}</p>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
