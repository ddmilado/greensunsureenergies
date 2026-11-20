import { NextResponse, type NextRequest } from "next/server";
import { authReturnPath } from "./app/lib/auth-return-path";
import { createRequestAuthClient } from "./app/lib/supabase/request";

const PROTECTED = ["/checkout", "/account", "/admin"];

export async function proxy(request: NextRequest) {
  const { pathname, search, searchParams } = request.nextUrl;
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isProtected = PROTECTED.some((path) => pathname === path || pathname.startsWith(path + "/"));

  if (!isAuthPage && !isProtected) return NextResponse.next();

  const { supabase, applyCookies } = createRequestAuthClient(request);

  if (isAuthPage) {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      const location = authReturnPath(searchParams.get("next"));
      return applyCookies(new NextResponse(null, { status: 303, headers: { location } }));
    }
  } else {
    // Supabase reads single and chunked session cookies, refreshing them as needed.
    // Account and admin pages still check the user's permissions in the DAL.
    const { data } = await supabase.auth.getClaims();
    if (!data?.claims) {
      const params = new URLSearchParams({ next: pathname + search });
      const location = `/login?${params}`;
      return applyCookies(new NextResponse(null, { status: 303, headers: { location } }));
    }
  }

  return applyCookies(NextResponse.next({ request: { headers: request.headers } }));
}

export const config = {
  matcher: ["/login", "/signup", "/checkout/:path*", "/account/:path*", "/admin/:path*"],
};
