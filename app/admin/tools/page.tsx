import { Suspense } from "react";
import { connection } from "next/server";
import { requireDashboardAccess } from "@/lib/auth/authorization";
import {
  AdminDevelopmentState,
  AdminDevelopmentSkeleton,
} from "@/components/admin-development-state";

async function ToolsContent() {
  await connection();
  await requireDashboardAccess();

  return (
    <AdminDevelopmentState
      moduleKey="TOOLS"
      title="Tools & Equipment Management"
      iconName="tools"
    />
  );
}

export default function AdminToolsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Suspense fallback={<AdminDevelopmentSkeleton title="Tools & Equipment Management" />}>
        <ToolsContent />
      </Suspense>
    </main>
  );
}
