"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/app/_components/SubmitButton";

type ActionState = { errors?: Record<string, string[]>; message?: string } | undefined;
type Action = (prev: ActionState, formData: FormData) => Promise<ActionState>;

const input =
  "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none";
const label = "text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500";

export function PostForm({
  action,
  defaults,
  slug,
}: {
  action: Action | ((slug: string, prev: ActionState, fd: FormData) => Promise<ActionState>);
  defaults?: Record<string, unknown>;
  slug?: string;
}) {
  const isEdit = typeof slug === "string";
  const bound = isEdit
    ? (action as (slug: string, prev: ActionState, fd: FormData) => Promise<ActionState>).bind(null, slug!)
    : (action as Action);
  const [state, formAction] = useActionState(bound, undefined as ActionState);
  const get = (k: string) => state?.errors?.[k]?.[0];
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
          />
          {get("slug") && <span className="text-xs text-red-600">{get("slug")}</span>}
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-1.5">
          <span className={label}>Category</span>
          <input name="category" defaultValue={valueOf("category")} placeholder="Info / Tips / Business" className={input} />
        </label>
        <label className="grid gap-1.5">
          <span className={label}>Author</span>
          <input name="author_name" defaultValue={valueOf("author_name") || "Green Sunsure Team"} className={input} />
        </label>
        <label className="grid gap-1.5">
          <span className={label}>Reading time (min)</span>
          <input name="reading_minutes" type="number" min={1} max={60} defaultValue={valueOf("reading_minutes") || "5"} className={input} />
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
        <textarea name="body" defaultValue={valueOf("body")} rows={16} className={`${input} font-mono text-xs`} />
        <span className="text-xs text-neutral-500">Use ## headings, ### sub-headings, - bullet lists, blank lines for paragraphs.</span>
      </label>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="active" defaultChecked={defaults ? checked("active") : true} />
          Active (show on site)
        </label>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-neutral-200 pt-4">
        <SubmitButton label={isEdit ? "Save changes" : "Create post"} pendingLabel={isEdit ? "Saving…" : "Creating…"} />
      </div>
    </form>
  );
}
