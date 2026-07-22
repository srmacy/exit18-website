"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { siteContent } from "@/content/siteContent";
import { cn } from "@/lib/cn";

/**
 * Authorized Dealer brand marks.
 *
 * Current `/public/images/*-logo.png` files are NOT suitable for monochrome dark capsules
 * (baked white/color backgrounds, no clean transparent wordmarks, some are JPEG).
 * Until clean official transparent SVG/PNG wordmarks are added under `/public/brands/`,
 * render accessible text fallbacks so white rectangles do not appear.
 */
type DealerBrandLogo = {
  name: string;
  href?: string;
  /** Set when a clean transparent official asset is available. */
  src?: string;
  width?: number;
  height?: number;
  className?: string;
  ariaLabel: string;
};

const dealerBrands: DealerBrandLogo[] = [
  {
    name: "Honda",
    href: "/equipment/honda",
    ariaLabel: "View Honda equipment",
    // Needs: transparent Honda Power Equipment wordmark SVG/PNG
  },
  {
    name: "Ferris",
    href: "/equipment/ferris",
    ariaLabel: "View Ferris equipment",
    // Needs: transparent Ferris wordmark SVG/PNG (text only, no shield card)
  },
  {
    name: "Toro",
    href: "/equipment/toro",
    ariaLabel: "View Toro equipment",
    // Needs: transparent Toro wordmark SVG/PNG (no red plate)
  },
  {
    name: "Echo",
    href: "/equipment/echo",
    ariaLabel: "View Echo equipment",
    // Needs: transparent Echo wordmark SVG/PNG (no white canvas)
  },
  {
    name: "Simplicity",
    // No equipment page yet — preserve existing non-link behavior
    ariaLabel: "Simplicity equipment",
    // Needs: transparent Simplicity wordmark SVG/PNG (no white canvas)
  },
];

export function BrandsStrip() {
  const { brands } = siteContent;
  const rowRef = useRef<HTMLDivElement>(null);
  const [hasAnimatedDealerButtons, setHasAnimatedDealerButtons] =
    useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
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

  return (
    <div ref={rowRef} className="w-full bg-[#08100c] px-5 py-7 md:px-[60px]">
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
        <span className="flex h-full shrink-0 items-center whitespace-nowrap text-[0.72rem] font-bold uppercase tracking-[0.22em] text-white/42">
          {brands.stripLabel}
        </span>
        <div
          className={cn(
            "grid w-full grid-cols-2 items-center gap-[0.9rem] sm:flex-1 sm:grid-cols-3 md:grid-cols-5",
            hasAnimatedDealerButtons && "authorized-dealer-attention-active",
          )}
        >
          {dealerBrands.map((brand, index) => {
            const style = {
              "--dealer-pill-delay": `${index * 120}ms`,
            } as CSSProperties;

            const content = (
              <span className="dealer-brand-fallback relative z-10 inline-flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-white/55 transition-[color,opacity] duration-[180ms] group-hover:text-white/88">
                {brand.name}
                <span
                  className="dealer-attention-arrow opacity-0 -translate-x-1 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                  aria-hidden
                >
                  →
                </span>
              </span>
            );

            return brand.href ? (
              <Link
                key={brand.name}
                href={brand.href}
                aria-label={brand.ariaLabel}
                className="dealer-brand-pill dealer-attention-pill group relative no-underline"
                style={style}
              >
                {content}
              </Link>
            ) : (
              <span
                key={brand.name}
                className="dealer-brand-pill dealer-attention-pill group relative"
                style={style}
                aria-label={brand.ariaLabel}
              >
                {content}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
