import Link from "next/link";

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-border py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal-on-scroll relative overflow-hidden rounded-3xl border border-border bg-surface-card px-6 py-16 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-40 mask-[radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
          />
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-brand-red" />

          <div className="relative mx-auto max-w-2xl">
            <div className="flex items-center justify-center gap-4">
              <span aria-hidden="true" className="h-px w-12 bg-brand-red" />
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-text-muted">
                <span className="font-mono text-brand-red">05</span>
                <span aria-hidden="true"> · </span>
                Contact
              </p>
              <span aria-hidden="true" className="h-px w-12 bg-brand-red" />
            </div>

            <div className="mt-6">
              <h2
                id="contact-heading"
                className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-text-primary sm:text-6xl"
              >
                Let&apos;s Build
                <span className="block text-text-secondary">
                  What&apos;s Next<span className="text-brand-red">.</span>
                </span>
              </h2>
            </div>

            <div className="mx-auto mt-6 max-w-lg">
              <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
                Planning a residential, commercial, or industrial project? Tell us
                about it and our team will help you take the next step.
              </p>
            </div>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-lg bg-brand-red px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-red-dark"
              >
                Get in Touch
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
                href="/services"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-surface-card px-6 text-sm font-semibold text-text-primary shadow-xs transition-colors hover:border-brand-red hover:text-brand-red"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
