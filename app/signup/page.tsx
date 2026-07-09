"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signupAction, type AuthFormState } from "@/app/lib/actions/auth";

export default function SignupPage() {
  const [state, action, pending] = useActionState<AuthFormState | undefined, FormData>(signupAction, undefined);
  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Already have one? <Link href="/login" className="underline">Sign in</Link>
      </p>
      <form action={action} className="mt-8 space-y-5">
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium">Full name</label>
          <input id="full_name" name="full_name" required minLength={2}
            className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm" />
          {state?.errors?.full_name && <p className="mt-1 text-xs text-red-600">{state.errors.full_name[0]}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" required
            className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm" />
          {state?.errors?.email && <p className="mt-1 text-xs text-red-600">{state.errors.email[0]}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input id="password" name="password" type="password" required minLength={8}
            className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm" />
          {state?.errors?.password && (
            <ul className="mt-1 text-xs text-red-600">
              {state.errors.password.map((e) => <li key={e}>• {e}</li>)}
            </ul>
          )}
        </div>
        {state?.message && <p className="text-sm text-red-600">{state.message}</p>}
        <button disabled={pending} type="submit"
          className="w-full rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60">
          {pending ? "Creating…" : "Create account"}
        </button>
      </form>
    </main>
  );
}
