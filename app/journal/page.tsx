import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JournalGrid, { type JournalCard } from "@/components/JournalGrid";
import { getAllEntryMeta } from "@/lib/journal";
import { getProject } from "@/data/projects";

export const metadata: Metadata = {
  title: "Journal — Vinamra Pandey",
  description:
    "Project case studies and notes on building and shipping AI products end to end.",
};

export default function JournalIndex() {
  const cards: JournalCard[] = getAllEntryMeta().map((entry) => {
    const project = getProject(entry.slug);
    return {
      slug: entry.slug,
      title: entry.title,
      excerpt: entry.excerpt,
      kind: entry.kind,
      date: entry.date,
      category: project?.category,
      image: project?.image,
      color: project?.color ?? "#5B6CFF",
    };
  });

  return (
    <>
      <Nav />
      <main className="px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto w-full max-w-content">
          <p className="font-accent text-xl italic text-muted">Writing & work</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            Journal
          </h1>
          <p className="mt-4 max-w-md text-muted">
            Case studies of what I&apos;ve built and notes on shipping AI
            products end to end — brand, frontend, backend, and deployment.
          </p>

          {cards.length === 0 ? (
            <p className="mt-12 text-muted">Nothing here yet — check back soon.</p>
          ) : (
            <JournalGrid entries={cards} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
