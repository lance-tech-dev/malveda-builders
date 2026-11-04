import { Suspense } from "react";
import { connection } from "next/server";
import { requireDashboardAccess } from "@/lib/auth/authorization";
import {
  AdminDevelopmentState,
  AdminDevelopmentSkeleton,
} from "@/components/admin-development-state";

async function ManpowerContent() {
  await connection();
  const { user, role } = await requireDashboardAccess();

  return (
    <AdminDevelopmentState
      moduleKey="MANPOWER"
      title="Manpower Management"
      description="Manage employees, construction personnel, assignments, attendance, and workforce information."
      developmentNotice="The Manpower Management module is currently under development. Detailed specifications, database schemas, and workflows are being structured prior to implementing active management features."
      plannedCapabilities={[
        "Employee and personnel records",
        "Personnel assignments",
        "Attendance records",
        "Workforce information management",
      ]}
      userEmail={user.email}
      userRole={role}
      iconName="manpower"
    />
  );
}

export default function AdminManpowerPage() {
  return (
    <main className="ml-16 min-h-screen bg-background text-foreground transition-colors duration-300 lg:ml-64">
      <Suspense fallback={<AdminDevelopmentSkeleton title="Manpower Management" />}>
        <ManpowerContent />
      </Suspense>
    </main>
  );
}
