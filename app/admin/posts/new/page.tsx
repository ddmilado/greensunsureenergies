import { PostForm } from "../PostForm";
import { createPostAction } from "@/app/lib/actions/content";

export const metadata = { title: "Admin · New post | Mainstream Green" };
export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">New blog post</h1>
      <p className="mt-1 text-sm text-neutral-500">Add a new article to the blog.</p>
      <div className="mt-6">
        <PostForm action={createPostAction} />
      </div>
    </div>
  );
}
