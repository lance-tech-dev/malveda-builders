import { Suspense } from "react";
import { connection } from "next/server";
import { requireDashboardAccess } from "@/lib/auth/authorization";
import {
  AdminDevelopmentState,
  AdminDevelopmentSkeleton,
} from "@/components/admin-development-state";

async function ManpowerContent() {
  await connection();
  await requireDashboardAccess();

  return (
    <AdminDevelopmentState
      moduleKey="MANPOWER"
      title="Manpower Management"
      iconName="manpower"
    />
  );
}

export default function AdminManpowerPage() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Suspense fallback={<AdminDevelopmentSkeleton title="Manpower Management" />}>
        <ManpowerContent />
      </Suspense>
    </main>
  );
}
