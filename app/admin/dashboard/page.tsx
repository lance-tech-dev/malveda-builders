
import { Suspense } from "react";
import { connection } from "next/server";
import { requireDashboardAccess } from "@/lib/auth/authorization";

async function DashboardContent() {
  await connection();

  const { user, role } = await requireDashboardAccess();

  return (
    <div className="mx-auto max-w-7xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
        Malveda Builders
      </p>

      <h1 className="mt-3 text-3xl font-bold">
        Admin Dashboard
      </h1>

      <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold">Welcome back!</h2>

        <p className="mt-2 text-sm text-white/60">
          {user.email}
        </p>

        <div className="mt-4 inline-flex rounded-lg bg-red-600/10 px-3 py-2 text-sm font-semibold capitalize text-red-400">
          {role}
        </div>
      </div>
    </div>
  );
}

function DashboardLoading() {
  return (
    <div className="mx-auto max-w-7xl">
      <p className="text-white/50">Loading admin dashboard...</p>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-24 text-white">
      <Suspense fallback={<DashboardLoading />}>
        <DashboardContent />
      </Suspense>
    </main>
  );
}
