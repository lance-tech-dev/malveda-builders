/**
 * Malveda Builders logo: red "M" with skyline bars, divider, and wordmark.
 * The mark is vector so it stays sharp; the wordmark is live text so it
 * follows the light/dark theme.
 */

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="60 70 540 460"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Skyline bars behind the M */}
      <path d="M225 150 L340 78 L340 330 L225 330 Z" fill="#3b4048" />
      <path d="M360 128 L410 160 L410 330 L360 330 Z" fill="#8b919a" />
      <path d="M420 180 L457 206 L457 330 L420 330 Z" fill="#646a73" />
      <path d="M418 430 L457 404 L457 520 L418 520 Z" fill="#4a5059" />

      {/* M legs (shaded facets) */}
      <path d="M68 215 L185 293 L185 520 L68 520 Z" fill="#c4111b" />
      <path d="M68 300 L185 378 L185 520 L68 520 Z" fill="#9e0d14" opacity="0.55" />
      <path d="M475 293 L588 215 L588 520 L475 520 Z" fill="#b30f18" />
      <path d="M475 378 L588 300 L588 520 L475 520 Z" fill="#8a0b11" opacity="0.55" />

      {/* M chevron */}
      <path d="M68 215 L330 390 L588 215 L588 300 L330 475 L68 300 Z" fill="#e3101c" />
    </svg>
  );
}

const LOGO_SIZES = {
  md: { mark: "h-9", divider: "h-8", name: "text-[17px]", tagline: "mt-1 text-[9px]" },
  lg: { mark: "h-12", divider: "h-11", name: "text-[23px]", tagline: "mt-1.5 text-[11px]" },
} as const;

export function BrandLogo({
  className = "",
  size = "md",
  tagline = "Builders",
  textClassName = "",
}: {
  className?: string;
  size?: keyof typeof LOGO_SIZES;
  /** Extra classes for the divider + wordmark (e.g. to fade them out). */
  textClassName?: string;
  /** Second line under MALVEDA, letter-spaced to the wordmark's width. */
  tagline?: string;
}) {
  const s = LOGO_SIZES[size];

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <BrandMark className={`${s.mark} w-auto shrink-0`} />
      <span className={`flex items-center gap-3 ${textClassName}`}>
        <span aria-hidden="true" className={`${s.divider} w-px shrink-0 bg-text-primary/70`} />
        <span className="flex flex-col leading-none">
          <span className={`${s.name} font-black tracking-[0.06em] text-text-primary transition-colors group-hover:text-brand-red`}>
            MALVEDA
          </span>
          <span className="sr-only">{tagline}</span>
          <span aria-hidden="true" className={`${s.tagline} flex justify-between font-bold text-text-secondary`}>
            {tagline.toUpperCase().split("").map((letter, i) => (
              <span key={i}>{letter}</span>
            ))}
          </span>
        </span>
      </span>
    </span>
  );
}
