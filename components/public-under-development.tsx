import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface PublicUnderDevelopmentProps {
  /** Two-digit index matching the navbar order, e.g. "02". */
  index: string;
  title: string;
  description: string;
}

export function PublicUnderDevelopment({
  index,
  title,
  description,
}: PublicUnderDevelopmentProps) {
  return (
    <main className="relative overflow-hidden bg-background text-foreground transition-colors duration-300">
      <section
        aria-labelledby="page-heading"
        className="relative flex min-h-[92vh] items-center justify-center px-4 pb-20 pt-32 sm:px-6 lg:px-8"
      >
        {/* Blueprint grid background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-35 mask-[radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
        />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <Badge variant="warning" size="md" dot>
            Under Development
          </Badge>

          {/* Wrappers carry the spacing: the global `p, h1 { margin: 0 }` reset overrides margin utilities. */}
          <div className="mt-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-brand-red">
              {index} · Malveda Builders
            </p>
          </div>

          <div className="mt-4">
            <h1
              id="page-heading"
              className="text-4xl font-black uppercase tracking-tight text-text-primary sm:text-6xl"
            >
              {title}
              <span className="text-brand-red">.</span>
            </h1>
          </div>

          <div className="mx-auto mt-6 max-w-xl">
            <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
              {description}
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-md items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
            <span aria-hidden="true" className="h-px flex-1 bg-border-strong" />
            <span>This page is being drafted</span>
            <span aria-hidden="true" className="h-px flex-1 bg-border-strong" />
          </div>

          <Link
            href="/"
            className="mt-10 inline-flex h-12 items-center justify-center gap-2.5 rounded-lg border border-border bg-surface-card px-6 text-sm font-semibold text-text-primary shadow-xs transition-colors hover:border-brand-red hover:text-brand-red"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-4 w-4">
              <path d="M13 8H3M7 4 3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
