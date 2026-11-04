import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export type ModuleIconName =
  | "dashboard"
  | "projects"
  | "manpower"
  | "tools"
  | "agriculture";

interface AdminDevelopmentStateProps {
  moduleKey: string;
  title: string;
  description: string;
  developmentNotice: string;
  plannedCapabilities?: string[];
  userEmail?: string;
  userRole?: string;
  iconName?: ModuleIconName;
}

function ModuleIcon({ name }: { name: ModuleIconName }) {
  const icons: Record<ModuleIconName, ReactNode> = {
    dashboard: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    projects: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),
    manpower: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    tools: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="m14.7 6.3 3 3" />
        <path d="M4 20 14.7 9.3a4 4 0 0 0 5-5l-3 3-3-3 3-3a4 4 0 0 0-5 5L1 17z" />
      </svg>
    ),
    agriculture: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M3 10 12 4l9 6v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
        <path d="M9 21v-7h6v7" />
        <path d="M12 4v4" />
      </svg>
    ),
  };

  return icons[name];
}

export function AdminDevelopmentState({
  moduleKey,
  title,
  description,
  developmentNotice,
  plannedCapabilities = [],
  userEmail,
  userRole,
  iconName = "dashboard",
}: AdminDevelopmentStateProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-text-muted uppercase">
          <span>Operations Console</span>
          <span>/</span>
          <span className="text-text-primary">{title}</span>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="warning" size="sm" dot>
            Under Development
          </Badge>
          <span className="hidden text-xs text-text-muted sm:inline-block">
            {formattedDate}
          </span>
        </div>
      </div>

      {/* Operator Session Context */}
      {userEmail && (
        <div className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-surface-card p-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-red font-black text-white text-xs">
              {userEmail.charAt(0).toUpperCase()}
            </div>
            <div className="leading-tight">
              <span className="block text-xs font-semibold text-text-primary">
                {userEmail}
              </span>
              <span className="text-[11px] text-text-muted">
                Authenticated Operator · Role:{" "}
                <span className="font-semibold text-brand-red capitalize">
                  {userRole ?? "User"}
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-secondary">
              Authenticated Session
            </span>
          </div>
        </div>
      )}

      {/* Main Development Phase Monolith Card */}
      <Card variant="default" className="relative overflow-hidden p-8 sm:p-12">
        {/* Subtle Ambient Blueprint Grid Pattern */}
        <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-25 mask-[radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

        <div className="relative z-10 space-y-6">
          {/* Header Row */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red ring-1 ring-brand-red/20 shadow-xs">
                <ModuleIcon name={iconName} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold tracking-wider text-brand-red uppercase">
                    Module · {moduleKey}
                  </span>
                  <Badge variant="warning" size="sm">
                    In Development
                  </Badge>
                </div>
                <h1 className="mt-1 text-2xl font-black tracking-tight text-text-primary sm:text-3xl">
                  {title}
                </h1>
              </div>
            </div>

            <div className="hidden sm:block text-right">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                Architecture Stage
              </span>
              <p className="mt-0.5 font-mono text-xs font-semibold text-text-primary">
                PHASE 1 · FOUNDATION
              </p>
            </div>
          </div>

          {/* Module Description */}
          <p className="text-base text-text-secondary leading-relaxed max-w-3xl">
            {description}
          </p>

          {/* Development Notice Callout */}
          <div className="rounded-xl border border-border/80 bg-surface/70 p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-primary">
              <span className="flex h-2 w-2 rounded-full bg-amber-500" />
              <span>Development Notice</span>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed">
              {developmentNotice}
            </p>
          </div>

          {/* Planned Capabilities / Architecture Scope */}
          {plannedCapabilities.length > 0 && (
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-text-muted block">
                Planned Scope & Subsystems
              </span>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {plannedCapabilities.map((capability) => (
                  <div
                    key={capability}
                    className="flex items-center gap-3 rounded-lg border border-border/70 bg-surface-card p-3 text-xs text-text-secondary"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-red shrink-0" />
                    <span className="font-medium text-text-primary">
                      {capability}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architectural Safety Footnote */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-[11px] text-text-muted font-mono">
            <span>FOUNDATION ARCHITECTURE ONLY</span>
            <span>DATA SCHEMAS & WORKFLOWS PENDING FORMAL SPECIFICATION</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function AdminDevelopmentSkeleton({
  title = "Module",
}: {
  title?: string;
}) {
  return (
    <div
      role="status"
      aria-label={`Loading ${title}`}
      className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="flex items-center justify-between border-b border-border pb-5">
        <div className="h-4 w-40 animate-pulse rounded bg-surface-secondary" />
        <div className="h-6 w-32 animate-pulse rounded-full bg-surface-secondary" />
      </div>

      <div className="h-20 animate-pulse rounded-xl border border-border bg-surface-card" />

      <div className="rounded-2xl border border-border bg-surface-card p-8 sm:p-12 space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 animate-pulse rounded-xl bg-surface-secondary" />
          <div className="space-y-2">
            <div className="h-4 w-28 animate-pulse rounded bg-surface-secondary" />
            <div className="h-7 w-48 animate-pulse rounded bg-surface-secondary" />
          </div>
        </div>

        <div className="h-5 w-3/4 animate-pulse rounded bg-surface-secondary" />
        <div className="h-24 animate-pulse rounded-xl bg-surface-secondary/70" />
      </div>
    </div>
  );
}
