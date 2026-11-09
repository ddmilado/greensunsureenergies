"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ label = "Save", pendingLabel = "Saving…" }: { label?: string; pendingLabel?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--surface)] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_2px_12px_rgba(3,21,13,0.2)] transition duration-500 ease-[var(--ease-out-heavy)] hover:bg-[var(--brand-blue)] active:scale-[0.96] disabled:opacity-60 disabled:active:scale-100"
    >
      {pending ? (
        <>
          <svg viewBox="0 0 24 24" fill="none" className="size-4 animate-spin" aria-hidden>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          {pendingLabel}
        </>
      ) : (
        label
      )}
    </button>
  );
}
