import { Suspense } from "react";
import { connection } from "next/server";
import { requireDashboardAccess } from "@/lib/auth/authorization";
import {
  AdminDevelopmentState,
  AdminDevelopmentSkeleton,
} from "@/components/admin-development-state";

async function DashboardContent() {
  await connection();
  const { user, role } = await requireDashboardAccess();

  return (
    <AdminDevelopmentState
      moduleKey="DASHBOARD"
      title="Dashboard"
      description="Central overview of Malveda Builders operations and management activities."
      developmentNotice="Our administration platform is currently being developed. Management tools, operational insights, and business records will become available as each module is completed."
      plannedCapabilities={[
        "Centralized operations overview",
        "Management activity summaries",
        "Operational insights and metrics",
        "Cross-module navigation shortcuts",
      ]}
      userEmail={user.email}
      userRole={role}
      iconName="dashboard"
    />
  );
}

export default function AdminDashboardPage() {
  return (
    <main className="ml-16 min-h-screen bg-background text-foreground transition-colors duration-300 lg:ml-64">
      <Suspense fallback={<AdminDevelopmentSkeleton title="Dashboard" />}>
        <DashboardContent />
      </Suspense>
    </main>
  );
}
