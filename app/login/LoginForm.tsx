"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, type AuthFormState } from "@/app/lib/actions/auth";

export function LoginForm() {
  const [state, action, pending] = useActionState<AuthFormState | undefined, FormData>(loginAction, undefined);
  return (
    <form action={action} className="grid gap-5">
      <div>
        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-600)]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="form-field mt-1.5"
          placeholder="you@example.com"
        />
        {state?.errors?.email && <p className="mt-1 text-xs text-red-500">{state.errors.email[0]}</p>}
      </div>
      <div>
        <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-600)]">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="form-field mt-1.5"
          placeholder="Enter your password"
        />
        {state?.errors?.password && <p className="mt-1 text-xs text-red-500">{state.errors.password[0]}</p>}
      </div>
      {state?.message && <p className="text-sm text-red-500">{state.message}</p>}
      <button
        disabled={pending}
        type="submit"
        className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--solar-lime)] px-4 text-sm font-semibold text-[var(--ink-950)] transition hover:bg-[var(--brand-green-dark)] hover:text-white disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
      <p className="text-center text-sm text-[var(--ink-600)]">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-[var(--brand-green)] underline underline-offset-2 hover:text-[var(--brand-green-dark)]">
          Create an account
        </Link>
      </p>
    </form>
  );
}
