"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { AuthPasswordField } from "../components/AuthPasswordField";
import { useActionState } from "react";
import { signupAction, type AuthFormState } from "@/app/lib/actions/auth";

export function SignupForm() {
  const [state, action, pending] = useActionState<AuthFormState | undefined, FormData>(signupAction, undefined);
  return (
    <form action={action} className="auth-form" aria-busy={pending}>
      <div>
        <label htmlFor="full_name" >
          Full name
        </label>
        <input
          id="full_name"
          aria-invalid={state?.errors?.full_name?.length ? true : undefined}
          aria-describedby={state?.errors?.full_name?.length ? "full_name-error" : undefined}
          name="full_name"
          required
          minLength={2}
          autoComplete="name"
          className="form-field mt-1.5"
          placeholder="Your full name"
        />
        {state?.errors?.full_name && <p id="full_name-error" className="auth-field-error">{state.errors.full_name[0]}</p>}
      </div>
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
      <AuthPasswordField isNew errors={state?.errors?.password} />
      {state?.message && <p role="alert" className="auth-message">{state.message}</p>}
      <button
        disabled={pending}
        type="submit"
        className="auth-submit"
      >
        {pending ? "Creating account…" : "Create account"}<ArrowRight size={18} aria-hidden="true" />
      </button>
      <p className="auth-privacy">Read how we handle your information in our <Link href="/privacy-policy">privacy policy</Link>.</p>
      <p className="auth-switch">
        Already have one?{" "}
        <Link href="/login" >
          Sign in
        </Link>
      </p>
    </form>
  );
}
