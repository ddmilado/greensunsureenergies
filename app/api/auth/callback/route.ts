import { NextResponse, type NextRequest } from "next/server";
import { authReturnPath } from "@/app/lib/auth-return-path";
import { createRequestAuthClient } from "@/app/lib/supabase/request";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const { supabase, applyCookies } = createRequestAuthClient(request);
  let location = "/login?error=auth";

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (data.session && !error) {
      location = authReturnPath(request.nextUrl.searchParams.get("next"));
    } else if (error) {
      console.warn("Google session exchange failed", error.code ?? error.name);
    }
  }

  return applyCookies(new NextResponse(null, {
    status: 303,
    headers: { location, "Cache-Control": "private, no-store" },
  }));
}
