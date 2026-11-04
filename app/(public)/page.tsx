
export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-default">
      <section className="container-main flex min-h-screen flex-col items-center justify-center text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-brand">
          Architecture & Construction
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          MALVEDA <span className="text-brand">BUILDERS</span>
        </h1>

        <p className="mt-4 max-w-xl text-text-secondary">
          Building spaces with precision, quality, and craftsmanship.
        </p>

        <div className="mt-8 h-1 w-20 rounded-full bg-brand" />
      </section>
    </main>
  );
}
