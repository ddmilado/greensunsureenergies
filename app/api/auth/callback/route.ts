// OAuth callback — exchanges the Supabase auth code for a session and redirects.
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient_ } from "@/app/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/account";

  if (code) {
    const supabase = await createServerClient_();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Ensure the profile row exists (Google sign-ins may not trigger the
      // DB trigger that creates profiles for email/password sign-ups).
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const fullName =
          user.user_metadata?.full_name ??
          user.user_metadata?.name ??
          user.email ??
          "User";
        await supabase
          .from("profiles")
          .upsert(
            { id: user.id, full_name: fullName },
            { onConflict: "id", ignoreDuplicates: true },
          );
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // If code exchange fails, redirect to login with an error hint.
  return NextResponse.redirect(`${origin}/login?error=auth`);
}
