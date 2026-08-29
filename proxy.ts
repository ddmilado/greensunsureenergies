// Auth guard: checkout/account/admin require login; cart is guest-friendly (cookie cart).
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED = ["/checkout", "/account", "/admin"];

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtected = PROTECTED.some(
    (p) => path === p || path.startsWith(p + "/"),
  );
  if (!isProtected) return NextResponse.next();

  // Optimistic check: a Supabase auth cookie is present.
  // Real authorization happens in the DAL via RLS.
  const hasSession = req.cookies.getAll().some((c) => /^sb-.*-auth-token$/.test(c.name));
  if (!hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/account/:path*", "/admin/:path*"],
};
