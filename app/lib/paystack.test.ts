import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import crypto from "node:crypto";
import { verifyPaystackSignature } from "./paystack";

describe("paystack helpers", () => {
  describe("verifyPaystackSignature", () => {
    const rawBody = JSON.stringify({ event: "charge.success", data: { reference: "test123" } });
    const secret = "test_webhook_secret_123";

    beforeEach(() => {
      process.env.PAYSTACK_WEBHOOK_SECRET = secret;
    });

    afterEach(() => {
      delete process.env.PAYSTACK_WEBHOOK_SECRET;
    });

    it("returns false when signature is null", () => {
      expect(verifyPaystackSignature(rawBody, null)).toBe(false);
    });

    it("returns false when signature is empty string", () => {
      // empty string is falsy but not null — hash vs "" length mismatch -> false
      expect(verifyPaystackSignature(rawBody, "")).toBe(false);
    });

    it("returns false when secret is missing", () => {
      delete process.env.PAYSTACK_WEBHOOK_SECRET;
      expect(verifyPaystackSignature(rawBody, "anything")).toBe(false);
    });

    it("returns true for valid signature (timingSafeEqual)", () => {
      const hash = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");
      expect(verifyPaystackSignature(rawBody, hash)).toBe(true);
    });

    it("returns false for invalid signature", () => {
      const hash = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");
      const bad = hash.slice(0, -1) + (hash.endsWith("0") ? "1" : "0");
      expect(verifyPaystackSignature(rawBody, bad)).toBe(false);
    });

    it("returns false when signature length differs", () => {
      expect(verifyPaystackSignature(rawBody, "short")).toBe(false);
    });

    it("uses constant-time comparison (does not throw on mismatch)", () => {
      const hash = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");
      // Should not throw, just return false
      expect(() => verifyPaystackSignature(rawBody, hash + "extra")).not.toThrow();
      expect(verifyPaystackSignature(rawBody, hash + "extra")).toBe(false);
    });
  });

  describe("paystackInitialize / paystackVerify (fetch mock)", () => {
    const originalFetch = global.fetch;

    beforeEach(() => {
      process.env.PAYSTACK_SECRET_KEY = "sk_test_123";
      vi.restoreAllMocks();
    });

    afterEach(() => {
      global.fetch = originalFetch;
      delete process.env.PAYSTACK_SECRET_KEY;
    });

    it("paystackInitialize throws when PAYSTACK_SECRET_KEY missing", async () => {
      delete process.env.PAYSTACK_SECRET_KEY;
      const { paystackInitialize } = await import("./paystack");
      await expect(
        paystackInitialize({ email: "a@b.com", amountKobo: 10000, reference: "ref1" }),
      ).rejects.toThrow("PAYSTACK_SECRET_KEY is not set");
    });

    it("paystackInitialize posts to Paystack and returns data", async () => {
      const mockResponse = {
        status: true,
        message: "Authorization URL created",
        data: { authorization_url: "https://checkout.paystack.com/abc", access_code: "abc", reference: "ref1" },
      };
      global.fetch = vi.fn(async () =>
        ({ ok: true, json: async () => mockResponse } as any),
      );
      const { paystackInitialize } = await import("./paystack");
      const res = await paystackInitialize({ email: "a@b.com", amountKobo: 500000, reference: "ref1" });
      expect(res).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.paystack.co/transaction/initialize",
        expect.objectContaining({ method: "POST" }),
      );
    });

    it("paystackInitialize throws on non-ok response", async () => {
      global.fetch = vi.fn(async () => ({ ok: false, status: 401, text: async () => "Unauthorized" } as any));
      const { paystackInitialize } = await import("./paystack");
      await expect(
        paystackInitialize({ email: "a@b.com", amountKobo: 10000, reference: "ref1" }),
      ).rejects.toThrow("Paystack init failed: 401");
    });

    it("paystackVerify fetches verify endpoint", async () => {
      const mockVerify = {
        status: true,
        message: "Verification successful",
        data: { reference: "ref1", amount: 500000, currency: "NGN", status: "success" as const },
      };
      global.fetch = vi.fn(async () => ({ ok: true, json: async () => mockVerify } as any));
      const { paystackVerify } = await import("./paystack");
      const res = await paystackVerify("ref1");
      expect(res).toEqual(mockVerify);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/transaction/verify/ref1"),
        expect.objectContaining({ method: "GET" }),
      );
    });
  });
});
