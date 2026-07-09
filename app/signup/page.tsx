import { AuthLayout } from "../components/AuthLayout";
import { SignupForm } from "./SignupForm";

export const metadata = { title: "Create your account | Damdavy" };

export default function SignupPage() {
  return (
    <AuthLayout
      eyebrow="Join Damdavy"
      title="Create an account to track orders and quote history."
      subtitle="Save your shipping address, pick up a quote, and manage everything in one place — your data stays on your device."
      image="/hero-2.jpg"
    >
      <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">Create your account</h1>
      <p className="mt-1.5 text-sm text-neutral-500">It takes about 30 seconds.</p>
      <div className="mt-7">
        <SignupForm />
      </div>
    </AuthLayout>
  );
}
