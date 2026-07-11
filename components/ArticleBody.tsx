"use client";

import { useCallback, useEffect, useState } from "react";

// Renders the case-study HTML and turns every screenshot into a click-to-zoom
// image: clicking opens it full-size in a lightbox overlay.
export default function ArticleBody({ html }: { html: string }) {
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);

  const onClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG") {
      const img = target as HTMLImageElement;
      setZoom({ src: img.currentSrc || img.src, alt: img.alt });
    }
  }, []);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom]);

  return (
    <>
      <div
        className="prose-blog prose-zoom mt-12"
        onClick={onClick}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-10"
          onClick={() => setZoom(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={zoom.src}
            alt={zoom.alt}
            className="max-h-full max-w-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            aria-label="Close"
            onClick={() => setZoom(null)}
            className="absolute right-4 top-4 rounded-full border border-white/30 px-3 py-1.5 text-xs text-white/90 transition-colors hover:border-white hover:text-white"
          >
            Close ✕
          </button>
        </div>
      )}
    </>
  );
}
