import { createProductAction } from "@/app/lib/actions/products";
import { listCategories } from "@/app/lib/dal";
import { ProductForm } from "../ProductForm";

export const metadata = { title: "Admin · New product | Green Sunsure" };
export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = (await listCategories()) as { id: string; slug: string; name: string }[];
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">New product</h1>
      <p className="mt-1 text-sm text-neutral-500">Add a product to the store catalog.</p>
      <div className="mt-6">
        <ProductForm
          action={createProductAction}
          categories={categories}
          defaults={{ images: [] }}
        />
      </div>
    </div>
  );
}
