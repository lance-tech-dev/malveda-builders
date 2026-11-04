"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminRole, type AppRole } from "@/lib/auth/authorization";

export type LoginState = {
  error: string | null;
  email: string;
};

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Please enter your email and password.", email };
  }

  const supabase = await createClient();

  const { data, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError || !data.user) {
    return {
      error: "Invalid email or password. Please verify your credentials.",
      email,
    };
  }

  // Resolve the role server-side from the user_roles table (RLS: own row only).
  const { data: roleRecord } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", data.user.id)
    .maybeSingle();

  const role = (roleRecord?.role ?? null) as AppRole | null;

  if (!isAdminRole(role)) {
    // Do not keep a session for accounts without admin authorization.
    await supabase.auth.signOut();

    return {
      error:
        role === "editor"
          ? "Access restricted. Your account does not have permission to access the admin area."
          : "Access restricted. Your account has not been assigned an authorized role.",
      email,
    };
  }

  redirect("/admin/dashboard");
}
