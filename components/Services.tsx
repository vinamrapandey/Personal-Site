import Link from "next/link";

function Check({ dark }: { dark: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? "text-canvas" : "text-ink"}`}
      aria-hidden
    >
      <circle cx="10" cy="10" r="9" className="opacity-15" fill="currentColor" />
      <path
        d="M6 10.2l2.6 2.6L14 7.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function List({ items, dark }: { items: string[]; dark: boolean }) {
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm">
          <Check dark={dark} />
          <span className={dark ? "text-canvas/90" : ""}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const tileBase =
  "flex flex-col rounded-3xl border p-7 transition-transform duration-300 hover:-translate-y-1";

export default function Services() {
  return (
    <section id="services" className="px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto w-full max-w-content">
        <p className="text-center font-accent text-xl italic text-muted">
          How I work
        </p>
        <h2 className="mt-2 text-center font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
          <span className="text-muted">Let&apos;s build something</span>
          <br />
          <span className="text-ink">great together.</span>
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {/* Lead capability — wide dark tile */}
          <div
            className={`${tileBase} border-transparent bg-dark text-canvas md:col-span-2`}
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-canvas" />
              <h3 className="font-display text-lg font-semibold">
                Engineering & AI
              </h3>
            </div>
            <p className="mt-3 max-w-md text-sm text-canvas/60">
              The layer most solo builders outsource — I ship it end to end,
              from agentic systems to production deploys.
            </p>
            <List
              dark
              items={[
                "LLMs & Agentic Systems",
                "Prompt Engineering",
                "Python",
                "TypeScript / React / Next.js",
                "Flutter · Kotlin · Java",
                "Cloudflare · Firebase · Supabase",
              ]}
            />
            <span className="mt-8 font-accent text-2xl italic text-canvas/70">
              Build
            </span>
          </div>

          {/* Product & Strategy */}
          <div className={`${tileBase} border-line bg-surface text-ink`}>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-ink" />
              <h3 className="font-display text-lg font-semibold">
                Product & Strategy
              </h3>
            </div>
            <List
              dark={false}
              items={[
                "Product Management",
                "Roadmapping",
                "User Research",
                "Market Analysis",
              ]}
            />
            <span className="mt-8 font-accent text-2xl italic text-muted">
              Strategy
            </span>
          </div>

          {/* Design & Brand */}
          <div className={`${tileBase} border-line bg-surface text-ink`}>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-ink" />
              <h3 className="font-display text-lg font-semibold">
                Design & Brand
              </h3>
            </div>
            <List
              dark={false}
              items={[
                "Brand Identity",
                "UI Systems",
                "Figma",
                "Adobe Suite",
                "No-code (Framer)",
              ]}
            />
            <span className="mt-8 font-accent text-2xl italic text-muted">
              Brand
            </span>
          </div>

          {/* Outcome — wide statement tile linking to contact */}
          <Link
            href="#contact"
            className={`${tileBase} group items-start justify-between border-line bg-surface text-ink md:col-span-2 md:flex-row md:items-center`}
          >
            <p className="max-w-lg font-display text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
              One person across every layer — brand, product, engineering, and
              deployment.
            </p>
            <span className="mt-4 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-opacity group-hover:opacity-90 md:mt-0">
              Start a project ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
