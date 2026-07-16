import { AuthLayout } from "../components/AuthLayout";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Sign in | Green Sunsure Energy" };

export default function LoginPage() {
  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in to manage your orders and quote history."
      subtitle="Track your orders, save quotes, and pick up where you left off with the Green Sunsure team."
      image="/assets/solar5-BNpRpaJY.jpg"
    >
      <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">Sign in</h1>
      <p className="mt-1.5 text-sm text-[var(--ink-600)]">Use your Green Sunsure account email and password.</p>
      <div className="mt-7">
        <LoginForm />
      </div>
    </AuthLayout>
  );
}
