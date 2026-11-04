
import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { requireDashboardAccess } from "@/lib/auth/authorization";

async function AdminRedirect(): Promise<React.ReactNode> {
  await connection();

  // Redirects to /login when unauthenticated or not owner/admin.
  await requireDashboardAccess();

  redirect("/admin/dashboard");

  return null;
}

function AdminPortalLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red font-black text-white shadow-sm ring-4 ring-brand-red/10 animate-pulse">
          <span className="text-xl">M</span>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
          Accessing Operations Console...
        </p>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<AdminPortalLoading />}>
      <AdminRedirect />
    </Suspense>
  );
}
