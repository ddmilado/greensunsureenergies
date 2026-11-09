import { AuthLayout } from "../components/AuthLayout";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Sign in | Green Sunsure Energy" };

export default function LoginPage() {
  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Your next brighter day starts here."
      subtitle="Keep your orders in view and stay connected with the team behind your solar setup."
      image="/assets/solar5-BNpRpaJY.jpg"
    >
      <p className="auth-form-eyebrow">Your Green Sunsure account</p>
      <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">Welcome back.</h1>
      <p className="mt-1.5 text-sm text-[var(--ink-600)]">Use your Green Sunsure account email and password.</p>
      <div className="mt-7">
        <LoginForm />
      </div>
    </AuthLayout>
  );
}
