import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

export type ModuleIconName =
  | "dashboard"
  | "projects"
  | "manpower"
  | "tools"
  | "agriculture";

interface AdminDevelopmentStateProps {
  moduleKey: string;
  title: string;
  iconName?: ModuleIconName;
}

const ICONS: Record<ModuleIconName, ReactNode> = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  projects: (
    <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  ),
  manpower: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  tools: (
    <>
      <path d="m14.7 6.3 3 3" />
      <path d="M4 20 14.7 9.3a4 4 0 0 0 5-5l-3 3-3-3 3-3a4 4 0 0 0-5 5L1 17z" />
    </>
  ),
  agriculture: (
    <>
      <path d="M3 10 12 4l9 6v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
      <path d="M9 21v-7h6v7" />
      <path d="M12 4v4" />
    </>
  ),
};

/** Blueprint grid backdrop shared by the state and its loading skeleton. */
function GridBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-35 mask-[radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
    />
  );
}

export function AdminDevelopmentState({
  moduleKey,
  title,
  iconName = "dashboard",
}: AdminDevelopmentStateProps) {
  return (
    <section
      aria-labelledby="module-heading"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8"
    >
      <GridBackdrop />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red ring-1 ring-brand-red/20">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            {ICONS[iconName]}
          </svg>
        </div>

        <Badge variant="warning" size="md" dot>
          Under Development
        </Badge>

        {/* Spacing via gap: global h1/p rules reset margins. */}
        <div className="flex flex-col items-center gap-3">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-brand-red">
            Module · {moduleKey}
          </p>
          <h1
            id="module-heading"
            className="text-4xl font-black uppercase tracking-tight text-text-primary sm:text-5xl"
          >
            {title}
            <span className="text-brand-red">.</span>
          </h1>
        </div>

        <p className="max-w-md text-base leading-relaxed text-text-secondary">
          This module is currently under development.
        </p>
      </div>
    </section>
  );
}

export function AdminDevelopmentSkeleton({
  title = "Module",
}: {
  title?: string;
}) {
  return (
    <section
      role="status"
      aria-label={`Loading ${title}`}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16"
    >
      <GridBackdrop />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="h-14 w-14 animate-pulse rounded-xl bg-surface-secondary" />
        <div className="h-6 w-40 animate-pulse rounded-md bg-surface-secondary" />
        <div className="h-4 w-32 animate-pulse rounded bg-surface-secondary" />
        <div className="h-12 w-72 animate-pulse rounded-lg bg-surface-secondary" />
        <div className="h-5 w-64 animate-pulse rounded bg-surface-secondary" />
      </div>
    </section>
  );
}
