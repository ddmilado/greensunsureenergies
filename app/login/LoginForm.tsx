"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, type AuthFormState } from "@/app/lib/actions/auth";

export function LoginForm() {
  const [state, action, pending] = useActionState<AuthFormState | undefined, FormData>(loginAction, undefined);
  return (
    <form action={action} className="grid gap-5">
      <div>
        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
        />
        {state?.errors?.email && <p className="mt-1 text-xs text-red-600">{state.errors.email[0]}</p>}
      </div>
      <div>
        <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
        />
        {state?.errors?.password && <p className="mt-1 text-xs text-red-600">{state.errors.password[0]}</p>}
      </div>
      {state?.message && <p className="text-sm text-red-600">{state.message}</p>}
      <button
        disabled={pending}
        type="submit"
        className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[var(--ink-950)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--brand-blue)] disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
      <p className="text-center text-sm text-neutral-500">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-[var(--ink-950)] underline underline-offset-2 hover:text-[var(--brand-blue)]">
          Create an account
        </Link>
      </p>
    </form>
  );
}
