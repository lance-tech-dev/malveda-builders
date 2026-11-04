import { Suspense } from "react";
import { connection } from "next/server";
import { requireDashboardAccess } from "@/lib/auth/authorization";
import {
  AdminDevelopmentState,
  AdminDevelopmentSkeleton,
} from "@/components/admin-development-state";

async function ToolsContent() {
  await connection();
  const { user, role } = await requireDashboardAccess();

  return (
    <AdminDevelopmentState
      moduleKey="TOOLS"
      title="Tools & Equipment Management"
      description="Manage construction tools, equipment inventory, availability, maintenance, and assignments."
      developmentNotice="The Tools & Equipment Management module is currently under development. Detailed specifications, database schemas, and workflows are being structured prior to implementing active management features."
      plannedCapabilities={[
        "Tools and equipment inventory",
        "Equipment availability tracking",
        "Maintenance records",
        "Tool and equipment assignments",
      ]}
      userEmail={user.email}
      userRole={role}
      iconName="tools"
    />
  );
}

export default function AdminToolsPage() {
  return (
    <main className="ml-16 min-h-screen bg-background text-foreground transition-colors duration-300 lg:ml-64">
      <Suspense fallback={<AdminDevelopmentSkeleton title="Tools & Equipment Management" />}>
        <ToolsContent />
      </Suspense>
    </main>
  );
}
