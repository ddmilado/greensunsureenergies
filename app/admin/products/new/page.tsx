import { createProductAction } from "@/app/lib/actions/products";
import { listCategories } from "@/app/lib/dal";
import { ProductForm } from "../ProductForm";
import { AdminHeader } from "../../AdminUI";

export const metadata = { title: "Admin · New product | Green Sunsure" };
export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = (await listCategories()) as { id: string; slug: string; name: string }[];
  return (
    <div>
      <AdminHeader eyebrow="Commerce · New" title="Add product" description="Create a listing for the store catalog." />
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
