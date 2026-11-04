import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login | Malveda Builders",
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
      {/* Blueprint Grid Ambient Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-35 mask-[radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4 sm:px-10 sm:py-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-text-secondary uppercase transition-colors hover:text-text-primary"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back to Site</span>
        </Link>

        <ThemeToggle />
      </header>

      {/* Upper-center placement: fixed top offset (never under the header), horizontally centered. */}
      <div className="relative z-10 mx-auto w-full max-w-[440px] px-4 pb-12 pt-[max(5.5rem,12vh)] sm:px-0 lg:pt-[14vh]">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-card p-6 shadow-elevated sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-brand-red/10 blur-2xl" />

          {/* Branding — spacing via gap, since global h1/p rules reset margins */}
          <div className="relative flex flex-col items-center gap-5 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-red font-black text-white shadow-sm ring-4 ring-brand-red/10">
              <span className="text-2xl tracking-wider">M</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <p className="text-[11px] font-bold tracking-[0.28em] text-brand-red uppercase">
                Malveda Builders
              </p>

              <h1 className="text-2xl font-black tracking-tight text-text-primary sm:text-3xl">
                Sign in
              </h1>
            </div>
          </div>

          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
