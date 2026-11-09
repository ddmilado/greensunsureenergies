import { createProjectAction } from "@/app/lib/actions/content";
import { ProjectForm } from "../ProjectForm";
import { AdminHeader } from "../../AdminUI";

export const metadata = { title: "Admin · New project | Green Sunsure" };
export const dynamic = "force-dynamic";

export default function NewProjectPage() {
  return (
    <div>
      <AdminHeader eyebrow="Content · New" title="Add project" description="Publish a new installation case study." />
      <div className="mt-6">
        <ProjectForm action={createProjectAction} />
      </div>
    </div>
  );
}
