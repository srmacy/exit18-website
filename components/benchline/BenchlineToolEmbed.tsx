"use client";

import { useEffect, useRef, useState } from "react";

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
