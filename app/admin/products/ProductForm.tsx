"use client";

import { useState } from "react";
import { useActionState } from "react";
import { SubmitButton } from "@/app/_components/SubmitButton";
import { uploadProductImageAction } from "@/app/lib/actions/products";

type ActionState = { errors?: Record<string, string[]>; message?: string } | undefined;
type Action = (prev: ActionState, formData: FormData) => Promise<ActionState>;
type ImageRow = { url: string; alt: string };

const input =
  "w-full rounded-xl border border-[var(--line)] bg-[var(--panel-muted)] px-3.5 py-2.5 text-sm text-[var(--ink-950)] outline-none transition duration-300 focus:border-[var(--brand-green)] focus:bg-white focus:ring-2 focus:ring-[var(--ring)]";
const label = "text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-600)]";

export function ProductForm({
  action,
  defaults,
  categories,
  slug,
}: {
  action: Action | ((slug: string, prev: ActionState, fd: FormData) => Promise<ActionState>);
  defaults?: Record<string, unknown>;
  categories: { id: string; slug: string; name: string }[];
  slug?: string;
}) {
  const isEdit = typeof slug === "string";
  const bound = isEdit
    ? (action as (slug: string, prev: ActionState, fd: FormData) => Promise<ActionState>).bind(null, slug!)
    : (action as Action);
  const [state, formAction] = useActionState(bound, undefined as ActionState);

  const initialImages: ImageRow[] = Array.isArray(defaults?.images)
    ? (defaults!.images as ImageRow[]).map((i) => ({ url: i.url ?? "", alt: i.alt ?? "" }))
    : [];
  const [images, setImages] = useState<ImageRow[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const get = (k: string) => state?.errors?.[k]?.[0];
  const valueOf = (k: string) => (defaults ? String((defaults as Record<string, unknown>)[k] ?? "") : "");
  const checked = (k: string) => Boolean((defaults as Record<string, unknown> | undefined)?.[k]);

  const setImageAt = (i: number, patch: Partial<ImageRow>) =>
    setImages((prev) => prev.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      const fd = new FormData();
      fd.set("file", file);
      const res = await uploadProductImageAction(fd);
      if (res.error) setUploadError(res.error);
      else if (res.url) setImages((prev) => [...prev, { url: res.url!, alt: "" }]);
    } catch (err) {
      setUploadError((err as Error).message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        const hidden = (e.currentTarget.elements.namedItem("images") as HTMLInputElement | null);
        if (hidden) hidden.value = JSON.stringify(images);
      }}
      className="grid gap-5"
    >
      {state?.message && (
        <p className="rounded-xl bg-red-50 p-3.5 text-sm text-red-700 ring-1 ring-red-200">{state.message}</p>
      )}
      {uploadError && <p className="rounded-xl bg-red-50 p-3.5 text-sm text-red-700 ring-1 ring-red-200">{uploadError}</p>}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1.5">
          <span className={label}>Name *</span>
          <input name="name" required defaultValue={valueOf("name")} className={input} />
          {get("name") && <span className="text-xs text-red-600">{get("name")}</span>}
        </label>
        <label className="grid gap-1.5">
          <span className={label}>Slug *</span>
          <input
            name="slug"
            required
            defaultValue={valueOf("slug")}
            pattern="[a-z0-9-]+"
            className={input}
            disabled={isEdit}
          />
          {get("slug") && <span className="text-xs text-red-600">{get("slug")}</span>}
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1.5">
          <span className={label}>Brand</span>
          <input name="brand" defaultValue={valueOf("brand")} className={input} />
        </label>
        <label className="grid gap-1.5">
          <span className={label}>Category</span>
          <select name="category_id" defaultValue={valueOf("category_id")} className={input}>
            <option value="">— Uncategorized —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-1.5">
          <span className={label}>Price (₦)</span>
          <input
            name="price_ngn"
            type="number"
            min={0}
            step="0.01"
            required
            defaultValue={valueOf("price_ngn") || (defaults?.price_kobo ? String(Number(defaults.price_kobo) / 100) : "")}
            className={input}
          />
          {get("price_ngn") && <span className="text-xs text-red-600">{get("price_ngn")}</span>}
        </label>
        <label className="grid gap-1.5">
          <span className={label}>Compare-at (₦)</span>
          <input
            name="compare_at_ngn"
            type="number"
            min={0}
            step="0.01"
            defaultValue={
              valueOf("compare_at_ngn") || (defaults?.compare_at_kobo ? String(Number(defaults.compare_at_kobo) / 100) : "")
            }
            className={input}
          />
        </label>
        <label className="grid gap-1.5">
          <span className={label}>Stock</span>
          <input
            name="stock"
            type="number"
            min={0}
            defaultValue={valueOf("stock") || (defaults?.stock != null ? String(defaults.stock) : "0")}
            className={input}
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <label className="grid gap-1.5">
          <span className={label}>Wattage (W)</span>
          <input name="wattage_w" type="number" min={0} defaultValue={valueOf("wattage_w")} className={input} />
        </label>
        <label className="grid gap-1.5">
          <span className={label}>Capacity (Ah)</span>
          <input name="capacity_ah" type="number" min={0} defaultValue={valueOf("capacity_ah")} className={input} />
        </label>
        <label className="grid gap-1.5">
          <span className={label}>Voltage (V)</span>
          <input name="voltage_v" type="number" min={0} defaultValue={valueOf("voltage_v")} className={input} />
        </label>
        <label className="grid gap-1.5">
          <span className={label}>Warranty (yrs)</span>
          <input name="warranty_yrs" type="number" min={0} defaultValue={valueOf("warranty_yrs")} className={input} />
        </label>
      </div>

      <label className="grid gap-1.5">
        <span className={label}>Short description</span>
        <input name="short_desc" defaultValue={valueOf("short_desc")} className={input} />
      </label>

      <label className="grid gap-1.5">
        <span className={label}>Description</span>
        <textarea name="description" defaultValue={valueOf("description")} rows={6} className={input} />
      </label>

      {/* Images */}
      <div className="grid gap-3 rounded-2xl bg-[var(--panel-muted)] p-5 ring-1 ring-[var(--line)]">
        <div className="flex items-center justify-between">
          <span className={label}>Images</span>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-white transition duration-500 ease-[var(--ease-out-heavy)] hover:bg-[var(--brand-blue)] active:scale-[0.96]">
            {uploading ? "Uploading…" : "Upload image"}
            <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={handleUpload} />
          </label>
        </div>

        {images.map((img, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              placeholder="Image URL"
              value={img.url}
              onChange={(e) => setImageAt(i, { url: e.target.value })}
              className={input}
            />
            <input
              placeholder="Alt text"
              value={img.alt}
              onChange={(e) => setImageAt(i, { alt: e.target.value })}
              className={input}
            />
            {img.url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={img.url} alt="" className="size-10 shrink-0 rounded-lg object-cover ring-1 ring-black/10" />
            )}
            <button
              type="button"
              onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
              className="shrink-0 rounded-full border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setImages((prev) => [...prev, { url: "", alt: "" }])}
          className="justify-self-start rounded-full border border-dashed border-[var(--ink-300)] px-4 py-2 text-xs font-medium text-[var(--ink-600)] transition hover:border-[var(--brand-green)] hover:text-[var(--ink-950)]"
        >
          + Add image URL
        </button>
        <input type="hidden" name="images" />
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2.5 text-sm text-[var(--ink-700)]">
          <input
            type="checkbox"
            name="active"
            defaultChecked={defaults ? checked("active") : true}
            className="size-4 rounded accent-[var(--brand-green)]"
          />
          Active (show on site)
        </label>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-[var(--line)] pt-5">
        <SubmitButton label={isEdit ? "Save changes" : "Create product"} pendingLabel={isEdit ? "Saving…" : "Creating…"} />
      </div>
    </form>
  );
}
