import Link from "next/link";

interface SectionHeadingProps {
  /** Two-digit index matching the navbar order, e.g. "02". */
  index: string;
  eyebrow: string;
  title: string;
  id: string;
  intro?: string;
  link?: { href: string; label: string };
}

/**
 * Shared heading for homepage sections, echoing the hero:
 * red rule + eyebrow, heavy uppercase title with a red full stop.
 * Spacing lives on wrapper divs because global h2/p rules reset margins.
 */
export function SectionHeading({ index, eyebrow, title, id, intro, link }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-12 bg-brand-red" />
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-text-muted">
            <span className="font-mono text-brand-red">{index}</span>
            <span aria-hidden="true"> · </span>
            {eyebrow}
          </p>
        </div>

        <div className="mt-5">
          <h2
            id={id}
            className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-text-primary sm:text-5xl"
          >
            {title}
            <span className="text-brand-red">.</span>
          </h2>
        </div>

        {intro && (
          <div className="mt-5">
            <p className="text-base leading-relaxed text-text-secondary sm:text-lg">{intro}</p>
          </div>
        )}
      </div>

      {link && (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-2 self-start text-sm font-semibold text-text-primary transition-colors hover:text-brand-red lg:self-auto"
        >
          {link.label}
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}
    </div>
  );
}
