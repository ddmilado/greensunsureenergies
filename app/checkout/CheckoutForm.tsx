"use client";

import { useActionState } from "react";
import { startCheckoutAction } from "@/app/lib/actions/store";
import { BrandSubmit } from "../components/StoreUI";

type State = { errors?: Record<string, string[]>; message?: string } | undefined;

const input =
  "w-full rounded-xl border border-[var(--line)] bg-white px-3.5 py-3 text-sm text-[var(--ink-950)] outline-none transition focus:border-[var(--brand-blue)] focus:ring-2 focus:ring-[var(--ring)]";
const label =
  "text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-600)]";

export function CheckoutForm() {
  const [state, action] = useActionState<State, FormData>(startCheckoutAction, undefined);

  const err = (k: string) => state?.errors?.[k]?.[0];

  return (
    <form action={action} className="grid gap-6">
      {/* Contact */}
      <fieldset className="rounded-[2rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]">
        <div className="rounded-[1.6rem] bg-white p-6 dark:bg-[var(--ink-900)]">
          <h2 className="text-lg font-semibold tracking-[-0.03em] text-[var(--ink-950)]">Contact details</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5">
              <span className={label}>Full name *</span>
              <input name="full_name" required className={input} autoComplete="name" />
              {err("full_name") && <span className="text-xs text-red-600">{err("full_name")}</span>}
            </label>
            <label className="grid gap-1.5">
              <span className={label}>Phone *</span>
              <input name="phone" required className={input} autoComplete="tel" />
              {err("phone") && <span className="text-xs text-red-600">{err("phone")}</span>}
            </label>
            <label className="grid gap-1.5 sm:col-span-2">
              <span className={label}>Email *</span>
              <input name="email" type="email" required className={input} autoComplete="email" />
              {err("email") && <span className="text-xs text-red-600">{err("email")}</span>}
            </label>
          </div>
        </div>
      </fieldset>

      {/* Shipping */}
      <fieldset className="rounded-[2rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]">
        <div className="rounded-[1.6rem] bg-white p-6 dark:bg-[var(--ink-900)]">
          <h2 className="text-lg font-semibold tracking-[-0.03em] text-[var(--ink-950)]">Shipping address</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 sm:col-span-2">
              <span className={label}>Address line 1 *</span>
              <input name="address1" required className={input} autoComplete="address-line1" />
              {err("address1") && <span className="text-xs text-red-600">{err("address1")}</span>}
            </label>
            <label className="grid gap-1.5 sm:col-span-2">
              <span className={label}>Address line 2 (optional)</span>
              <input name="address2" className={input} autoComplete="address-line2" />
            </label>
            <label className="grid gap-1.5">
              <span className={label}>City *</span>
              <input name="city" required className={input} autoComplete="address-level2" />
              {err("city") && <span className="text-xs text-red-600">{err("city")}</span>}
            </label>
            <label className="grid gap-1.5">
              <span className={label}>State *</span>
              <input name="state" required className={input} autoComplete="address-level1" />
              {err("state") && <span className="text-xs text-red-600">{err("state")}</span>}
            </label>
            <label className="grid gap-1.5">
              <span className={label}>Postal code (optional)</span>
              <input name="postal_code" className={input} autoComplete="postal-code" />
            </label>
          </div>
        </div>
      </fieldset>

      {state?.message && (
        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{state.message}</p>
      )}

      <div>
        <BrandSubmit label="Pay with Paystack" pendingLabel="Redirecting…" />
      </div>
    </form>
  );
}
