import Link from "next/link";

const DISCIPLINES = ["Architecture", "Construction", "Design & Build"];

export default function HomeHero() {
  return (
    <section
      id="overview"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Blueprint grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-blueprint-grid opacity-35 mask-[radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
      />

      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-28 sm:px-6 lg:px-8">
        <div className="max-w-5xl">
          {/* Brand eyebrow */}
          <div className="hero-reveal flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-12 bg-brand-red" />
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-text-muted">
              Malveda Builders
            </p>
          </div>

          {/* Headline — wrapper carries the spacing because the global `h1 { margin: 0 }` reset overrides margin utilities. */}
          <div className="hero-reveal mt-6 [animation-delay:120ms]">
            <h1
              id="hero-heading"
              className="text-[2.6rem] font-black uppercase leading-[0.95] tracking-[-0.03em] text-text-primary sm:text-6xl lg:text-[5.5rem]"
            >
              <span className="block">
                Building Visions<span className="text-brand-red">.</span>
              </span>
              <span className="block text-text-secondary">
                Creating Legacies<span className="text-brand-red">.</span>
              </span>
            </h1>
          </div>

          {/* Supporting copy */}
          <div className="hero-reveal mt-7 max-w-xl [animation-delay:240ms]">
            <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
              Delivering quality construction and architectural solutions through
              craftsmanship, innovation, and commitment to excellence.
            </p>
          </div>

          {/* Calls to action */}
          <div className="hero-reveal mt-10 flex flex-col gap-3 sm:flex-row sm:items-center [animation-delay:360ms]">
            <Link
              href="/projects"
              className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-lg bg-brand-red px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-red-dark"
            >
              Explore Our Projects
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="none"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-surface-card px-6 text-sm font-semibold text-text-primary shadow-xs transition-colors hover:border-brand-red hover:text-brand-red"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Discipline strip */}
        <div className="hero-reveal mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6 sm:mt-20 [animation-delay:480ms]">
          {DISCIPLINES.map((item, i) => (
            <span key={item} className="flex items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">
              {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-red" />}
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
