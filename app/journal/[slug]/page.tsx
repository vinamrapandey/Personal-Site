import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CaseStudyViewer from "@/components/CaseStudyViewer";
import ArticleBody from "@/components/ArticleBody";
import { getAllEntryMeta, getAllSlugs, getEntry } from "@/lib/journal";
import { getProject } from "@/data/projects";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const entry = await getEntry(params.slug);
  if (!entry) return {};
  const image = getProject(entry.slug)?.image;
  return {
    title: `${entry.title} — Vinamra Pandey`,
    description: entry.excerpt,
    openGraph: {
      title: `${entry.title} — Vinamra Pandey`,
      description: entry.excerpt,
      type: "article",
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${entry.title} — Vinamra Pandey`,
      description: entry.excerpt,
      images: image ? [image] : undefined,
    },
  };
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default async function EntryPage({
  params,
}: {
  params: { slug: string };
}) {
  const entry = await getEntry(params.slug);
  if (!entry) notFound();

  const project = getProject(entry.slug);
  const cover = project?.image;
  const stack = project?.stack ?? entry.tags;

  // If the article opens with the same image we show as the hero banner,
  // drop that image from the body so it isn't shown twice (keeping any caption).
  let bodyHtml = entry.contentHtml;
  if (cover) {
    bodyHtml = bodyHtml
      .replace(new RegExp(`<img[^>]*src="${escapeRegExp(cover)}"[^>]*>`), "")
      .replace(/^\s*<p>\s*<\/p>\s*/, "");
  }

  // Previous / next within the journal (sorted newest first).
  const all = getAllEntryMeta();
  const idx = all.findIndex((e) => e.slug === entry.slug);
  const newer = idx > 0 ? all[idx - 1] : null;
  const older = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;

  const hasLinks = entry.liveUrl || entry.repoUrl;

  return (
    <>
      <Nav />
      <main className="px-6 py-16 sm:px-10 sm:py-24">
        <article className="mx-auto w-full max-w-2xl">
          <Link
            href="/journal"
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            ← Journal
          </Link>

          <span className="mt-6 block text-xs font-medium uppercase tracking-[0.14em] text-muted">
            {entry.kind === "project" ? "Case study" : "Note"}
          </span>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {entry.title}
          </h1>
          <p className="mt-3 text-sm text-muted">
            {entry.date} · {entry.readingMinutes} min read
          </p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            {entry.excerpt}
          </p>

          {/* Hero banner */}
          {cover && (
            <div className="mt-8 overflow-hidden rounded-3xl border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cover}
                alt={`${entry.title} cover`}
                className="max-h-[26rem] w-full object-cover"
              />
            </div>
          )}

          {/* Facts panel */}
          {project && (
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 rounded-2xl border border-line bg-surface p-6 sm:grid-cols-4">
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                  Category
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-ink">
                  {project.category}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                  Status
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-ink">
                  {project.status}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                  Role
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-ink">
                  Solo — brand, product &amp; engineering
                </dd>
              </div>
              <div className="col-span-2 sm:col-span-4">
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                  Stack
                </dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          )}

          {/* Links + case study */}
          {(hasLinks || entry.pdf) && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {entry.pdf && (
                <CaseStudyViewer pdf={entry.pdf} title={entry.title} />
              )}
              {entry.liveUrl && (
                <a
                  href={entry.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/40"
                >
                  Visit site ↗
                </a>
              )}
              {entry.repoUrl && (
                <a
                  href={entry.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/40"
                >
                  View on GitHub ↗
                </a>
              )}
            </div>
          )}

          <ArticleBody html={bodyHtml} />

          {/* Closing CTA */}
          <div className="mt-16 flex flex-col items-start gap-4 rounded-3xl bg-dark p-8 text-canvas sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <p className="font-accent text-lg italic text-white/60">
                Have something in mind?
              </p>
              <p className="mt-1 font-display text-2xl font-semibold tracking-tight">
                Let&apos;s build it together.
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-canvas px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
            >
              Start a project ↗
            </Link>
          </div>

          {/* Previous / next */}
          {(newer || older) && (
            <nav className="mt-12 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
              {older ? (
                <Link
                  href={`/journal/${older.slug}`}
                  className="group rounded-2xl border border-line p-5 transition-colors hover:border-ink/30"
                >
                  <span className="text-xs text-muted">← Previous</span>
                  <p className="mt-1 font-display text-lg font-semibold transition-colors group-hover:text-accent">
                    {older.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
              {newer && (
                <Link
                  href={`/journal/${newer.slug}`}
                  className="group rounded-2xl border border-line p-5 text-right transition-colors hover:border-ink/30 sm:col-start-2"
                >
                  <span className="text-xs text-muted">Next →</span>
                  <p className="mt-1 font-display text-lg font-semibold transition-colors group-hover:text-accent">
                    {newer.title}
                  </p>
                </Link>
              )}
            </nav>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
