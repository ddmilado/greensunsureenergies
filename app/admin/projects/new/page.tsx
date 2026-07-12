import { ProjectForm } from "../ProjectForm";
import { createProjectAction } from "@/app/lib/actions/content";

export const metadata = { title: "Admin · New project | Mainstream Green" };
export const dynamic = "force-dynamic";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">New project</h1>
      <p className="mt-1 text-sm text-neutral-500">Add a new project case study.</p>
      <div className="mt-6">
        <ProjectForm action={createProjectAction} />
      </div>
    </div>
  );
}
