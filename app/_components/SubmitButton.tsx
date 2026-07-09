"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ label = "Save", pendingLabel = "Saving…" }: { label?: string; pendingLabel?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
