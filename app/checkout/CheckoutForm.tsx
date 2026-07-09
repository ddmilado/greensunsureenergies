"use client";

import { useActionState } from "react";
import { startCheckoutAction } from "@/app/lib/actions/store";
import { SubmitButton } from "@/app/_components/SubmitButton";

type State = { errors?: Record<string, string[]>; message?: string } | undefined;

export function CheckoutForm() {
  const [state, action, pending] = useActionState<State, FormData>(startCheckoutAction, undefined);
  return (
    <form action={action} className="space-y-8">
      <section>
        <h2 className="text-lg font-medium">Contact</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field name="full_name" label="Full name" />
          <Field name="phone" label="Phone" />
          <Field name="email" label="Email" type="email" full />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium">Shipping address</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field name="address1" label="Address line 1" full />
          <Field name="address2" label="Address line 2 (optional)" full />
          <Field name="city" label="City" />
          <Field name="state" label="State" />
          <Field name="postal_code" label="Postal code (optional)" />
        </div>
      </section>

      {state?.message && <p className="text-sm text-red-600">{state.message}</p>}

      <SubmitButton label="Pay with Paystack" pendingLabel="Redirecting…" />
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  full = false,
}: {
  name: string;
  label: string;
  type?: string;
  full?: boolean;
}) {
  return (
    <label className={`block text-sm ${full ? "sm:col-span-2" : ""}`}>
      <span className="font-medium">{label}</span>
      <input
        name={name}
        type={type}
        required={type !== "text" || name !== "address2"}
        className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm"
      />
    </label>
  );
}
