import { testimonials } from "../data/site";

type Testimonial = (typeof testimonials)[number];

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl bg-[var(--shell)] p-6 ring-1 ring-[var(--line)]">
      <blockquote className="flex-1 text-base leading-7 tracking-[-0.01em] text-[var(--ink-700)]">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-[var(--line)] pt-4 text-sm font-semibold text-[var(--ink-950)]">
        <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--mist)] text-xs text-[var(--brand-blue)]">
          {item.name.split(" ").map(word => word[0]).slice(0, 2).join("")}
        </span>
        {item.name}
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <div className="mx-auto mt-10 max-w-7xl">
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.slice(0, 3).map(item => <TestimonialCard key={item.name} item={item} />)}
      </div>
      {testimonials.length > 3 && (
        <details className="testimonial-more mt-8">
          <summary>
            <span className="testimonial-expand">See more</span>
            <span className="testimonial-collapse">Show fewer</span>
          </summary>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(3).map(item => <TestimonialCard key={item.name} item={item} />)}
          </div>
        </details>
      )}
    </div>
  );
}
