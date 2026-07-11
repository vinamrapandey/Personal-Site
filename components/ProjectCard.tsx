import Link from "next/link";
import type { Project } from "@/data/projects";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function ProjectCard({ project }: { project: Project }) {
  const card = (
    <article className="group">
      {/* Poster: the product's hero screenshot when available, else a gradient. */}
      <div
        className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-3xl p-6 text-white"
        style={{
          backgroundImage: `linear-gradient(160deg, ${project.color} 0%, #111 125%)`,
        }}
      >
        {project.image && (
          <>
            <img
              src={`${basePath}${project.image}`}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Dark overlay keeps the category, version, and title legible. */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/85"
            />
          </>
        )}

        <div className="relative flex items-center justify-between">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
            {project.category}
          </span>
          <span className="text-xs text-white/80">{project.shipped}</span>
        </div>

        <div className="relative [text-shadow:0_1px_14px_rgba(0,0,0,0.45)]">
          <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.name}
          </h3>
          <p className="mt-2 text-sm text-white/85">{project.metric}</p>
        </div>

        {!project.image && (
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
          />
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h4 className="font-display text-lg font-semibold">{project.name}</h4>
        <span className="flex items-center gap-1 text-sm text-muted transition-colors group-hover:text-ink">
          {project.status}
        </span>
      </div>
      <p className="mt-1 text-sm leading-relaxed text-muted">
        {project.tagline}
      </p>
    </article>
  );

  // Each card opens the project's case study in the journal.
  return (
    <Link href={`/journal/${project.slug}`} className="block">
      {card}
    </Link>
  );
}
