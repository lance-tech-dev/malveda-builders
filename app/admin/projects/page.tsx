import { Suspense } from "react";
import { connection } from "next/server";
import { requireDashboardAccess } from "@/lib/auth/authorization";
import {
  AdminDevelopmentState,
  AdminDevelopmentSkeleton,
} from "@/components/admin-development-state";

async function ProjectsContent() {
  await connection();
  const { user, role } = await requireDashboardAccess();

  return (
    <AdminDevelopmentState
      moduleKey="PROJECTS"
      title="Projects Management"
      description="Manage construction projects, project information, progress, schedules, and project documentation."
      developmentNotice="The Projects Management module is currently under development. Detailed specifications, database schemas, and workflows are being structured prior to implementing active management features."
      plannedCapabilities={[
        "Project records and information",
        "Project progress tracking",
        "Schedules and timeline management",
        "Project documentation storage",
      ]}
      userEmail={user.email}
      userRole={role}
      iconName="projects"
    />
  );
}

export default function AdminProjectsPage() {
  return (
    <main className="ml-16 min-h-screen bg-background text-foreground transition-colors duration-300 lg:ml-64">
      <Suspense fallback={<AdminDevelopmentSkeleton title="Projects Management" />}>
        <ProjectsContent />
      </Suspense>
    </main>
  );
}
