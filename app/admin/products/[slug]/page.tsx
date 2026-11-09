import { notFound } from "next/navigation";
import { adminGetProduct, listCategories } from "@/app/lib/dal";
import { updateProductAction } from "@/app/lib/actions/products";
import { ProductForm } from "../ProductForm";
import { AdminHeader } from "../../AdminUI";

export const dynamic = "force-dynamic";
type Params = { slug: string };

export default async function EditProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [product, categories] = await Promise.all([adminGetProduct(slug), listCategories()]);
  if (!product) notFound();

  const images = (product.images ?? []).map((im: any) => ({ url: im.url, alt: im.alt ?? "" }));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AdminHeader eyebrow="Commerce · Edit" title="Edit product" description={`Slug: ${product.slug}`} />
        <a
          href={`/store/${product.slug}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-10 items-center rounded-full border border-[var(--line)] bg-[var(--panel-muted)] px-4 text-xs font-semibold text-[var(--ink-700)] transition hover:border-[var(--brand-green)] hover:text-[var(--ink-950)]"
        >
          View on site ↗
        </a>
      </div>
      <div className="mt-6">
        <ProductForm
          slug={product.slug}
          action={updateProductAction as unknown as Parameters<typeof ProductForm>[0]["action"]}
          categories={categories as { id: string; slug: string; name: string }[]}
          defaults={{
            name: product.name,
            slug: product.slug,
            brand: product.brand ?? "",
            category_id: product.category?.id ?? "",
            price_kobo: product.price_kobo,
            compare_at_kobo: product.compare_at_kobo ?? 0,
            stock: product.stock,
            active: product.active,
            wattage_w: product.wattage_w ?? 0,
            capacity_ah: product.capacity_ah ?? 0,
            voltage_v: product.voltage_v ?? 0,
            warranty_yrs: product.warranty_yrs ?? 0,
            short_desc: product.short_desc ?? "",
            description: product.description ?? "",
            images,
          }}
        />
      </div>
    </div>
  );
}
