import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "./section-heading";

// Placeholder tiles until real project photography and details are available.
const CATEGORIES = [
  { label: "Residential", code: "RES" },
  { label: "Commercial", code: "COM" },
  { label: "Industrial", code: "IND" },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-t border-border py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal-on-scroll">
          <SectionHeading
            index="04"
            eyebrow="Projects"
            title="Our Portfolio"
            id="projects-heading"
            intro="A curated selection of our residential, commercial, and industrial work is being prepared."
            link={{ href: "/projects", label: "View projects" }}
          />
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {CATEGORIES.map((category) => (
            <li
              key={category.code}
              className="reveal-on-scroll relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface-card p-6 sm:aspect-[4/3] md:aspect-[4/5]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-blueprint-grid-dense opacity-50 mask-[radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
              />

              <div className="relative flex items-center justify-between">
                <span className="font-mono text-xs font-semibold tracking-wider text-text-muted">
                  {category.code}-00
                </span>
                <Badge variant="warning" size="sm" dot>
                  Coming Soon
                </Badge>
              </div>

              <div className="relative">
                <span aria-hidden="true" className="mb-4 block h-px w-10 bg-brand-red" />
                <h3 className="text-2xl font-black uppercase tracking-tight text-text-primary">
                  {category.label}
                </h3>
                <div className="mt-1">
                  <p className="text-sm text-text-secondary">Projects being curated</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
