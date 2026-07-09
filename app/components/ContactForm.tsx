import { site } from "../data/site";

export function ContactForm({ quoteOnly = false }: { quoteOnly?: boolean }) {
  return (
    <form className="rounded-[2.25rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]" action={site.emailHref}>
      <div className="rounded-[1.85rem] bg-white p-6 md:p-8">
        <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">
          {quoteOnly ? "Request a quote call" : "Send us a message"}
        </h2>
        <p className="mt-3 text-sm leading-6 text-[var(--ink-600)]">
          {quoteOnly
            ? "Leave your phone number and the team will contact you with next steps."
            : "Send a quick message and we will contact you with the next steps."}
        </p>
        <div className="mt-8 grid gap-4">
          {!quoteOnly ? (
            <>
              <label className="grid gap-2 text-sm font-medium text-[var(--ink-700)]">
                Name
                <input className="form-field" name="name" autoComplete="name" placeholder="Your name" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-[var(--ink-700)]">
                Email
                <input className="form-field" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
              </label>
            </>
          ) : null}
          <label className="grid gap-2 text-sm font-medium text-[var(--ink-700)]">
            Phone
            <input className="form-field" name="phone" type="tel" autoComplete="tel" placeholder="+234 706 667 0673" required />
          </label>
          {!quoteOnly ? (
            <label className="grid gap-2 text-sm font-medium text-[var(--ink-700)]">
              Message
              <textarea className="form-field min-h-36 resize-y" name="message" placeholder="Tell us what you need powered" />
            </label>
          ) : null}
          <button
            type="submit"
            className="mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--ink-950)] px-6 py-3 text-sm font-semibold text-white transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[var(--brand-blue)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
          >
            {quoteOnly ? "Call me back" : "Send message"}
          </button>
        </div>
      </div>
    </form>
  );
}
