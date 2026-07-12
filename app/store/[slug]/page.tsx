import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, ShieldCheck, Truck, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { getProductBySlug, listProducts } from "@/app/lib/dal";
import { formatNGN } from "@/app/lib/format";
import { addToCartAction } from "@/app/lib/actions/store";
import { AddToCartButton } from "../_components/AddToCartButton";
import { QuantityField } from "../../components/StoreUI";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) return { title: "Product not found" };
  return {
    title: `${p.name} | Mainstream Green Store`,
    description: p.short_desc ?? undefined,
    alternates: { canonical: `/store/${p.slug}` },
  };
}

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const others = (await listProducts({ categorySlug: product.category?.slug }))
    .filter((p: any) => p.id !== product.id)
    .slice(0, 4);

  const outOfStock = product.stock <= 0;
  const images = product.images ?? [];
  const specs: { label: string; value: string }[] = [];
  if (product.wattage_w != null) specs.push({ label: "Wattage", value: `${product.wattage_w} W` });
  if (product.capacity_ah != null) specs.push({ label: "Capacity", value: `${product.capacity_ah} Ah` });
  if (product.voltage_v != null) specs.push({ label: "Voltage", value: `${product.voltage_v} V` });
  if (product.warranty_yrs != null) specs.push({ label: "Warranty", value: `${product.warranty_yrs} years` });

  return (
    <main id="main" className="overflow-x-hidden">
      <section className="px-4 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            {/* Gallery */}
            <div className="grid gap-3">
              {images.length === 0 ? (
                <div className="aspect-square w-full rounded-[2rem] bg-[var(--mist)]" />
              ) : (
                <>
                  <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-[var(--mist)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={images[0].url}
                      alt={images[0].alt ?? product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {images.length > 1 && (
                    <div className="grid grid-cols-4 gap-3">
                      {images.slice(1, 5).map((img: any) => (
                        <div
                          key={img.id}
                          className="relative aspect-square overflow-hidden rounded-2xl bg-[var(--mist)] ring-1 ring-[var(--line)]"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img.url} alt={img.alt ?? product.name} className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <div className="flex-1">
                {product.brand && (
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
                    {product.brand}
                  </p>
                )}
                <h1 className="mt-2 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.05em] text-[var(--ink-950)] md:text-5xl">
                  {product.name}
                </h1>

                <div className="mt-5 flex items-baseline gap-3">
                  <span className="text-3xl font-semibold tracking-[-0.03em] text-[var(--ink-950)]">
                    {formatNGN(product.price_kobo)}
                  </span>
                  {product.compare_at_kobo && product.compare_at_kobo > product.price_kobo && (
                    <span className="text-lg text-[var(--ink-300)] line-through">
                      {formatNGN(product.compare_at_kobo)}
                    </span>
                  )}
                </div>

                {/* Availability */}
                <div className="mt-4 flex items-center gap-2 text-sm">
                  {outOfStock ? (
                    <span className="flex items-center gap-1.5 text-red-600">
                      <span className="size-2 rounded-full bg-red-500" /> Out of stock
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-emerald-700">
                      <span className="size-2 rounded-full bg-emerald-500" /> {product.stock} in stock
                    </span>
                  )}
                </div>

                {/* Specs */}
                {specs.length > 0 && (
                  <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 rounded-2xl bg-[var(--shell)] p-5 ring-1 ring-[var(--line)]">
                    {specs.map((s) => (
                      <div key={s.label}>
                        <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-600)]">
                          {s.label}
                        </dt>
                        <dd className="mt-1 text-sm font-semibold text-[var(--ink-950)]">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {/* Short description */}
                {product.short_desc && (
                  <p className="mt-6 text-base leading-7 text-[var(--ink-700)]">{product.short_desc}</p>
                )}
              </div>

              {/* Add to cart */}
              <div className="mt-8 border-t border-[var(--line)] pt-6">
                {outOfStock ? (
                  <div className="flex items-center justify-center rounded-full bg-[var(--shell)] px-6 py-3 text-sm font-medium text-[var(--ink-600)] ring-1 ring-[var(--line)]">
                    Currently unavailable
                  </div>
                ) : (
                  <form action={addToCartAction} className="flex flex-wrap items-center gap-3">
                    <input type="hidden" name="product_id" value={product.id} />
                    <QuantityField name="quantity" defaultValue={1} min={1} max={Math.max(1, product.stock)} />
                    <AddToCartButton label="Add to cart" />
                  </form>
                )}

                {/* Trust badges */}
                <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-[var(--ink-600)]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={20} weight="duotone" className="text-[var(--brand-blue)]" />
                    Genuine warranty
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck size={20} weight="duotone" className="text-[var(--brand-blue)]" />
                    Nationwide shipping
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} weight="duotone" className="text-[var(--brand-blue)]" />
                    Expert support
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full description */}
          {product.description && (
            <section className="mt-16">
              <h2 className="text-lg font-semibold tracking-[-0.03em] text-[var(--ink-950)]">Description</h2>
              <p className="mt-4 max-w-3xl whitespace-pre-line text-base leading-8 text-[var(--ink-700)]">
                {product.description}
              </p>
            </section>
          )}

          {/* Related */}
          {others.length > 0 && (
            <section className="mt-20">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold tracking-[-0.03em] text-[var(--ink-950)]">You may also like</h2>
                <Link
                  href="/store"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--brand-blue)] transition hover:text-[var(--ink-950)]"
                >
                  Browse all <ArrowLeft size={16} className="rotate-180" />
                </Link>
              </div>
              <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                {others.map((p: any) => {
                  const img = p.images?.[0]?.url;
                  return (
                    <li
                      key={p.id}
                      className="group overflow-hidden rounded-2xl bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]"
                    >
                      <Link href={`/store/${p.slug}`} className="block overflow-hidden rounded-xl">
                        <div className="relative aspect-square overflow-hidden bg-[var(--mist)]">
                          {img && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={img}
                              alt={p.name}
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                            />
                          )}
                        </div>
                        <div className="p-3">
                          <p className="line-clamp-1 text-sm font-medium text-[var(--ink-950)]">{p.name}</p>
                          <p className="mt-1 text-sm font-semibold text-[var(--brand-blue)]">
                            {formatNGN(p.price_kobo)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}
