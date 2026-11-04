import { Suspense } from "react";
import { connection } from "next/server";
import { requireDashboardAccess } from "@/lib/auth/authorization";
import {
  AdminDevelopmentState,
  AdminDevelopmentSkeleton,
} from "@/components/admin-development-state";

async function PiggeryContent() {
  await connection();
  const { user, role } = await requireDashboardAccess();

  return (
    <AdminDevelopmentState
      moduleKey="AGRICULTURE"
      title="Piggery & Poultry Management"
      description="A dedicated management module for the client's piggery and poultry business operations."
      developmentNotice="This module will provide independent management infrastructure for agricultural operations. Architectural scoping, data isolation, and operational workflow requirements will be established prior to database and feature implementation."
      plannedCapabilities={[
        "Agricultural business operations overview",
        "Independent workflow architecture",
        "Operational records management",
        "Dedicated administration controls",
      ]}
      userEmail={user.email}
      userRole={role}
      iconName="agriculture"
    />
  );
}

export default function AdminPiggeryPage() {
  return (
    <main className="ml-16 min-h-screen bg-background text-foreground transition-colors duration-300 lg:ml-64">
      <Suspense fallback={<AdminDevelopmentSkeleton title="Piggery & Poultry Management" />}>
        <PiggeryContent />
      </Suspense>
    </main>
  );
}
