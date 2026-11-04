import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* ========================================================
          HERO SECTION
      ======================================================== */}
      <section
        id="overview"
        className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8"
      >
        {/* Background Blueprint Grid Pattern */}
        <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-35 mask-[radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" />

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="brand" size="md">
              Architecture & Construction
            </Badge>
            <span className="h-1.5 w-1.5 rounded-full bg-border-strong hidden sm:inline-block" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted hidden sm:inline-block">
              Precision Drafting & Structural Build
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl leading-[1.08] text-text-primary">
            Building spaces with <span className="text-brand-red">precision</span>, quality, and craftsmanship.
          </h1>

          {/* Subtitle */}
          {/* Wrapper handles centering: the global `p { margin: 0 }` overrides mx-auto on <p>. */}
          <div className="mx-auto mt-6 max-w-2xl">
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal">
              Malveda Builders integrates modern architectural design, meticulous CAD blueprints, and turnkey construction execution to create enduring residential, commercial, and industrial structures.
            </p>
          </div>

          {/* Blueprint Visual Drafting Graphic Card */}
          <div className="mt-12 relative mx-auto max-w-4xl rounded-2xl border border-border bg-surface-card p-4 sm:p-6 shadow-elevated">
            <div className="flex items-center justify-between border-b border-border pb-3 text-[11px] font-mono text-text-muted">
              <div className="flex items-center gap-3">
                <span className="flex h-2.5 w-2.5 rounded-full bg-brand-red" />
                <span className="font-bold tracking-wider text-text-primary">
                  MALVEDA BUILDERS · BLUEPRINT SPECIFICATION
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-4">
                <span>SCALE: 1:100 METRIC</span>
                <span>·</span>
                <span>CODE: NSCP-2026</span>
              </div>
            </div>

            {/* Technical Drafting Isometric Schema */}
            <div className="relative mt-4 h-48 sm:h-64 w-full rounded-xl border border-border/80 bg-surface/60 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-blueprint-grid-dense opacity-40" />

              {/* Architectural Drafting Graphic Lines */}
              <svg
                viewBox="0 0 600 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full max-w-xl text-border-strong dark:text-border-strong"
              >
                {/* Structural Grid Crosshairs */}
                <line x1="50" y1="20" x2="50" y2="220" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="200" y1="20" x2="200" y2="220" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="400" y1="20" x2="400" y2="220" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="550" y1="20" x2="550" y2="220" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />

                <line x1="20" y1="60" x2="580" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="20" y1="180" x2="580" y2="180" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />

                {/* Building Elevation Outline */}
                <rect x="120" y="70" width="360" height="130" stroke="currentColor" strokeWidth="2" className="text-text-primary" />
                <line x1="120" y1="135" x2="480" y2="135" stroke="currentColor" strokeWidth="1.5" />
                <line x1="300" y1="70" x2="300" y2="200" stroke="currentColor" strokeWidth="1.5" />

                {/* Structural Roof Framing Angle */}
                <polygon points="100,70 300,25 500,70" stroke="var(--brand-red)" strokeWidth="2" fill="none" />
                <circle cx="300" cy="25" r="4" fill="var(--brand-red)" />

                {/* Dimension Arrows */}
                <line x1="120" y1="215" x2="480" y2="215" stroke="var(--brand-red)" strokeWidth="1.5" />
                <polygon points="120,215 128,212 128,218" fill="var(--brand-red)" />
                <polygon points="480,215 472,212 472,218" fill="var(--brand-red)" />
                <text x="300" y="212" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="monospace">
                  L = 24.00 M (SPAN)
                </text>
              </svg>

              {/* Floating Blueprint Markers */}
              <div className="absolute left-4 bottom-4 rounded bg-surface-card border border-border px-2.5 py-1 text-[10px] font-mono text-text-secondary shadow-xs">
                COORD: 14°12′N 121°02′E
              </div>

              <div className="absolute right-4 top-4 rounded bg-brand-red/10 border border-brand-red/30 px-2.5 py-1 text-[10px] font-mono text-brand-red font-semibold">
                REV: ARCH-04 FINAL
              </div>
            </div>

            {/* 4 Quick Verification Badges */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-left sm:grid-cols-4 sm:gap-4 border-t border-border pt-4 text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                <span className="font-medium">Integrated Design-Build</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                <span className="font-medium">Millimeter CAD Precision</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                <span className="font-medium">Licensed Civil Engineers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                <span className="font-medium">OSHC Zero-Harm Safety</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
