"use client";

import { useEffect, useState } from "react";

// The repo the admin commits posts into. Update if the repo is renamed.
const REPO_OWNER = "vinamrapandey";
const REPO_NAME = "Vinny-Portfolio";
const BRANCH = "main";

type Status =
  | { type: "idle" }
  | { type: "working" }
  | { type: "ok"; msg: string }
  | { type: "err"; msg: string };

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// UTF-8 safe base64 for the GitHub contents API.
function toBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

const fieldClass =
  "mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink/40";

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle" });

  useEffect(() => {
    const saved = localStorage.getItem("gh_token");
    if (saved) setToken(saved);
  }, []);

  function saveToken(value: string) {
    setToken(value);
    localStorage.setItem("gh_token", value);
  }

  function clearToken() {
    setToken("");
    localStorage.removeItem("gh_token");
  }

  async function publish() {
    const slug = slugify(title);
    if (!token) return setStatus({ type: "err", msg: "Paste a GitHub token first." });
    if (!slug) return setStatus({ type: "err", msg: "A title is required." });
    if (!body.trim()) return setStatus({ type: "err", msg: "The post body is empty." });

    setStatus({ type: "working" });

    try {
      const date = new Date().toISOString().slice(0, 10);
      const tagList = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const fileContent = [
        "---",
        `title: ${JSON.stringify(title)}`,
        `date: "${date}"`,
        `excerpt: ${JSON.stringify(excerpt)}`,
        `tags: [${tagList.map((t) => JSON.stringify(t)).join(", ")}]`,
        "---",
        "",
        body.trim(),
        "",
      ].join("\n");

      const pathInRepo = `content/journal/${slug}.md`;
      const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${pathInRepo}`;
      const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      };

      // If a post with this slug exists, we need its sha to overwrite it.
      let sha: string | undefined;
      const existing = await fetch(`${apiUrl}?ref=${BRANCH}`, { headers });
      if (existing.ok) {
        const json = await existing.json();
        sha = json.sha;
      }

      const res = await fetch(apiUrl, {
        method: "PUT",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `${sha ? "Update" : "Add"} blog post: ${title}`,
          content: toBase64(fileContent),
          branch: BRANCH,
          ...(sha ? { sha } : {}),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? `GitHub API error ${res.status}`);
      }

      setStatus({
        type: "ok",
        msg: `Published "${title}". The deploy is running — it'll be live at /journal/${slug} in about a minute.`,
      });
      setTitle("");
      setExcerpt("");
      setTags("");
      setBody("");
    } catch (err) {
      setStatus({
        type: "err",
        msg: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }

  return (
    <main className="min-h-screen px-6 py-16 sm:px-10">
      <div className="mx-auto w-full max-w-2xl">
        <p className="font-accent text-xl italic text-muted">Private</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Write a post
        </h1>
        <p className="mt-3 text-sm text-muted">
          Publishing commits a markdown file to <code>{REPO_NAME}</code> on{" "}
          <code>{BRANCH}</code> and triggers a deploy. Your token is stored only
          in this browser.
        </p>

        {/* Token */}
        <div className="mt-8 rounded-2xl border border-line bg-surface p-5">
          <label htmlFor="token" className="text-sm font-medium">
            GitHub token
          </label>
          <p className="mt-1 text-xs text-muted">
            Fine-grained token with <strong>Contents: Read and write</strong> on
            this repo. Create one at github.com/settings/tokens.
          </p>
          <div className="mt-3 flex gap-2">
            <input
              id="token"
              type="password"
              value={token}
              onChange={(e) => saveToken(e.target.value)}
              placeholder="github_pat_…"
              className={`${fieldClass} mt-0 flex-1`}
            />
            <button
              type="button"
              onClick={clearToken}
              className="rounded-xl border border-line px-4 text-sm text-muted transition-colors hover:text-ink"
            >
              Clear
            </button>
          </div>
          <p className="mt-2 text-xs text-muted">
            {token ? "Token saved in this browser." : "No token saved."}
          </p>
        </div>

        {/* Post fields */}
        <div className="mt-6 space-y-5">
          <div>
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              className={fieldClass}
            />
            {title && (
              <p className="mt-1.5 text-xs text-muted">
                URL: /journal/{slugify(title)}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="excerpt" className="text-sm font-medium">
              Excerpt
            </label>
            <input
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="One-line summary shown on the journal list"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="tags" className="text-sm font-medium">
              Tags
            </label>
            <input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="comma, separated, tags"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="body" className="text-sm font-medium">
              Body (Markdown)
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={16}
              placeholder={"## A heading\n\nWrite your post in Markdown…"}
              className={`${fieldClass} font-mono`}
            />
          </div>

          <button
            type="button"
            onClick={publish}
            disabled={status.type === "working"}
            className="w-full rounded-xl bg-ink px-6 py-3.5 text-sm font-medium text-canvas transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {status.type === "working" ? "Publishing…" : "Publish to live site"}
          </button>

          {status.type === "ok" && (
            <p className="text-sm text-green-600">{status.msg}</p>
          )}
          {status.type === "err" && (
            <p className="text-sm text-accent">{status.msg}</p>
          )}
        </div>
      </div>
    </main>
  );
}
