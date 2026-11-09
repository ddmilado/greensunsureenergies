"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { AuthPasswordField } from "../components/AuthPasswordField";
import { useActionState } from "react";
import { loginAction, type AuthFormState } from "@/app/lib/actions/auth";

export function LoginForm() {
  const [state, action, pending] = useActionState<AuthFormState | undefined, FormData>(loginAction, undefined);
  return (
    <form action={action} className="auth-form" aria-busy={pending}>
      <div>
        <label htmlFor="email" >
          Email
        </label>
        <input
          id="email"
          aria-invalid={state?.errors?.email?.length ? true : undefined}
          aria-describedby={state?.errors?.email?.length ? "email-error" : undefined}
          name="email"
          type="email"
          required
          autoComplete="email"
          className="form-field mt-1.5"
          placeholder="you@example.com"
        />
        {state?.errors?.email && <p id="email-error" className="auth-field-error">{state.errors.email[0]}</p>}
      </div>
      <AuthPasswordField errors={state?.errors?.password} />
      {state?.message && <p role="alert" className="auth-message">{state.message}</p>}
      <button
        disabled={pending}
        type="submit"
        className="auth-submit"
      >
        {pending ? "Signing in…" : "Sign in"}<ArrowRight size={18} aria-hidden="true" />
      </button>
      <p className="auth-switch">
        New here?{" "}
        <Link href="/signup" >
          Create an account
        </Link>
      </p>
    </form>
  );
}
