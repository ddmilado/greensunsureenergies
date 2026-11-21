// Supabase client for use in Proxy and Route Handlers.
// Returns the client plus an `applyCookies` helper that stamps any pending
// Set-Cookie headers onto a NextResponse before it is returned.
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export function createRequestAuthClient(request: NextRequest) {
  const cookiesToSet: { name: string; value: string; options: CookieOptions }[] = [];

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookies) {
          cookies.forEach((cookie) => {
            cookiesToSet.push(cookie);
            // Keep the request in sync so a refreshed session is forwarded
            // downstream when the proxy passes the request along.
            request.cookies.set(cookie.name, cookie.value);
          });
        },
      },
    },
  );

  function applyCookies<T extends NextResponse>(response: T): T {
    if (cookiesToSet.length > 0) {
      // Never let a refreshed session be cached by a CDN or shared proxy.
      response.headers.set("Cache-Control", "private, no-store");
      cookiesToSet.forEach(({ name, value, options }) =>
        response.cookies.set(name, value, options as CookieOptions),
      );
    }
    return response;
  }

  return { supabase, applyCookies };
}
