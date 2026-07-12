"use client";

import { useActionState } from "react";
import { submitContactAction, submitQuoteAction, type LeadFormState } from "../lib/actions/content";
import { SubmitButton } from "../_components/SubmitButton";
import { site } from "../data/site";

export function ContactForm({ quoteOnly = false }: { quoteOnly?: boolean }) {
  const contactAction = submitContactAction;
  const quoteAction = submitQuoteAction;
  const [state, formAction] = useActionState<LeadFormState | undefined, FormData>(
    quoteOnly ? quoteAction : contactAction,
    undefined,
  );

  return (
    <form
      id={quoteOnly ? "quote" : "contact"}
      action={formAction}
      className="rounded-[2.25rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]"
    >
      <div className="rounded-[1.85rem] bg-white p-6 md:p-8">
        <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">
          {quoteOnly ? "Request a quote call" : "Send us a message"}
        </h2>
        <p className="mt-3 text-sm leading-6 text-[var(--ink-600)]">
          {quoteOnly
            ? "Tell us about your project and the team will contact you within one business day."
            : "Send a quick message and we will contact you with the next steps."}
        </p>
        <div className="mt-8 grid gap-4">
          {quoteOnly ? (
            <input type="hidden" name="source" value="quote-form" />
          ) : (
            <input type="hidden" name="source" value="contact-form" />
          )}
          {!quoteOnly ? (
            <>
              <label className="grid gap-2 text-sm font-medium text-[var(--ink-700)]">
                Name
                <input
                  className="form-field"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  required
                />
                {state?.errors?.name && <span className="text-xs text-red-600">{state.errors.name[0]}</span>}
              </label>
              <label className="grid gap-2 text-sm font-medium text-[var(--ink-700)]">
                Email
                <input
                  className="form-field"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
                {state?.errors?.email && <span className="text-xs text-red-600">{state.errors.email[0]}</span>}
              </label>
            </>
          ) : null}
          <label className="grid gap-2 text-sm font-medium text-[var(--ink-700)]">
            Phone
            <input
              className="form-field"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder={site.phone}
              required
            />
            {state?.errors?.phone && <span className="text-xs text-red-600">{state.errors.phone[0]}</span>}
          </label>

          {quoteOnly ? (
            <>
              <label className="grid gap-2 text-sm font-medium text-[var(--ink-700)]">
                Project type *
                <select name="property_type" className="form-field" required defaultValue="">
                  <option value="" disabled>
                    Choose one
                  </option>
                  <option value="home">Home / residential</option>
                  <option value="business">Business / office</option>
                  <option value="industrial">Industrial / facility</option>
                </select>
                {state?.errors?.property_type && (
                  <span className="text-xs text-red-600">{state.errors.property_type[0]}</span>
                )}
              </label>
              <label className="grid gap-2 text-sm font-medium text-[var(--ink-700)]">
                Current problem (optional)
                <input
                  className="form-field"
                  name="current_problem"
                  placeholder="e.g. Spend ₦80k/month on fuel for fridge and fans"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-[var(--ink-700)]">
                Estimated load (optional)
                <input
                  className="form-field"
                  name="estimated_load"
                  placeholder="e.g. Fridge + 4 fans + TV + 10 bulbs"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-[var(--ink-700)]">
                Email
                <input className="form-field" name="email" type="email" placeholder="you@example.com" required />
                {state?.errors?.email && <span className="text-xs text-red-600">{state.errors.email[0]}</span>}
              </label>
            </>
          ) : (
            <label className="grid gap-2 text-sm font-medium text-[var(--ink-700)]">
              Message
              <textarea
                className="form-field min-h-36 resize-y"
                name="message"
                placeholder="Tell us what you need powered"
              />
              {state?.errors?.message && <span className="text-xs text-red-600">{state.errors.message[0]}</span>}
            </label>
          )}

          {state?.message && <p className="text-sm text-red-600">{state.message}</p>}

          <SubmitButton
            label={quoteOnly ? "Request a call back" : "Send message"}
            pendingLabel={quoteOnly ? "Sending…" : "Sending…"}
          />
        </div>
      </div>
    </form>
  );
}
