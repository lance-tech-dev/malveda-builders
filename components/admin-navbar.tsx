
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrandLogo } from "@/components/brand-logo";

const navigationItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: "dashboard",
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: "projects",
  },
  {
    label: "Manpower",
    href: "/admin/manpower",
    icon: "manpower",
  },
  {
    label: "Tools & Equipment",
    href: "/admin/tools",
    icon: "tools",
  },
  {
    label: "Piggery & Poultry",
    href: "/admin/piggery",
    icon: "agriculture",
  },
] as const;

type IconName = (typeof navigationItems)[number]["icon"] | "logout";

function NavIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
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
    logout: (
      <>
        <path d="M10 17l5-5-5-5" />
        <path d="M15 12H3" />
        <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

/**
 * "auto" follows the screen size (icons below lg, full sidebar from lg);
 * "expanded"/"collapsed" are explicit choices made with the arrow toggle.
 */
export type SidebarMode = "auto" | "expanded" | "collapsed";

interface AdminNavbarProps {
  mode: SidebarMode;
  onToggle: () => void;
  /** Called after choosing a destination, so an overlaid mobile sidebar can close. */
  onNavigate: () => void;
}

export function AdminNavbar({ mode, onToggle, onNavigate }: AdminNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  /** Pick classes for the current mode: [auto, expanded, collapsed]. */
  const pick = (auto: string, expanded: string, collapsed: string) =>
    mode === "auto" ? auto : mode === "expanded" ? expanded : collapsed;

  // Icons keep a fixed position in every state; collapsing only narrows the
  // sidebar (clipping the labels) while the labels fade, so nothing jumps.
  const ease = "duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]";
  const label = `whitespace-nowrap transition-opacity ${ease} ${pick(
    "opacity-0 lg:opacity-100",
    "opacity-100",
    "opacity-0",
  )}`;

  async function handleLogout() {
    if (isLoggingOut) return;

    setLogoutError("");
    setIsLoggingOut(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        setLogoutError("Unable to sign out. Please try again.");
        setIsLoggingOut(false);
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch {
      setLogoutError("Something went wrong while signing out.");
      setIsLoggingOut(false);
    }
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex flex-col overflow-x-hidden border-r border-border bg-surface transition-[width,background-color] ${ease} ${pick(
        "w-16 lg:w-64",
        "w-64",
        "w-16",
      )}`}
    >
      {/* Brand Header — the mark stays centred in the 64px rail. */}
      <Link
        href="/admin/dashboard"
        onClick={onNavigate}
        aria-label="Malveda Operations dashboard"
        className="flex h-20 shrink-0 items-center border-b border-border px-3 transition-colors hover:bg-surface-hover"
      >
        <BrandLogo tagline="Operations" className="shrink-0" textClassName={label} />
      </Link>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-6">
        {/* Section label + collapse/expand arrow */}
        <div className="mb-3 flex h-8 items-center">
          {/* Padding lives on the inner span so the label can shrink to 0 in the rail. */}
          <span className={`min-w-0 flex-1 overflow-hidden text-[10px] font-bold uppercase tracking-[0.22em] text-text-muted ${label}`}>
            <span className="pl-2.5">Main Console</span>
          </span>
          <button
            type="button"
            onClick={onToggle}
            aria-label="Collapse or expand sidebar"
            title="Collapse or expand sidebar"
            className="mr-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:border-brand-red hover:text-brand-red"
          >
            {/* Points left (collapse) when expanded, right (expand) when collapsed. */}
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className={`h-4 w-4 transition-transform ${ease} ${pick("rotate-180 lg:rotate-0", "", "rotate-180")}`}
              aria-hidden="true"
            >
              <path d="M13 8H3M7 4 3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <nav aria-label="Admin navigation" className="flex flex-col gap-1.5">
          {navigationItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/admin/dashboard" &&
                pathname.startsWith(`${item.href}/`));

            const baseClasses = `relative flex h-11 items-center gap-3 rounded-lg px-2.5 transition-colors duration-200 ${
              active
                ? "bg-brand-red/10 font-semibold text-brand-red shadow-xs"
                : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
            }`;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onNavigate}
                title={item.label}
                aria-current={active ? "page" : undefined}
                className={baseClasses}
              >
                {active && (
                  <span className="absolute bottom-2 left-0 top-2 w-0.75 rounded-r-full bg-brand-red" />
                )}

                <NavIcon name={item.icon} />

                <span className={`flex-1 text-sm ${label}`}>{item.label}</span>

                {active && (
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red ${label}`} />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls */}
      <div className="shrink-0 space-y-2.5 overflow-x-hidden border-t border-border p-3">
        {logoutError && (
          <p role="alert" className={`text-xs text-brand-red ${label}`}>
            {logoutError}
          </p>
        )}

        {/* Public Website Link */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          title="View Public Website"
          className="flex h-9 w-full items-center gap-2.5 rounded-lg border border-transparent px-3 text-xs font-medium text-text-secondary transition-colors hover:border-border hover:bg-surface-hover hover:text-text-primary"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-4 w-4 shrink-0"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
          </svg>
          <span className={`flex-1 ${label}`}>Public Site</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className={`h-3.5 w-3.5 shrink-0 text-text-muted ${label}`}
            aria-hidden="true"
          >
            <path d="M7 17L17 7M7 7h10v10" />
          </svg>
        </Link>

        {/* Appearance Mode — the toggle fills the rail exactly when collapsed. */}
        <div className="flex items-center">
          <span className={`min-w-0 flex-1 overflow-hidden text-xs font-medium text-text-secondary ${label}`}>
            <span className="pl-3">Appearance</span>
          </span>
          <ThemeToggle />
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          title="Sign Out"
          aria-label="Sign Out"
          className="flex h-10 w-full items-center gap-2.5 rounded-lg border border-border bg-surface-card px-2.5 text-text-secondary transition-colors hover:border-brand-red/50 hover:bg-brand-red/5 hover:text-brand-red disabled:opacity-50"
        >
          <NavIcon name="logout" />
          <span className={`text-sm font-medium ${label}`}>
            {isLoggingOut ? "Signing out..." : "Sign Out"}
          </span>
        </button>
      </div>
    </aside>
  );
}
