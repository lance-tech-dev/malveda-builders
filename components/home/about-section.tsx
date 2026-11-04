import { SectionHeading } from "./section-heading";

const PILLARS = [
  {
    title: "Integrated Design-Build",
    body: "One team carries a project from first sketch to final turnover, so what is drawn is what gets built.",
  },
  {
    title: "Millimeter CAD Precision",
    body: "Detailed CAD blueprints and specifications guide every phase of construction.",
  },
  {
    title: "Licensed Civil Engineers",
    body: "Structural work is planned and supervised by licensed civil engineers.",
  },
  {
    title: "OSHC Zero-Harm Safety",
    body: "Safety on site is planned in from day one, aligned with OSHC standards.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-border py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal-on-scroll">
          <SectionHeading
            index="02"
            eyebrow="About Us"
            title="Built on Precision"
            id="about-heading"
            intro="Malveda Builders integrates modern architectural design, meticulous CAD blueprints, and turnkey construction execution to create enduring residential, commercial, and industrial structures."
            link={{ href: "/about", label: "More about us" }}
          />
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, i) => (
            <li key={pillar.title} className="reveal-on-scroll bg-surface-card p-6 sm:p-8">
              <span className="font-mono text-xs font-semibold text-brand-red">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mt-4">
                <h3 className="text-base font-bold tracking-tight text-text-primary">{pillar.title}</h3>
              </div>
              <div className="mt-2">
                <p className="text-sm leading-relaxed text-text-secondary">{pillar.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
