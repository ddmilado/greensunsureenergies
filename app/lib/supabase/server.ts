// Supabase clients for Server Components, Route Handlers, and Server Actions.
//   - createServerClient:  RLS-enforced client, reads/writes the signed-in user via cookies.
//   - createAdminClient:  service_role, bypasses RLS — NEVER expose to the browser.
import "server-only";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient as createSbClient } from "@supabase/supabase-js";

export async function createServerClient_() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options as CookieOptions),
            );
          } catch {
            // Called from a Server Component — ignore. Route Handlers/Server
            // Actions can still set cookies via Next's cookies() API.
          }
        },
      },
    },
  );
}

export function createAdminClient() {
  return createSbClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
