"use client";

import { useFormStatus } from "react-dom";
import { ShoppingBagOpen } from "@phosphor-icons/react";

export function AddToCartButton({ label = "Add to cart", fullWidth = false }: { label?: string; fullWidth?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`group/btn inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-white transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[var(--brand-blue)] active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100 ${
        fullWidth ? "w-full" : ""
      }`}
    >
      <ShoppingBagOpen size={18} weight="bold" className="transition group-hover/btn:scale-110" />
      {pending ? "Adding…" : label}
    </button>
  );
}
