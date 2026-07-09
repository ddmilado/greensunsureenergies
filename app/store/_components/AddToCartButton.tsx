"use client";

import { useFormStatus } from "react-dom";

export function AddToCartButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md border border-neutral-900 px-3 py-1.5 text-xs font-medium hover:bg-neutral-900 hover:text-white disabled:opacity-50"
    >
      {pending ? "Adding…" : "Add to cart"}
    </button>
  );
}
