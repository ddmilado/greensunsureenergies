"use client";

import { useActionState } from "react";
import { startCheckoutAction } from "@/app/lib/actions/store";
import { BrandSubmit } from "../components/StoreUI";
import { Lock } from "@phosphor-icons/react";

type State = { errors?: Record<string, string[]>; message?: string } | undefined;

const input =
  "w-full rounded-xl border border-[var(--line)] bg-[var(--shell)] px-3.5 py-3 text-sm text-[var(--ink-950)] outline-none transition duration-300 focus:border-[var(--brand-green)] focus:bg-white focus:ring-2 focus:ring-[var(--ring)]";
const label =
  "text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-600)]";

function SectionTitle({ n, title, sub }: { n: string; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--surface)] text-sm font-bold text-white">
        {n}
      </span>
      <div className="min-w-0">
        <h2 className="text-lg font-semibold tracking-[-0.03em] text-[var(--ink-950)]">{title}</h2>
        <p className="truncate text-xs text-[var(--ink-600)]">{sub}</p>
      </div>
    </div>
  );
}

function ErrorText({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <span className="flex items-center gap-1 text-xs font-medium text-red-600">{msg}</span>;
}

export function CheckoutForm({
  defaults,
  submitLabel,
}: {
  defaults?: { full_name?: string | null; email?: string | null };
  submitLabel?: string;
}) {
  const [state, action] = useActionState<State, FormData>(startCheckoutAction, undefined);

  const err = (k: string) => state?.errors?.[k]?.[0];

  return (
    <form action={action} className="grid gap-6">
      {/* Contact */}
      <fieldset className="rounded-[2rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]">
        <div className="rounded-[1.6rem] bg-white p-6 dark:bg-[var(--shell)]">
          <legend className="sr-only">Contact details</legend>
          <SectionTitle n="1" title="Contact details" sub="How we reach you about this order" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5">
              <span className={label}>Full name *</span>
              <input name="full_name" required className={input} autoComplete="name" defaultValue={defaults?.full_name ?? ""} />
              <ErrorText msg={err("full_name")} />
            </label>
            <label className="grid gap-1.5">
              <span className={label}>Phone *</span>
              <input name="phone" required type="tel" inputMode="tel" className={input} autoComplete="tel" placeholder="080…" />
              <ErrorText msg={err("phone")} />
            </label>
            <label className="grid gap-1.5 sm:col-span-2">
              <span className={label}>Email *</span>
              <input name="email" type="email" required className={input} autoComplete="email" defaultValue={defaults?.email ?? ""} />
              <ErrorText msg={err("email")} />
            </label>
          </div>
        </div>
      </fieldset>

      {/* Shipping */}
      <fieldset className="rounded-[2rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]">
        <div className="rounded-[1.6rem] bg-white p-6 dark:bg-[var(--shell)]">
          <legend className="sr-only">Shipping address</legend>
          <SectionTitle n="2" title="Delivery address" sub="Where should we deliver or install?" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 sm:col-span-2">
              <span className={label}>Address line 1 *</span>
              <input name="address1" required className={input} autoComplete="address-line1" placeholder="Street address" />
              <ErrorText msg={err("address1")} />
            </label>
            <label className="grid gap-1.5 sm:col-span-2">
              <span className={label}>Address line 2 (optional)</span>
              <input name="address2" className={input} autoComplete="address-line2" placeholder="Apartment, suite, landmark" />
            </label>
            <label className="grid gap-1.5">
              <span className={label}>City *</span>
              <input name="city" required className={input} autoComplete="address-level2" />
              <ErrorText msg={err("city")} />
            </label>
            <label className="grid gap-1.5">
              <span className={label}>State *</span>
              <input name="state" required className={input} autoComplete="address-level1" placeholder="Delta" />
              <ErrorText msg={err("state")} />
            </label>
            <label className="grid gap-1.5">
              <span className={label}>Postal code (optional)</span>
              <input name="postal_code" className={input} autoComplete="postal-code" />
            </label>
          </div>
        </div>
      </fieldset>

      {/* Payment */}
      <fieldset className="rounded-[2rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]">
        <div className="rounded-[1.6rem] bg-white p-6 dark:bg-[var(--shell)]">
          <legend className="sr-only">Payment</legend>
          <SectionTitle n="3" title="Payment" sub="Handled securely by Paystack — no card details on our servers" />
          <div className="mt-4 flex flex-wrap gap-2">
            {["Cards", "Bank transfer", "USSD"].map((m) => (
              <span
                key={m}
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--mist)] px-3 py-1.5 text-xs font-semibold text-[var(--ink-700)] ring-1 ring-[var(--line)]"
              >
                <Lock size={11} weight="fill" />
                {m}
              </span>
            ))}
          </div>
        </div>
      </fieldset>

      {state?.message && (
        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700 ring-1 ring-red-200">{state.message}</p>
      )}

      <div className="rounded-[2rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]">
        <div className="rounded-[1.6rem] bg-white px-6 py-4 dark:bg-[var(--shell)]">
          <BrandSubmit
            label={submitLabel ?? "Pay with Paystack"}
            pendingLabel="Redirecting to Paystack…"
            fullWidth
            icon={<Lock size={16} weight="bold" />}
          />
          <p className="mt-3 text-center text-[11px] leading-4 text-[var(--ink-300)]">
            You&rsquo;ll be redirected to Paystack to complete payment, then returned here for confirmation.
          </p>
        </div>
      </div>
    </form>
  );
}
