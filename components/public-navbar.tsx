"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrandLogo } from "@/components/brand-logo";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const;

// Homepage sections that mirror a nav tab, in page order.
const HOME_SECTIONS = [
  { id: "about", href: "/about" },
  { id: "services", href: "/services" },
  { id: "projects", href: "/projects" },
  { id: "contact", href: "/contact" },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function BrandMark() {
  return (
    <Link
      href="/"
      aria-label="Malveda Builders home"
      className="group justify-self-start rounded-lg text-left"
    >
      <BrandLogo />
    </Link>
  );
}

export default function PublicNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const isHome = pathname === "/";
  const [homeSectionHref, setHomeSectionHref] = useState<string>("/");
  const progressRef = useRef<HTMLSpanElement>(null);

  // On the homepage, highlight the tab whose section is in view and fill the
  // scroll progress bar. Elsewhere the active tab simply follows the route.
  useEffect(() => {
    if (!isHome) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      // A section becomes current once its top passes 40% of the viewport;
      // at the very bottom of the page the last section wins.
      const marker = window.innerHeight * 0.4;
      let current = "/";
      for (const section of HOME_SECTIONS) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= marker) current = section.href;
      }
      if (maxScroll > 0 && window.scrollY >= maxScroll - 2) {
        current = HOME_SECTIONS[HOME_SECTIONS.length - 1].href;
      }
      setHomeSectionHref(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [isHome]);

  const activeHref = isHome
    ? homeSectionHref
    : NAV_ITEMS.find((item) => isActivePath(pathname, item.href))?.href;

  // Close the mobile menu on Escape, or when the viewport grows to desktop.
  useEffect(() => {
    if (!menuOpen) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    const close = () => setMenuOpen(false);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const onViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) close();
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onViewportChange);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onViewportChange);
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        aria-label="Primary"
        className="relative mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 overflow-hidden rounded-xl border border-border/80 bg-surface/75 px-4 py-3 shadow-soft backdrop-blur-xl transition-colors duration-300 sm:px-6 lg:grid-cols-[1fr_auto_1fr]"
      >
        {isHome && (
          <span
            ref={progressRef}
            aria-hidden="true"
            style={{ transform: "scaleX(0)" }}
            className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand-red"
          />
        )}

        <BrandMark />

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = item.href === activeHref;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                  className={`group relative inline-flex h-10 items-center rounded-lg px-3.5 text-[13px] font-medium tracking-wide transition-colors duration-200 ${
                    active ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3.5 bottom-1.5 h-px origin-center transition-transform duration-300 ease-out ${
                      active
                        ? "scale-x-100 bg-brand-red"
                        : "scale-x-0 bg-border-strong group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center justify-self-end gap-2 sm:gap-3">
          <ThemeToggle />

          <div aria-hidden="true" className="hidden h-5 w-px bg-border sm:block" />

          <Link
            href="/login"
            className="hidden h-10 items-center rounded-lg bg-brand-red px-5 text-xs font-semibold tracking-wide text-white shadow-xs transition-colors hover:bg-brand-red-dark sm:inline-flex"
          >
            Login
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors duration-200 hover:border-brand-red hover:text-brand-red lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
              <path
                d={menuOpen ? "M6 6l12 12" : "M4 7h16"}
                className="transition-[d] duration-300"
              />
              <path d="M4 12h16" className={`transition-opacity duration-200 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
              <path
                d={menuOpen ? "M6 18L18 6" : "M4 17h16"}
                className="transition-[d] duration-300"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id={menuId}
        inert={!menuOpen}
        className={`mx-auto grid max-w-7xl transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
          menuOpen ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mt-2 rounded-xl border border-border/80 bg-surface/90 p-2 shadow-soft backdrop-blur-xl">
            <ul>
              {NAV_ITEMS.map((item, index) => {
                const active = item.href === activeHref;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                      className={`relative flex items-center gap-4 rounded-lg px-4 py-3.5 text-[15px] font-medium transition-colors duration-200 ${
                        active
                          ? "bg-surface-secondary text-text-primary"
                          : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                      }`}
                    >
                      {active && (
                        <span aria-hidden="true" className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-brand-red" />
                      )}
                      <span className={`font-mono text-[11px] ${active ? "text-brand-red" : "text-text-muted"}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-2 border-t border-border p-2 pt-4">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex h-11 w-full items-center justify-center rounded-lg bg-brand-red text-sm font-semibold text-white shadow-xs transition-colors hover:bg-brand-red-dark"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
