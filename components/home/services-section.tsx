import type { ReactNode } from "react";
import { SectionHeading } from "./section-heading";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-6 w-6",
  "aria-hidden": true,
};

const SERVICES: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "Architectural Design",
    body: "Modern, functional spaces planned around how they will be used, from concept to design development.",
    icon: (
      <svg {...iconProps}>
        <path d="M3 21h18M5 21V9l7-5 7 5v12" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    title: "CAD Drafting & Blueprints",
    body: "Precise construction drawings and specifications that leave nothing to guesswork on site.",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="3" width="18" height="18" rx="1.5" />
        <path d="M3 9h18M9 21V9M14 13h4M14 17h4" />
      </svg>
    ),
  },
  {
    title: "Construction",
    body: "Structural build and site execution delivered with quality workmanship and a safety-first approach.",
    icon: (
      <svg {...iconProps}>
        <path d="M4 21V10l8-6 8 6v11" />
        <path d="M4 14h16M8 21v-7M16 21v-7M12 21v-7" />
      </svg>
    ),
  },
  {
    title: "Design & Build",
    body: "A single, accountable team for design and construction, for a smoother turnkey delivery.",
    icon: (
      <svg {...iconProps}>
        <path d="M14.7 6.3a4 4 0 0 0-5 5L4 17l3 3 5.7-5.7a4 4 0 0 0 5-5l-2.5 2.5-2.5-.5-.5-2.5z" />
      </svg>
    ),
  },
];

const SECTORS = ["Residential", "Commercial", "Industrial"];

export default function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-t border-border bg-surface/60 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal-on-scroll">
          <SectionHeading
            index="03"
            eyebrow="Services"
            title="What We Build"
            id="services-heading"
            intro="Architecture, drafting, and construction under one roof."
            link={{ href: "/services", label: "All services" }}
          />
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <li
              key={service.title}
              className="reveal-on-scroll group relative flex flex-col rounded-2xl border border-border bg-surface-card p-6 transition-colors duration-300 hover:border-brand-red/50"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red ring-1 ring-brand-red/20">
                  {service.icon}
                </span>
                <span className="font-mono text-xs text-text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-bold tracking-tight text-text-primary">{service.title}</h3>
              </div>
              <div className="mt-2">
                <p className="text-sm leading-relaxed text-text-secondary">{service.body}</p>
              </div>
              <span
                aria-hidden="true"
                className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-brand-red transition-transform duration-500 group-hover:scale-x-100"
              />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">
          <span className="text-text-secondary">Sectors</span>
          {SECTORS.map((sector) => (
            <span key={sector} className="flex items-center gap-6">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-red" />
              {sector}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
