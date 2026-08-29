import { describe, it, expect } from "vitest";

// Replicate proxy isProtected logic for unit testing without NextRequest
const PROTECTED = ["/checkout", "/account", "/admin"];

function isProtected(path: string): boolean {
  return PROTECTED.some((p) => path === p || path.startsWith(p + "/"));
}

describe("proxy auth guard", () => {
  it("protects /checkout", () => expect(isProtected("/checkout")).toBe(true));
  it("protects /checkout/return", () => expect(isProtected("/checkout/return")).toBe(true));
  it("protects /account", () => expect(isProtected("/account")).toBe(true));
  it("protects /account/orders", () => expect(isProtected("/account/orders")).toBe(true));
  it("protects /admin", () => expect(isProtected("/admin")).toBe(true));
  it("protects /admin/products/new", () => expect(isProtected("/admin/products/new")).toBe(true));
  it("does NOT protect /cart (guest-friendly)", () => expect(isProtected("/cart")).toBe(false));
  it("does NOT protect /store", () => expect(isProtected("/store")).toBe(false));
  it("does NOT protect /", () => expect(isProtected("/")).toBe(false));
  it("does NOT protect /api/cart/count", () => expect(isProtected("/api/cart/count")).toBe(false));
  it("does not match prefix false positive /adminish", () => expect(isProtected("/adminish")).toBe(false));
});
