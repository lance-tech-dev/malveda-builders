"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AdminNavbar, type SidebarMode } from "@/components/admin-navbar";

const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * Holds the sidebar's collapse state so the sidebar and page content stay in
 * step. The state lives in the admin layout, so it survives navigation
 * between admin pages.
 */
export function AdminShell({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<SidebarMode>("auto");

  function toggle() {
    setMode((current) => {
      const isExpanded =
        current === "auto"
          ? window.matchMedia(DESKTOP_QUERY).matches
          : current === "expanded";
      return isExpanded ? "collapsed" : "expanded";
    });
  }

  // Below lg an expanded sidebar overlays the page: close it on Escape.
  useEffect(() => {
    if (mode !== "expanded") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !window.matchMedia(DESKTOP_QUERY).matches) {
        setMode("collapsed");
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mode]);

  // After picking a page on mobile/tablet, fold an overlaid sidebar away.
  function handleNavigate() {
    if (mode === "expanded" && !window.matchMedia(DESKTOP_QUERY).matches) {
      setMode("collapsed");
    }
  }

  // Content always clears the icon rail; on desktop it also clears the full sidebar.
  const contentPadding = mode === "collapsed" ? "pl-16" : "pl-16 lg:pl-64";

  return (
    <>
      <AdminNavbar mode={mode} onToggle={toggle} onNavigate={handleNavigate} />

      {mode === "expanded" && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setMode("collapsed")}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] lg:hidden"
        />
      )}

      <div className={`transition-[padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${contentPadding}`}>{children}</div>
    </>
  );
}
