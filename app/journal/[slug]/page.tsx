import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CaseStudyViewer from "@/components/CaseStudyViewer";
import { getAllSlugs, getEntry } from "@/lib/journal";

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
  return {
    title: `${entry.title} — Vinamra Pandey`,
    description: entry.excerpt,
  };
}

export default async function EntryPage({
  params,
}: {
  params: { slug: string };
}) {
  const entry = await getEntry(params.slug);
  if (!entry) notFound();

  const hasLinks = entry.liveUrl || entry.repoUrl;

  return (
    <>
      <Nav />
      <main className="px-6 py-20 sm:px-10 sm:py-28">
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
          <p className="mt-3 text-sm text-muted">{entry.date}</p>

          {entry.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Links + case study — the action row for project entries. */}
          {(hasLinks || entry.pdf) && (
            <div className="mt-8 flex flex-wrap items-center gap-3 border-y border-line py-6">
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

          <div
            className="prose-blog mt-10"
            dangerouslySetInnerHTML={{ __html: entry.contentHtml }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
