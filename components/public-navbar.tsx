import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function PublicNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        aria-label="Public Navigation"
        className="mx-auto flex max-w-7xl items-center justify-between rounded-xl border border-border/80 bg-surface/85 px-4 py-3 shadow-soft backdrop-blur-md transition-colors duration-300 sm:px-6"
      >
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-left focus-visible:outline-brand-red"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-red font-black text-white shadow-xs ring-1 ring-black/10">
            <span className="text-sm tracking-wider">M</span>
          </div>

          <div className="leading-tight">
            <span className="block text-sm font-black tracking-[0.16em] text-text-primary transition-colors group-hover:text-brand-red">
              MALVEDA
            </span>
            <span className="block text-[9px] font-semibold tracking-[0.24em] text-text-muted">
              BUILDERS
            </span>
          </div>
        </Link>

        {/* Actions & Theme Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <div className="hidden h-5 w-px bg-border sm:block" />

          <Link
            href="/login"
            className="rounded-lg bg-brand-red px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-brand-red-dark"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
