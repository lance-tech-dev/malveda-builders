import { Suspense } from "react";
import { connection } from "next/server";
import { requireDashboardAccess } from "@/lib/auth/authorization";
import {
  AdminDevelopmentState,
  AdminDevelopmentSkeleton,
} from "@/components/admin-development-state";

async function ProjectsContent() {
  await connection();
  await requireDashboardAccess();

  return (
    <AdminDevelopmentState
      moduleKey="PROJECTS"
      title="Projects Management"
      iconName="projects"
    />
  );
}

export default function AdminProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Suspense fallback={<AdminDevelopmentSkeleton title="Projects Management" />}>
        <ProjectsContent />
      </Suspense>
    </main>
  );
}
