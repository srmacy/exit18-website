"use client";

import { useEffect, useId, useRef, useState } from "react";

const BENCHLINE_ORIGIN = "https://app.mybenchline.com";
const MIN_H = 320;
const MAX_H = 4000;

type BenchlineToolEmbedProps = {
  src: string;
  title: string;
  dealerSlug?: string;
  tool: "service-request" | "pickup";
  defaultHeight?: number;
  className?: string;
};

/**
 * Embeds a Benchline customer tool iframe and listens for benchline:resize.
 */
export function BenchlineToolEmbed({
  src,
  title,
  dealerSlug = "exit18",
  tool,
  defaultHeight = 760,
  className = "",
}: BenchlineToolEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(defaultHeight);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== BENCHLINE_ORIGIN) return;
      const data = event.data;
      if (!data || data.type !== "benchline:resize") return;
      if (data.dealerSlug !== dealerSlug || data.tool !== tool) return;
      if (iframeRef.current?.contentWindow !== event.source) return;
      const next = Number(data.height);
      if (!Number.isFinite(next)) return;
      setHeight(Math.round(Math.min(MAX_H, Math.max(MIN_H, next))));
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [dealerSlug, tool]);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      loading="lazy"
      data-benchline-dealer={dealerSlug}
      data-benchline-tool={tool}
      className={`block w-full max-w-full rounded-2xl border-0 bg-transparent ${className}`}
      style={{ width: "100%", height, border: 0, borderRadius: 16 }}
    />
  );
}

type ExpandableMoreToolsProps = {
  children: React.ReactNode;
};

/** Smooth height expand/collapse used by homepage “More Ways We Can Help”. */
export function ExpandableMoreTools({ children }: ExpandableMoreToolsProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="mt-10">
      <button
        type="button"
        className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-black/[0.08] bg-white px-5 py-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-exit-green/40"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span>
          <span className="block font-display text-[clamp(1.25rem,2.5vw,1.5rem)] font-extrabold uppercase tracking-tight text-exit-dark">
            More Ways We Can Help
          </span>
          <span className="mt-1 block text-[13px] text-exit-gray">
            Additional online tools coming soon.
          </span>
        </span>
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-exit-green/25 bg-exit-green/10 text-exit-green transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        id={panelId}
        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className={`pt-5 transition-opacity duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
