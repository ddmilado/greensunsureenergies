import { createPostAction } from "@/app/lib/actions/content";
import { PostForm } from "../PostForm";
import { AdminHeader } from "../../AdminUI";

export const metadata = { title: "Admin · New post | Green Sunsure" };
export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <div>
      <AdminHeader eyebrow="Content · New" title="Write post" description="Publish a new article to the blog." />
      <div className="mt-6">
        <PostForm action={createPostAction} />
      </div>
    </div>
  );
}
