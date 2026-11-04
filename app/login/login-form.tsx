"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { login, type LoginState } from "./actions";

const initialState: LoginState = { error: null, email: "" };

const RESTRICTED_MESSAGE =
  "Access restricted. Your account does not have permission to access the admin area.";

const inputClassName =
  "block h-11 w-full rounded-lg border border-border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 disabled:opacity-60";

const labelClassName =
  "mb-1.5 block text-xs font-semibold tracking-wider text-text-secondary uppercase";

export function LoginForm() {
  const searchParams = useSearchParams();
  const [state, formAction, pending] = useActionState(login, initialState);

  // Server-side guards redirect here with ?error=access-restricted.
  const redirectError =
    searchParams.get("error") === "access-restricted" ? RESTRICTED_MESSAGE : null;

  const error = state.error ?? redirectError;

  return (
    <form action={formAction} className="relative mt-8 flex flex-col gap-4">
      <div>
        <label htmlFor="email" className={labelClassName}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          defaultValue={state.email}
          disabled={pending}
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="password" className={labelClassName}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={pending}
          className={inputClassName}
        />
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400"
        >
          {error}
        </div>
      )}

      <div className="pt-1">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={pending}
          className="w-full"
        >
          Login
        </Button>
      </div>
    </form>
  );
}
