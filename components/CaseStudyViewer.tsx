"use client";

import { useEffect, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function CaseStudyViewer({
  pdf,
  title,
}: {
  pdf: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const url = `${basePath}/case-studies/${pdf}`;

  // Lock body scroll and allow Escape to close while the modal is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-opacity hover:opacity-90"
      >
        Read the full case study
        <span aria-hidden>→</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} case study`}
          className="fixed inset-0 z-[100] flex flex-col bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div className="mx-auto flex h-full w-full max-w-5xl flex-col p-4 sm:p-8">
            <div
              className="flex items-center justify-between gap-4 pb-3"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="truncate text-sm font-medium text-white">
                {title} — Case study
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/30 px-4 py-1.5 text-xs text-white/90 transition-colors hover:border-white hover:text-white"
                >
                  Open in new tab ↗
                </a>
                <a
                  href={url}
                  download
                  className="rounded-full border border-white/30 px-4 py-1.5 text-xs text-white/90 transition-colors hover:border-white hover:text-white"
                >
                  Download ↓
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="rounded-full border border-white/30 px-3 py-1.5 text-xs text-white/90 transition-colors hover:border-white hover:text-white"
                >
                  Close ✕
                </button>
              </div>
            </div>

            <object
              data={url}
              type="application/pdf"
              className="min-h-0 w-full flex-1 rounded-xl bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-full flex-col items-center justify-center gap-3 rounded-xl bg-white p-8 text-center">
                <p className="text-sm text-ink">
                  Your browser can’t display the PDF inline.
                </p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas"
                >
                  Open the case study ↗
                </a>
              </div>
            </object>
          </div>
        </div>
      )}
    </>
  );
}
