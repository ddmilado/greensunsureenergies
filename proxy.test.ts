import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest, type NextResponse } from "next/server";
import { GET } from "./app/api/auth/callback/route";
import { authReturnPath } from "./app/lib/auth-return-path";
import { proxy } from "./proxy";

const site = "https://www.greensunsure.com";
const authCookie = "sb-test-auth-token";
const user = { id: "test-user", aud: "authenticated", user_metadata: { name: "Google User" } };

function session(expiresIn = 3600) {
  const expiresAt = Math.floor(Date.now() / 1000) + expiresIn;
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const claims = Buffer.from(JSON.stringify({ sub: user.id, exp: expiresAt })).toString("base64url");
  return {
    access_token: `${header}.${claims}.dGVzdA`,
    refresh_token: "test-refresh-token",
    provider_token: "provider-token".repeat(400),
    token_type: "bearer",
    expires_in: expiresIn,
    expires_at: expiresAt,
    user,
  };
}

function sessionHeader(response: NextResponse) {
  return response.cookies.getAll()
    .filter(({ name }) => name.startsWith(authCookie + "."))
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
}

function oauthRequest() {
  return new NextRequest(`${site}/api/auth/callback?code=test-code`, {
    headers: { cookie: `${authCookie}-code-verifier=${encodeURIComponent(JSON.stringify("verifier"))}` },
  });
}

describe("Supabase authentication routes", () => {
  let exchange = session();
  const fetchAuth = vi.fn(async (input: RequestInfo | URL) => {
    const url = new URL(String(input));
    if (url.pathname.endsWith("/user")) return Response.json(user);
    if (url.searchParams.get("grant_type") === "pkce") return Response.json(exchange);
    if (url.searchParams.get("grant_type") === "refresh_token") return Response.json(session());
    throw new Error(`Unexpected auth endpoint: ${url.pathname}`);
  });

  beforeEach(() => {
    exchange = session();
    fetchAuth.mockClear();
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-key");
    vi.stubGlobal("fetch", fetchAuth);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("lands on the dashboard and keeps the chunked Google session across requests", async () => {
    const callback = await GET(oauthRequest());
    expect(callback.headers.get("location")).toBe("/account");
    expect(callback.headers.get("cache-control")).toMatch(/no-store/);
    expect(callback.cookies.get(authCookie + ".0")?.maxAge).toBeGreaterThan(0);
    expect(callback.cookies.get(authCookie + ".1")?.value).toBeTruthy();

    const headers = { cookie: sessionHeader(callback) };
    for (const path of ["/account", "/account/orders"]) {
      const dashboard = await proxy(new NextRequest(site + path, { headers }));
      expect(dashboard.headers.get("x-middleware-next")).toBe("1");
    }

    const login = await proxy(new NextRequest(site + "/login", { headers }));
    expect(login.headers.get("location")).toBe("/account");
  });

  it("forwards a refreshed session to both the dashboard request and the browser", async () => {
    exchange = session(10);
    const callback = await GET(oauthRequest());
    const staleCookies = sessionHeader(callback);
    const dashboard = await proxy(new NextRequest(site + "/account", {
      headers: { cookie: staleCookies },
    }));

    const refreshedCookies = sessionHeader(dashboard);
    expect(refreshedCookies).toBeTruthy();
    expect(refreshedCookies).not.toBe(staleCookies);
    expect(dashboard.headers.get("x-middleware-request-cookie")).toBe(refreshedCookies);
    expect(dashboard.headers.get("cache-control")).toMatch(/no-store/);
  });

  it("keeps the protected destination and query for a signed-out visitor", async () => {
    const response = await proxy(new NextRequest(site + "/checkout/return?reference=order-123"));
    const location = new URL(response.headers.get("location")!, site);
    expect(location.pathname).toBe("/login");
    expect(location.searchParams.get("next")).toBe("/checkout/return?reference=order-123");
    expect(fetchAuth).not.toHaveBeenCalled();
  });

  it("keeps public routes guest friendly", async () => {
    const response = await proxy(new NextRequest(site + "/cart"));
    expect(response.headers.get("x-middleware-next")).toBe("1");
    expect(fetchAuth).not.toHaveBeenCalled();
  });

  it("returns users to a visible retry state if Supabase returns no code", async () => {
    const response = await GET(new NextRequest(site + "/api/auth/callback?error=access_denied"));
    expect(response.headers.get("location")).toBe("/login?error=auth");
    expect(fetchAuth).not.toHaveBeenCalled();
  });
});

it.each(["//elsewhere.example", "/\\elsewhere.example", "/somewhere/..//elsewhere.example", "/signup"])(
  "falls back to the dashboard when the return path is %s",
  (path) => expect(authReturnPath(path)).toBe("/account"),
);
