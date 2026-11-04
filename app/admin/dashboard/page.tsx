import { Suspense } from "react";
import { connection } from "next/server";
import { requireDashboardAccess } from "@/lib/auth/authorization";
import {
  AdminDevelopmentState,
  AdminDevelopmentSkeleton,
} from "@/components/admin-development-state";

async function DashboardContent() {
  await connection();
  await requireDashboardAccess();

  return (
    <AdminDevelopmentState
      moduleKey="DASHBOARD"
      title="Dashboard"
      iconName="dashboard"
    />
  );
}

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Suspense fallback={<AdminDevelopmentSkeleton title="Dashboard" />}>
        <DashboardContent />
      </Suspense>
    </main>
  );
}
