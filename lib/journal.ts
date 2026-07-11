import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";

const JOURNAL_DIR = path.join(process.cwd(), "content", "journal");

// A journal entry is either a written "post" (a note) or a "project" case study.
// Project entries carry extra fields: repo/live links and an optional case-study PDF.
export type EntryKind = "post" | "project";

export interface EntryMeta {
  slug: string;
  title: string;
  kind: EntryKind;
  date: string;
  excerpt: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  // Filename of a case-study PDF placed in public/case-studies/, e.g. "swovid.pdf".
  pdf?: string;
}

export interface Entry extends EntryMeta {
  contentHtml: string;
}

function listFiles(): string[] {
  if (!fs.existsSync(JOURNAL_DIR)) return [];
  return fs.readdirSync(JOURNAL_DIR).filter((f) => f.endsWith(".md"));
}

function toMeta(slug: string, data: Record<string, unknown>): EntryMeta {
  return {
    slug,
    title: (data.title as string) ?? slug,
    kind: (data.kind as EntryKind) === "project" ? "project" : "post",
    date: (data.date as string) ?? "",
    excerpt: (data.excerpt as string) ?? "",
    tags: (data.tags as string[]) ?? [],
    liveUrl: (data.liveUrl as string) || undefined,
    repoUrl: (data.repoUrl as string) || undefined,
    pdf: (data.pdf as string) || undefined,
  };
}

function readMeta(file: string): EntryMeta {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(JOURNAL_DIR, file), "utf8");
  const { data } = matter(raw);
  return toMeta(slug, data);
}

export function getAllEntryMeta(): EntryMeta[] {
  return listFiles()
    .map(readMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllSlugs(): string[] {
  return listFiles().map((f) => f.replace(/\.md$/, ""));
}

// Group runs of 2+ back-to-back image paragraphs into a side-by-side row,
// so consecutive screenshots sit next to each other instead of stacking.
function groupImageRows(htmlStr: string): string {
  return htmlStr.replace(
    /(?:<p>\s*<img[^>]*>\s*<\/p>\s*){2,}/g,
    (run) => {
      const imgs = run.match(/<img[^>]*>/g) ?? [];
      return `<div class="img-row">${imgs.join("")}</div>`;
    },
  );
}

export async function getEntry(slug: string): Promise<Entry | null> {
  const file = path.join(JOURNAL_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  // gfm enables tables/strikethrough; allowDangerousHtml lets embedded <img>
  // and raw HTML in entries pass through.
  const processed = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .process(content);
  return {
    ...toMeta(slug, data),
    contentHtml: groupImageRows(processed.toString()),
  };
}
