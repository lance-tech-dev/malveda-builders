import "server-only";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const APP_ROLES = ["owner", "admin", "editor"] as const;

export type AppRole = (typeof APP_ROLES)[number];

// Only these roles may access the admin area.
export const ADMIN_ROLES = ["owner", "admin"] as const satisfies readonly AppRole[];

export type AdminRole = (typeof ADMIN_ROLES)[number];

export function isAdminRole(role: AppRole | null | undefined): role is AdminRole {
  return !!role && (ADMIN_ROLES as readonly AppRole[]).includes(role);
}

export const LOGIN_PATH = "/login";
export const ACCESS_RESTRICTED_PATH = `${LOGIN_PATH}?error=access-restricted`;

export async function getCurrentUserRole() {
  const supabase = await createClient();

  // Verify the authenticated user with Supabase.
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  // Retrieve the user's role from our protected database table.
  const { data: roleRecord, error: roleError } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (roleError || !roleRecord) {
    return null;
  }

  const role = roleRecord.role;

  // Validate the role against our supported application roles.
  if (!APP_ROLES.includes(role as AppRole)) {
    return null;
  }

  return {
    user,
    role: role as AppRole,
  };
}

export async function requireDashboardAccess() {
  const access = await getCurrentUserRole();

  if (!access) {
    redirect(LOGIN_PATH);
  }

  // Authenticated, but not authorized for the admin area (e.g. editor).
  if (!isAdminRole(access.role)) {
    redirect(ACCESS_RESTRICTED_PATH);
  }

  return { user: access.user, role: access.role as AdminRole };
}