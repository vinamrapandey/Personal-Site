export default function Hero() {
  return (
    <section
      id="hero"
      className="px-6 pb-16 pt-16 sm:px-10 sm:pb-24 sm:pt-24"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
          </span>
          Available — open for new work
        </span>

        <h1 className="mt-7 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          <span className="text-muted">Seven products.</span>{" "}
          <span className="text-ink">One person.</span>{" "}
          <span className="text-muted">Every</span>{" "}
          <span className="text-ink">layer.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
          Product manager, brand strategist, AI consultant, and full-stack
          builder. I take AI products from blueprint to shipped — alone.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#contact"
            className="group flex items-center gap-1.5 rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas transition-opacity hover:opacity-90"
          >
            Get in touch
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </a>
          <a
            href="#work"
            className="rounded-full border border-line bg-surface px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/30"
          >
            See the work
          </a>
        </div>
      </div>
    </section>
  );
}
