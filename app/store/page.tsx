import type { Metadata } from "next";
import Link from "next/link";
import {
  MagnifyingGlass,
  Package,
  SolarPanel,
  BatteryCharging,
  PlugCharging,
  Wrench,
  Lightning,
  Monitor,
} from "@phosphor-icons/react/dist/ssr";
import { listProducts, listCategories } from "@/app/lib/dal";
import { formatNGN } from "@/app/lib/format";
import { addToCartAction } from "@/app/lib/actions/store";
import { AddToCartButton } from "./_components/AddToCartButton";

const CATEGORY_ICONS: Record<string, { icon: typeof SolarPanel; color: string }> = {
  panels: { icon: SolarPanel, color: "text-[var(--brand-blue)]" },
  batteries: { icon: BatteryCharging, color: "text-[var(--solar-lime)]" },
  inverters: { icon: PlugCharging, color: "text-[var(--energy-cyan)]" },
  accessories: { icon: Wrench, color: "text-[var(--ink-600)]" },
  cables: { icon: Lightning, color: "text-amber-500" },
  monitoring: { icon: Monitor, color: "text-violet-500" },
};

const DEFAULT_ICON = { icon: Package, color: "text-[var(--ink-600)]" };

export const metadata: Metadata = {
  title: "Solar Store | Batteries, Inverters, Panels & Accessories",
  description:
    "Shop genuine solar batteries, inverters, panels, and accessories. Shipped nationwide. Pay with card, transfer, or USSD.",
  alternates: { canonical: "/store" },
};

type SP = { category?: string; q?: string };

export const dynamic = "force-dynamic";

export default async function StorePage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const [categories, products] = await Promise.all([
    listCategories(),
    listProducts({ categorySlug: sp.category, search: sp.q }),
  ]);

  const activeCategory = sp.category
    ? categories.find((c) => c.slug === sp.category)?.name
    : null;

  return (
    <main id="main" className="overflow-x-hidden">
      {/* Hero section */}
      <section className="bg-[var(--ink-950)] px-4 pb-16 pt-40 text-white md:px-8 md:pt-48">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--solar-lime)]">Store</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.05em] md:text-6xl">
            Solar equipment you can trust.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/72">
            Genuine batteries, inverters, panels, and accessories — shipped nationwide. Pay with card, transfer, or USSD.
          </p>

          {/* Search */}
          <form action="/store" className="mt-8 flex max-w-md gap-2">
            <div className="relative flex-1">
              <MagnifyingGlass
                size={18}
                weight="bold"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                name="q"
                defaultValue={sp.q ?? ""}
                placeholder="Search products…"
                className="w-full rounded-full border border-white/16 bg-white/8 py-3 pl-11 pr-4 text-sm text-white placeholder-white/40 outline-none backdrop-blur-md transition focus:border-[var(--solar-lime)]/50 focus:bg-white/12"
              />
            </div>
            {sp.category && <input type="hidden" name="category" value={sp.category} />}
            <button
              type="submit"
              className="rounded-full bg-[var(--solar-lime)] px-5 py-3 text-sm font-semibold text-[var(--ink-950)] transition hover:bg-white"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Main content */}
      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[220px_1fr]">
          {/* Sidebar filters */}
          <aside className="h-fit lg:sticky lg:top-24">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-600)]">Categories</h2>
            <nav className="mt-3 grid gap-1">
              <Link
                href="/store"
                className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                  !sp.category
                    ? "bg-[var(--ink-950)] text-white"
                    : "text-[var(--ink-700)] hover:bg-[var(--shell)]"
                }`}
              >
                All products
              </Link>
              {categories.map((c) => {
                const { icon: CatIcon, color } = CATEGORY_ICONS[c.slug] ?? DEFAULT_ICON;
                const active = sp.category === c.slug;
                return (
                  <Link
                    key={c.id}
                    href={`/store?category=${c.slug}`}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      active
                        ? "bg-[var(--ink-950)] text-white"
                        : "text-[var(--ink-700)] hover:bg-[var(--shell)]"
                    }`}
                  >
                    <span className={`flex size-8 items-center justify-center rounded-lg ${active ? "bg-white/12" : "bg-[var(--mist)]"} ${active ? "text-white" : color}`}>
                      <CatIcon size={16} weight={active ? "fill" : "duotone"} />
                    </span>
                    {c.name}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Product grid */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-[var(--ink-600)]">
                {products.length} product{products.length !== 1 ? "s" : ""}
                {activeCategory && (
                  <>
                    {" in "}
                    <span className="font-semibold text-[var(--ink-950)]">{activeCategory}</span>
                  </>
                )}
              </p>
            </div>

            {products.length === 0 ? (
              <div className="rounded-[2rem] bg-[var(--shell)] p-12 text-center ring-1 ring-[var(--line)]">
                <Package size={48} weight="duotone" className="mx-auto text-[var(--ink-300)]" />
                <h3 className="mt-4 text-lg font-semibold text-[var(--ink-950)]">No products found</h3>
                <p className="mt-2 text-sm text-[var(--ink-600)]">
                  Try a different search or category filter.
                </p>
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((p: any) => {
                  const image = p.images?.[0]?.url;
                  const outOfStock = p.stock <= 0;
                  return (
                    <li
                      key={p.id}
                      className="group overflow-hidden rounded-[2rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)] transition hover:ring-[var(--brand-blue)]/30"
                    >
                      <Link href={`/store/${p.slug}`} className="block overflow-hidden rounded-[1.6rem]">
                        <div className="relative aspect-square overflow-hidden bg-[var(--mist)]">
                          {image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={image}
                              alt={p.name}
                              className="h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-sm text-[var(--ink-300)]">
                              No image
                            </div>
                          )}
                          {outOfStock && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                              <span className="rounded-full bg-[var(--ink-950)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                                Out of stock
                              </span>
                            </div>
                          )}
                          {p.compare_at_kobo && p.compare_at_kobo > p.price_kobo && !outOfStock && (
                            <div className="absolute right-3 top-3 rounded-full bg-[var(--solar-lime)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--ink-950)]">
                              Sale
                            </div>
                          )}
                        </div>
                      </Link>
                      <div className="p-4">
                        <Link href={`/store/${p.slug}`}>
                          <h3 className="line-clamp-1 text-base font-semibold tracking-[-0.02em] text-[var(--ink-950)]">
                            {p.name}
                          </h3>
                          {p.brand && <p className="mt-0.5 text-xs text-[var(--ink-600)]">{p.brand}</p>}
                        </Link>
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <div>
                            <p className="text-lg font-semibold tracking-[-0.02em] text-[var(--ink-950)]">
                              {formatNGN(p.price_kobo)}
                            </p>
                            {p.compare_at_kobo && p.compare_at_kobo > p.price_kobo && (
                              <p className="text-xs text-[var(--ink-300)] line-through">
                                {formatNGN(p.compare_at_kobo)}
                              </p>
                            )}
                          </div>
                          {!outOfStock && (
                            <form action={addToCartAction}>
                              <input type="hidden" name="product_id" value={p.id} />
                              <input type="hidden" name="quantity" value={1} />
                              <AddToCartButton />
                            </form>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
