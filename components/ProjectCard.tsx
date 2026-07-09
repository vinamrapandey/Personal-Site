import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const card = (
    <article className="group">
      {/* Poster placeholder — gradient stands in for a product screenshot. */}
      <div
        className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-3xl p-6 text-white"
        style={{
          backgroundImage: `linear-gradient(160deg, ${project.color} 0%, #111 125%)`,
        }}
      >
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
            {project.category}
          </span>
          <span className="text-xs text-white/70">{project.shipped}</span>
        </div>

        <div>
          <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.name}
          </h3>
          <p className="mt-2 text-sm text-white/80">{project.metric}</p>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
        />
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
