"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerClient_ } from "../supabase/server";

const SignupSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters.").trim(),
  email: z.email("Enter a valid email.").trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[a-z]/i, "Must contain at least one letter.")
    .regex(/[0-9]/, "Must contain at least one number."),
});

export type AuthFormState = {
  errors?: { full_name?: string[]; email?: string[]; password?: string[]; _?: string };
  message?: string;
};

export async function signupAction(_prev: AuthFormState | undefined, formData: FormData): Promise<AuthFormState> {
  const parsed = SignupSchema.safeParse({
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }
  const sb = await createServerClient_();
  const { error } = await sb.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: { data: { full_name: parsed.data.full_name } },
  });
  if (error) {
    return { message: error.message };
  }
  // Supabase may require email confirmation depending on project settings.
  // If auto-confirm is on, the user is signed in.
  revalidatePath("/", "layout");
  redirect("/account?welcome=1");
}

const LoginSchema = z.object({
  email: z.email().trim(),
  password: z.string().min(1),
});

export async function loginAction(_prev: AuthFormState | undefined, formData: FormData): Promise<AuthFormState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }
  const sb = await createServerClient_();
  const { error } = await sb.auth.signInWithPassword(parsed.data);
  if (error) {
    return { message: "Invalid email or password." };
  }
  revalidatePath("/", "layout");
  const next = (formData.get("next") as string) || "/account";
  redirect(next);
}

export async function logoutAction() {
  const sb = await createServerClient_();
  await sb.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
