import { AuthLayout } from "../components/AuthLayout";
import { SignupForm } from "./SignupForm";

export const metadata = { title: "Create your account | Green Sunsure Energy" };

export default function SignupPage() {
  return (
    <AuthLayout
      eyebrow="Join Green Sunsure"
      title="A little closer to reliable power."
      subtitle="Create your Green Sunsure account to keep track of your orders and make your next checkout easier."
      image="/assets/solar2-7GlQQyMk.jpg"
    >
      <p className="auth-form-eyebrow">Join Green Sunsure</p>
      <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">Create your account</h1>
      <p className="mt-1.5 text-sm text-[var(--ink-600)]">A few details to get you started.</p>
      <div className="mt-7">
        <SignupForm />
      </div>
    </AuthLayout>
  );
}
