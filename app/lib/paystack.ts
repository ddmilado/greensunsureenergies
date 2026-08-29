// Tiny Paystack helpers used by Server Actions and the webhook route.
import "server-only";

const BASE = "https://api.paystack.co";

export type PaystackInitInput = {
  email: string;
  amountKobo: number;
  reference: string;
  callbackUrl?: string;
  metadata?: Record<string, unknown>;
};

export type PaystackInitResponse = {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
};

export type PaystackVerifyResponse = {
  status: boolean;
  message: string;
  data: {
    reference: string;
    amount: number; // in kobo
    currency: string;
    status: "success" | "abandoned" | "failed";
    channel?: string;
    paid_at?: string;
    metadata?: Record<string, unknown>;
  };
};

function authHeader() {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) throw new Error("PAYSTACK_SECRET_KEY is not set");
  return { Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
}

export async function paystackInitialize(input: PaystackInitInput): Promise<PaystackInitResponse> {
  const res = await fetch(`${BASE}/transaction/initialize`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      email: input.email,
      amount: input.amountKobo,
      reference: input.reference,
      currency: "NGN",
      callback_url: input.callbackUrl,
      metadata: input.metadata ?? {},
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Paystack init failed: ${res.status} ${text}`);
  }
  return (await res.json()) as PaystackInitResponse;
}

export async function paystackVerify(reference: string): Promise<PaystackVerifyResponse> {
  const res = await fetch(`${BASE}/transaction/verify/${encodeURIComponent(reference)}`, {
    method: "GET",
    headers: authHeader(),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Paystack verify failed: ${res.status} ${text}`);
  }
  return (await res.json()) as PaystackVerifyResponse;
}

import crypto from "node:crypto";

export function verifyPaystackSignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false;
  const secret = process.env.PAYSTACK_WEBHOOK_SECRET;
  if (!secret) return false;
  const hash = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");
  try {
    const a = Buffer.from(hash, "utf8");
    const b = Buffer.from(signature, "utf8");
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
