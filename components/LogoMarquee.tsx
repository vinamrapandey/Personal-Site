// The tools these products are actually built with — signals range without
// duplicating the work grid below.
const tech = [
  "Next.js",
  "React",
  "TypeScript",
  "Flutter",
  "Dart",
  "Python",
  "Cloudflare Workers",
  "Firebase",
  "Supabase",
  "Kotlin",
  "Java",
  "Tailwind CSS",
  "ONNX",
  "C2PA",
  "Telegram Bot API",
];

export default function LogoMarquee() {
  // Duplicate so the marquee can loop seamlessly at -50%.
  const items = [...tech, ...tech];

  return (
    <section
      aria-label="Built with"
      className="marquee-hover overflow-hidden border-y border-line bg-surface/40 py-6"
    >
      <p className="mb-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted">
        Built with
      </p>
      <div className="flex w-max animate-marquee items-center gap-3 px-2">
        {items.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex items-center gap-2.5 rounded-full border border-line bg-surface px-5 py-2.5"
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
            />
            <span className="whitespace-nowrap text-sm font-medium text-ink">
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
