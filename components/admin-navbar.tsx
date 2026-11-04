
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ThemeToggle } from "@/components/theme-toggle";

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

export function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

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
    <aside className="fixed inset-y-0 left-0 z-50 flex w-16 flex-col border-r border-border bg-surface transition-colors duration-300 lg:w-64">
      {/* Brand Header */}
      <Link
        href="/admin/dashboard"
        aria-label="Malveda Builders Operations"
        className="flex h-20 shrink-0 items-center justify-center gap-3.5 border-b border-border px-4 transition-colors hover:bg-surface-hover lg:justify-start lg:px-6"
      >
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-red font-black text-white shadow-sm ring-1 ring-black/10">
          <span className="text-base tracking-wider">M</span>
          <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full border-2 border-surface bg-emerald-500" />
        </div>

        <div className="hidden leading-tight lg:block">
          <span className="block text-sm font-extrabold tracking-[0.18em] text-text-primary">
            MALVEDA
          </span>
          <span className="mt-0.5 block text-[9px] font-semibold tracking-[0.26em] text-text-muted">
            OPERATIONS
          </span>
        </div>
      </Link>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-2 py-6 lg:px-4">
        <div className="mb-3 hidden items-center justify-between px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-text-muted lg:flex">
          <span>Main Console</span>
          <span className="h-1 w-1 rounded-full bg-border-strong" />
        </div>

        <nav aria-label="Admin navigation" className="flex flex-col gap-1.5">
          {navigationItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/admin/dashboard" &&
                pathname.startsWith(`${item.href}/`));

            const baseClasses = `relative flex h-11 items-center justify-center gap-3 rounded-lg px-3 transition-all duration-200 lg:justify-start ${
              active
                ? "bg-brand-red/10 font-semibold text-brand-red shadow-xs"
                : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
            }`;

            return (
              <Link
                key={item.label}
                href={item.href}
                title={item.label}
                aria-current={active ? "page" : undefined}
                className={baseClasses}
              >
                {active && (
                  <span className="absolute bottom-2 left-0 top-2 w-0.75 rounded-r-full bg-brand-red" />
                )}

                <NavIcon name={item.icon} />

                <span className="hidden flex-1 text-sm lg:block">
                  {item.label}
                </span>

                {active && (
                  <span className="hidden h-1.5 w-1.5 rounded-full bg-brand-red lg:block" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls */}
      <div className="shrink-0 space-y-2.5 border-t border-border p-3 lg:p-4">
        {logoutError && (
          <p
            role="alert"
            className="hidden text-xs text-brand-red lg:block"
          >
            {logoutError}
          </p>
        )}

        {/* Public Website Link */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          title="View Public Website"
          className="flex h-9 w-full items-center justify-center gap-2.5 rounded-lg border border-transparent px-2.5 text-xs font-medium text-text-secondary transition-colors hover:border-border hover:bg-surface-hover hover:text-text-primary lg:justify-start"
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
          <span className="hidden flex-1 lg:block">Public Site</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="hidden h-3.5 w-3.5 text-text-muted lg:block"
            aria-hidden="true"
          >
            <path d="M7 17L17 7M7 7h10v10" />
          </svg>
        </Link>

        {/* Appearance Mode */}
        <div className="flex items-center justify-center gap-3 rounded-lg border border-border/60 bg-surface-secondary/40 p-1.5 lg:justify-between lg:px-3">
          <span className="hidden text-xs font-medium text-text-secondary lg:block">
            Appearance
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
          className="flex h-10 w-full items-center justify-center gap-2.5 rounded-lg border border-border bg-surface-card text-text-secondary transition-all hover:border-brand-red/50 hover:bg-brand-red/5 hover:text-brand-red disabled:opacity-50 lg:justify-start lg:px-3"
        >
          <NavIcon name="logout" />
          <span className="hidden text-sm font-medium lg:block">
            {isLoggingOut ? "Signing out..." : "Sign Out"}
          </span>
        </button>
      </div>
    </aside>
  );
}
