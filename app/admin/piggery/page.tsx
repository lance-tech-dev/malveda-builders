import { Suspense } from "react";
import { connection } from "next/server";
import { requireDashboardAccess } from "@/lib/auth/authorization";
import {
  AdminDevelopmentState,
  AdminDevelopmentSkeleton,
} from "@/components/admin-development-state";

async function PiggeryContent() {
  await connection();
  await requireDashboardAccess();

  return (
    <AdminDevelopmentState
      moduleKey="AGRICULTURE"
      title="Piggery & Poultry Management"
      iconName="agriculture"
    />
  );
}

export default function AdminPiggeryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Suspense fallback={<AdminDevelopmentSkeleton title="Piggery & Poultry Management" />}>
        <PiggeryContent />
      </Suspense>
    </main>
  );
}
