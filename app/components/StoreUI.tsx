"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import { Minus, Plus } from "@phosphor-icons/react";

// ---------- Brand button (submit) ----------

export function BrandSubmit({
  label,
  pendingLabel,
  fullWidth = false,
}: {
  label: string;
  pendingLabel?: string;
  fullWidth?: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--ink-950)] px-6 py-3 text-sm font-semibold text-white transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[var(--brand-blue)] active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100 ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {pending ? (pendingLabel ?? "Saving…") : label}
    </button>
  );
}

// ---------- Quantity stepper (client) ----------

export function QuantityField({
  name = "quantity",
  defaultValue = 1,
  min = 1,
  max = 99,
}: {
  name?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex h-10 items-center overflow-hidden rounded-full border border-[var(--line)] bg-white">
      <button
        type="button"
        className="grid h-10 w-10 place-items-center text-[var(--ink-600)] transition hover:bg-[var(--mist)]"
        onClick={(e) => {
          const input = (e.currentTarget.nextElementSibling as HTMLInputElement);
          const next = Math.max(min, (parseInt(input.value) || min) - 1);
          input.value = String(next);
        }}
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      <input
        name={name}
        type="number"
        defaultValue={defaultValue}
        min={min}
        max={max}
        className="h-10 w-12 border-x border-[var(--line)] bg-transparent text-center text-sm font-semibold text-[var(--ink-950)] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        className="grid h-10 w-10 place-items-center text-[var(--ink-600)] transition hover:bg-[var(--mist)]"
        onClick={(e) => {
          const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
          const next = Math.min(max, (parseInt(input.value) || min) + 1);
          input.value = String(next);
        }}
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

// ---------- Status pill ----------

export function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 ring-amber-200",
    paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    failed: "bg-red-50 text-red-700 ring-red-200",
    shipped: "bg-sky-50 text-sky-700 ring-sky-200",
    delivered: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    cancelled: "bg-neutral-100 text-neutral-600 ring-neutral-200",
  };
  const cls = styles[status] ?? "bg-neutral-100 text-neutral-600 ring-neutral-200";
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ring-1 ${cls}`}>
      {status}
    </span>
  );
}
