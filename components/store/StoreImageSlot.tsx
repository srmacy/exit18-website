import Image from "next/image";

function abbrevWatermark(full: string) {
  const m = full.match(/[A-Za-z][A-Za-z&]*(?:\s+[A-Za-z][A-Za-z&]*)*/);
  if (!m) return full.slice(0, 4).toUpperCase();
  const chunk = m[0].replace(/\s+/g, "").toUpperCase();
  return chunk.length > 12 ? chunk.slice(0, 5) : chunk;
}

/** Placeholder or Next/Image when src is a non-empty local `/` path */
export function StoreImageSlot({
  src,
  alt,
  className,
  fill,
  /** Large faded backdrop text for card placeholders (e.g. brand name) */
  placeholderWatermark,
  /** Dense pattern + detail for storefront cards vs smaller product squares */
  placeholderDensity = "card",
}: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  placeholderWatermark?: string;
  placeholderDensity?: "card" | "product";
}) {
  const hasImg = typeof src === "string" && src.length > 0;
  const isProduct = placeholderDensity === "product";

  if (hasImg && src.startsWith("/")) {
    if (fill) {
      return (
        <div className="absolute inset-0 overflow-hidden">
          {!isProduct ? (
            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-95"
              aria-hidden
              style={{
                background: `
                  linear-gradient(165deg, rgba(255,255,255,0.32) 0%, transparent 38%),
                  linear-gradient(to bottom, #eaf2ec, #dde8df)
                `,
              }}
            />
          ) : null}
          <Image
            src={src}
            alt={alt}
            fill
            className="relative z-[1] object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      );
    }
    return (
      <Image
        src={src}
        alt={alt}
        width={640}
        height={400}
        className={className}
        sizes="(max-width: 1024px) 100vw, 380px"
      />
    );
  }

  return (
    <div
      className={
        fill
          ? `absolute inset-0 z-[1] overflow-hidden ${isProduct ? "bg-[#f5f3ef]" : "bg-[#eef4ef]"}`
          : `relative z-[1] flex min-h-[120px] w-full flex-col overflow-hidden ${isProduct ? "bg-[#f5f3ef]" : "bg-[#eef4ef]"} ${className ?? ""}`
      }
      aria-label={alt || "Placeholder image"}
    >
      {!isProduct && (
        <>
          {/* Base wash + fabric-like micro texture (brand showcase area only) */}
          <div
            className="pointer-events-none absolute inset-0 opacity-100"
            aria-hidden
            style={{
              background: `
                linear-gradient(165deg, rgba(255,255,255,0.5) 0%, transparent 42%),
                linear-gradient(to bottom, #f6faf7 0%, #eef3ee 48%, #e2ebe3 100%)
              `,
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.65]"
            aria-hidden
            style={{
              backgroundImage: `
                radial-gradient(ellipse 110% 80% at 50% -10%, rgba(26,92,42,0.07), transparent 52%),
                radial-gradient(circle at 85% 90%, rgba(26,92,42,0.06), transparent 45%),
                repeating-linear-gradient(
                  118deg,
                  transparent,
                  transparent 11px,
                  rgba(26,92,42,0.028) 11px,
                  rgba(26,92,42,0.028) 12px
                ),
                repeating-linear-gradient(
                  -118deg,
                  transparent,
                  transparent 15px,
                  rgba(255,255,255,0.045) 15px,
                  rgba(255,255,255,0.045) 16px
                )
              `,
            }}
          />
        </>
      )}

      {/* Product placeholder: striped pattern */}
      {isProduct ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          aria-hidden
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 120% at 10% -20%, rgba(26, 92, 42, 0.09), transparent 55%),
              radial-gradient(ellipse 70% 80% at 100% 100%, rgba(26, 92, 42, 0.07), transparent 50%),
              repeating-linear-gradient(
                -32deg,
                transparent,
                transparent 14px,
                rgba(26, 92, 42, 0.04) 14px,
                rgba(26, 92, 42, 0.04) 15px
              )
            `,
          }}
        />
      ) : null}
      <div
        className={`pointer-events-none absolute inset-[1px] rounded-[inherit] ring-1 ring-inset ring-exit-green/[0.08]`}
        aria-hidden
      />

      <div className="relative flex h-full min-h-[inherit] flex-col items-center justify-center gap-3 px-4 py-6 text-center">
        {placeholderWatermark ? (
          <span
            className="pointer-events-none select-none font-display text-[clamp(2.75rem,10vw,4.25rem)] font-black uppercase leading-none tracking-tight text-exit-green/[0.075]"
            aria-hidden
          >
            {abbrevWatermark(placeholderWatermark)}
          </span>
        ) : null}

        <div className="relative z-[1] flex flex-col items-center gap-1.5">
          <span className="text-[9px] font-bold uppercase tracking-[0.42em] text-exit-green/55">
            {isProduct ? "Product photo" : "Showcase image"}
          </span>
          <span className="max-w-[12rem] text-[11px] font-medium leading-snug text-exit-dark/[0.42]">
            Photography placeholder · keeps layout until assets load
          </span>
          <span className="mt-0.5 h-px w-10 bg-gradient-to-r from-transparent via-exit-green/35 to-transparent" />
        </div>
      </div>
    </div>
  );
}
