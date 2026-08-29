import { vi } from "vitest";

// server-only is a no-op in tests
vi.mock("server-only", () => ({}));

// Mock next/headers cookies() for cart tests — individual tests can override
vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => ({
    get: vi.fn(() => undefined),
    getAll: vi.fn(() => []),
    set: vi.fn(),
    delete: vi.fn(),
  })),
}));

// Mock next/navigation redirect
vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  }),
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

// Mock cache helper
vi.mock("react", async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    cache: (fn: any) => fn,
  };
});
