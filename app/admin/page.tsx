
import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { getCurrentUserRole } from "@/lib/auth/authorization";

async function AdminRedirect(): Promise<React.ReactNode> {
  await connection();

  const access = await getCurrentUserRole();

  if (!access) {
    redirect("/admin/login");
  }

  redirect("/admin/dashboard");

  return null;
}

export default function AdminPage() {
  return (
    <Suspense fallback={<p>Loading admin portal...</p>}>
      <AdminRedirect />
    </Suspense>
  );
}
