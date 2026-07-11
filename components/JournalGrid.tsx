"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export interface JournalCard {
  slug: string;
  title: string;
  excerpt: string;
  kind: "post" | "project";
  date: string;
  category?: string;
  image?: string;
  color: string;
}

export default function JournalGrid({ entries }: { entries: JournalCard[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    entries.forEach((e) => e.category && set.add(e.category));
    return ["All", ...Array.from(set)];
  }, [entries]);

  const [active, setActive] = useState("All");
  const shown =
    active === "All"
      ? entries
      : entries.filter((e) => e.category === active);

  return (
    <>
      {categories.length > 2 && (
        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                active === cat
                  ? "border-ink bg-ink text-canvas"
                  : "border-line text-muted hover:border-ink/40 hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2">
        {shown.map((entry) => (
          <Link
            key={entry.slug}
            href={`/journal/${entry.slug}`}
            className="group block"
          >
            <div
              className="relative flex aspect-[16/10] flex-col justify-between overflow-hidden rounded-3xl p-5 text-white transition-transform duration-300 group-hover:-translate-y-1"
              style={{
                backgroundImage: `linear-gradient(160deg, ${entry.color} 0%, #111 125%)`,
              }}
            >
              {entry.image && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${basePath}${entry.image}`}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/70"
                  />
                </>
              )}
              <div className="relative flex items-center justify-between [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
                {entry.category && (
                  <span className="rounded-full bg-black/25 px-3 py-1 text-xs font-medium backdrop-blur-sm [text-shadow:none]">
                    {entry.category}
                  </span>
                )}
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-white/90">
                  {entry.kind === "project" ? "Case study" : "Note"}
                </span>
              </div>
            </div>

            <h2 className="mt-4 font-display text-xl font-semibold transition-colors group-hover:text-accent">
              {entry.title}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {entry.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
