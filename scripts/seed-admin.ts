
import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";

loadEnvConfig(process.cwd());

async function seedAdmin() {
  const {
    NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    ADMIN_SEED_EMAIL,
    ADMIN_SEED_PASSWORD,
    ADMIN_SEED_NAME,
  } = process.env;

  if (
    !NEXT_PUBLIC_SUPABASE_URL ||
    !SUPABASE_SERVICE_ROLE_KEY ||
    !ADMIN_SEED_EMAIL ||
    !ADMIN_SEED_PASSWORD ||
    !ADMIN_SEED_NAME
  ) {
    throw new Error("Missing required admin seed environment variables.");
  }

  const supabase = createClient(
    NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );

  console.log("Creating initial Owner account...");

  const { data, error } = await supabase.auth.admin.createUser({
    email: ADMIN_SEED_EMAIL,
    password: ADMIN_SEED_PASSWORD,
    email_confirm: true,
    user_metadata: {
      full_name: ADMIN_SEED_NAME,
    },
  });

  if (error) {
    throw new Error(`Admin account creation failed: ${error.message}`);
  }

  const userId = data.user.id;

  const { error: roleError } = await supabase
    .from("user_roles")
    .insert({
      user_id: userId,
      role: "owner",
    });

  if (roleError) {
    const { error: rollbackError } =
      await supabase.auth.admin.deleteUser(userId);

    if (rollbackError) {
      throw new Error(
        `Role assignment failed: ${roleError.message}. ` +
        `User cleanup also failed: ${rollbackError.message}`,
      );
    }

    throw new Error(
      `Role assignment failed. The newly created user was removed: ${roleError.message}`,
    );
  }

  console.log("Initial Owner account created successfully.");
  console.log(`Email: ${data.user.email}`);
}

seedAdmin().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
