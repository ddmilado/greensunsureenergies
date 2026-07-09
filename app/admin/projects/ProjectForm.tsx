"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/app/_components/SubmitButton";

type ActionState = { errors?: Record<string, string[]>; message?: string } | undefined;
type Action = (prev: ActionState, formData: FormData) => Promise<ActionState>;

const input =
  "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none";
const label = "text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500";

export function ProjectForm({
  action,
  defaults,
  slug,
}: {
  action: Action | ((slug: string, prev: ActionState, fd: FormData) => Promise<ActionState>);
  defaults?: Record<string, unknown>;
  slug?: string;
}) {
  const isEdit = typeof slug === "string";
  // build the bound action for useActionState (Next 16 signature)
  const bound = isEdit
    ? (action as (slug: string, prev: ActionState, fd: FormData) => Promise<ActionState>).bind(null, slug!)
    : (action as Action);
  const [state, formAction] = useActionState(bound, undefined as ActionState);
  const get = (k: string) => {
    const errs = state?.errors?.[k];
    if (errs && errs.length) return errs[0];
    return undefined;
  };
  const valueOf = (k: string) => (defaults ? String((defaults as Record<string, unknown>)[k] ?? "") : "");
  const checked = (k: string) => Boolean((defaults as Record<string, unknown> | undefined)?.[k]);
  return (
    <form action={formAction} className="grid gap-5">
      {state?.message && (
        <p className="rounded-md bg-red-50 p-3 text-sm text-red-800">{state.message}</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1.5">
          <span className={label}>Title *</span>
          <input name="title" required defaultValue={valueOf("title")} className={input} />
          {get("title") && <span className="text-xs text-red-600">{get("title")}</span>}
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
            title="Lowercase letters, numbers, dashes."
          />
          {get("slug") && <span className="text-xs text-red-600">{get("slug")}</span>}
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-1.5">
          <span className={label}>Category *</span>
          <input
            name="category"
            required
            defaultValue={valueOf("category")}
            placeholder="Homes / Business / Industrial / Scale"
            className={input}
          />
          {get("category") && <span className="text-xs text-red-600">{get("category")}</span>}
        </label>
        <label className="grid gap-1.5">
          <span className={label}>Client type</span>
          <input name="client_type" defaultValue={valueOf("client_type")} className={input} />
        </label>
        <label className="grid gap-1.5">
          <span className={label}>Location</span>
          <input name="location" defaultValue={valueOf("location")} placeholder="City, State" className={input} />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-1.5">
          <span className={label}>System size</span>
          <input name="system_size" defaultValue={valueOf("system_size")} placeholder='e.g. 5kVA hybrid + 10kWh' className={input} />
        </label>
        <label className="grid gap-1.5">
          <span className={label}>Panels</span>
          <input name="panels" defaultValue={valueOf("panels")} placeholder='e.g. 6 × 450W monocrystalline' className={input} />
        </label>
        <label className="grid gap-1.5">
          <span className={label}>Batteries</span>
          <input name="batteries" defaultValue={valueOf("batteries")} placeholder='e.g. 2 × 5kWh LiFePO4' className={input} />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-1.5">
          <span className={label}>Inverter</span>
          <input name="inverter" defaultValue={valueOf("inverter")} className={input} />
        </label>
        <label className="grid gap-1.5">
          <span className={label}>Install time</span>
          <input name="installation" defaultValue={valueOf("installation")} placeholder="e.g. 2 days" className={input} />
        </label>
        <label className="grid gap-1.5">
          <span className={label}>Outcome (one line)</span>
          <input name="outcome" defaultValue={valueOf("outcome")} className={input} />
        </label>
      </div>

      <label className="grid gap-1.5">
        <span className={label}>Cover image path</span>
        <input name="cover_image" defaultValue={valueOf("cover_image")} placeholder="/hero-1.jpg" className={input} />
      </label>

      <label className="grid gap-1.5">
        <span className={label}>Excerpt</span>
        <textarea name="excerpt" defaultValue={valueOf("excerpt")} rows={2} className={input} />
      </label>

      <label className="grid gap-1.5">
        <span className={label}>Body (Markdown)</span>
        <textarea name="body" defaultValue={valueOf("body")} rows={12} className={`${input} font-mono text-xs`} />
        <span className="text-xs text-neutral-500">Use ## headings, ### sub-headings, - bullet lists, blank lines for paragraphs.</span>
      </label>

      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={checked("featured")} />
          Featured (highlight on home page)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="active" defaultChecked={defaults ? checked("active") : true} />
          Active (show on site)
        </label>
        <label className="grid gap-1.5">
          <span className={label}>Position</span>
          <input
            name="position"
            type="number"
            min={0}
            defaultValue={valueOf("position") || "0"}
            className={`${input} w-24`}
          />
        </label>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-neutral-200 pt-4">
        <SubmitButton label={isEdit ? "Save changes" : "Create project"} pendingLabel={isEdit ? "Saving…" : "Creating…"} />
      </div>
    </form>
  );
}
