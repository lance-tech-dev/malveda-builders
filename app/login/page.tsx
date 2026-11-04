import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrandLogo } from "@/components/brand-logo";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login",
};

const MODULES = ["Projects", "Manpower", "Tools & Equipment"];

export default function LoginPage() {
  return (
    <main className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Blueprint grid background (matches the public pages) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-blueprint-grid opacity-35 mask-[radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
      />

      {/* Top bar */}
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 pt-5 sm:px-6 sm:pt-6 lg:px-8">
        <Link href="/" aria-label="Malveda Builders home" className="group rounded-lg">
          <BrandLogo />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="group hidden h-10 items-center gap-2 rounded-lg px-3 text-xs font-semibold uppercase tracking-wider text-text-secondary transition-colors hover:text-text-primary sm:inline-flex"
          >
            <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true">
              <path d="M13 8H3M7 4 3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Site
          </Link>
          <div aria-hidden="true" className="hidden h-5 w-px bg-border sm:block" />
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-16 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:px-8">
        {/* Brand statement (desktop) */}
        <section aria-label="About the operations console" className="hidden lg:block">
          <div className="hero-reveal flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-12 bg-brand-red" />
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-text-muted">
              Operations Console
            </p>
          </div>

          <div className="hero-reveal mt-6 [animation-delay:120ms]">
            <h2 className="text-6xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-text-primary xl:text-7xl">
              <span className="block">
                One Console<span className="text-brand-red">.</span>
              </span>
              <span className="block text-text-secondary">
                Every Site<span className="text-brand-red">.</span>
              </span>
            </h2>
          </div>

          <div className="hero-reveal mt-7 max-w-md [animation-delay:240ms]">
            <p className="text-base leading-relaxed text-text-secondary">
              Secure access for the Malveda Builders team. Oversee projects,
              manpower, and equipment from a single place.
            </p>
          </div>

          <div className="hero-reveal mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6 [animation-delay:360ms]">
            {MODULES.map((item, i) => (
              <span
                key={item}
                className="flex items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted"
              >
                {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-red" />}
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Sign-in card */}
        <div className="hero-reveal mx-auto w-full max-w-[420px] lg:ml-auto lg:mr-0 [animation-delay:180ms]">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-card/90 p-6 shadow-elevated backdrop-blur-sm sm:p-8">
            {/* Red accent rule along the top edge */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-brand-red" />

            {/* Heading — spacing via gap, since global h1/p rules reset margins */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-brand-red" />
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-red">
                  Secure Access
                </p>
              </div>
              <h1 className="text-3xl font-black tracking-tight text-text-primary">
                Sign in
              </h1>
              <p className="text-sm text-text-secondary">
                Use your Malveda Builders staff account.
              </p>
            </div>

            <Suspense>
              <LoginForm />
            </Suspense>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
            <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
              <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            Authorized personnel only
          </div>
        </div>
      </div>
    </main>
  );
}
