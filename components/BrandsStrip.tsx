"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { siteContent } from "@/content/siteContent";
import { cn } from "@/lib/cn";

export function BrandsStrip() {
  const { brands } = siteContent;
  const rowRef = useRef<HTMLDivElement>(null);
  const [hasAnimatedDealerButtons, setHasAnimatedDealerButtons] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let delayTimeoutId: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        delayTimeoutId = setTimeout(() => {
          setHasAnimatedDealerButtons(true);
        }, 4000);
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (delayTimeoutId !== undefined) clearTimeout(delayTimeoutId);
    };
  }, []);

  const pillClass =
    "dealer-attention-pill group relative flex h-10 w-full items-center justify-center overflow-hidden rounded-[20px] border border-white/12 px-4 py-1.5 text-center text-xs font-bold uppercase tracking-wide text-white/50 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400/50 hover:bg-emerald-400/10 hover:text-emerald-100 hover:shadow-[0_8px_24px_rgba(16,185,129,0.12)]";

  const pillContent = (name: string) => (
    <span className="relative z-10 inline-flex items-center justify-center gap-2">
      {name}
      <span
        className="dealer-attention-arrow opacity-0 -translate-x-1 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
        aria-hidden
      >
        →
      </span>
    </span>
  );

  const { stripBrandHrefs } = brands;

  return (
    <div ref={rowRef} className="w-full bg-exit-dark px-5 py-7 md:px-[60px]">
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
        <span className="flex h-full shrink-0 items-center whitespace-nowrap text-[10px] font-bold uppercase tracking-[2px] text-white/30">
          {brands.stripLabel}
        </span>
        <div
          className={cn(
            "grid w-full grid-cols-2 items-center gap-3 sm:flex-1 sm:grid-cols-3 md:grid-cols-5",
            hasAnimatedDealerButtons && "authorized-dealer-attention-active",
          )}
        >
          {brands.names.map((name, index) => {
            const href = stripBrandHrefs[name];

            const style =
              {
                "--dealer-pill-delay": `${index * 120}ms`,
              } as CSSProperties;

            return href ? (
              <Link key={name} href={href} className={`${pillClass} no-underline`} style={style}>
                {pillContent(name)}
              </Link>
            ) : (
              <span key={name} className={pillClass} style={style}>
                {pillContent(name)}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
