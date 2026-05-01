import Image from "next/image";
import { siteContent } from "@/content/siteContent";

export function StoreSplitHero() {
  const { storePage } = siteContent;
  const { hero, heroInteriorImage, viewAllProductsSquareUrl } = storePage;

  const brandAnchor = `#${hero.shopByBrandSectionId}`;

  return (
    <section
      className="grid min-h-[min(500px,calc(92svh-4rem))] grid-cols-1 border-b border-exit-green/[0.12] lg:grid-cols-2"
      aria-label="Store hero"
    >
      <div className="relative z-[1] flex flex-col justify-center bg-gradient-to-br from-[#0d2312] via-exit-green to-[#082010] px-5 py-10 md:px-[60px] md:py-14 lg:py-16">
        <div className="w-full max-w-[24.5rem]">
          <div className="mb-2.5 inline-flex w-fit items-center gap-2 rounded border border-exit-lime/50 bg-black/10 px-3 py-[5px] text-[10px] font-bold uppercase tracking-[2.5px] text-exit-lime backdrop-blur-[2px] md:text-[11px]">
            {hero.eyebrow}
          </div>
          <h1 className="font-display mb-2.5 text-[clamp(1.95rem,5vw,3.5rem)] font-black uppercase leading-[0.92] tracking-[-0.03em] text-white drop-shadow-[0_3px_28px_rgba(0,0,0,0.45)] md:mb-3">
            <span className="block [text-shadow:0_1px_0_rgba(255,255,255,0.06)]">
              {hero.headline}
            </span>
          </h1>
          <p className="mb-6 max-w-[22rem] text-[15px] leading-snug text-white/[0.82] md:text-[16px] md:leading-relaxed">
            {hero.subtext}
          </p>
          <div className="flex max-w-xl flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={brandAnchor}
              className="inline-flex min-h-[52px] shrink-0 items-center justify-center rounded-lg bg-exit-green px-8 py-3.5 text-[13px] font-black uppercase tracking-[0.08em] text-white shadow-[0_4px_22px_rgba(0,0,0,0.35)] ring-1 ring-white/10 transition duration-200 hover:-translate-y-0.5 hover:bg-exit-green-mid hover:shadow-[0_12px_36px_rgba(26,92,42,0.55)]"
            >
              {hero.shopByBrandButtonLabel}
            </a>
            <a
              href={viewAllProductsSquareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] shrink-0 items-center justify-center rounded-lg border-[1.5px] border-white/65 bg-white/[0.06] px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-[6px] transition duration-200 hover:border-white hover:bg-white/15 hover:text-white"
            >
              {hero.viewAllProductsButtonLabel}
            </a>
          </div>
        </div>
      </div>

      <div className="relative isolate flex min-h-[220px] w-full overflow-hidden lg:min-h-full">
        {/* Photo layer — oversized + light drift for depth (parallax-ready via transform) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="store-hero-photo-drift absolute -left-[7%] -top-[5%] h-[115%] w-[115%]">
            <Image
              src={heroInteriorImage.src}
              alt={heroInteriorImage.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[56%_center] brightness-[1.1] contrast-[1.14] saturate-[1.16]"
            />
          </div>
        </div>

        {/* Radial glow / highlight on product side (behind UI gradients) */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_75%_85%_at_70%_52%,rgba(255,255,255,0.2)_0%,rgba(124,255,107,0.08)_22%,transparent_58%)] mix-blend-soft-light"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_68%_48%,rgba(255,255,255,0.06)_0%,transparent_45%)] mix-blend-overlay"
          aria-hidden
        />

        {/* Dark gradient L → R — slightly lighter mid so equipment reads through */}
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#020503] via-[#050c08]/62 via-[46%] to-transparent"
          aria-hidden
        />
        {/* Edge depth — eased so right side stays luminous */}
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_92%_115%_at_90%_50%,transparent_40%,rgba(0,0,0,0.12)_88%)]"
          aria-hidden
        />

        {/* Frosted seam */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[3] w-[4.5rem] bg-gradient-to-r from-exit-green/22 to-transparent backdrop-blur-[4px] lg:w-24"
          aria-hidden
        />

        <div
          className="pointer-events-none absolute inset-0 z-[4] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.085)]"
          aria-hidden
        />
        <div className="pointer-events-none absolute left-4 top-4 z-[5] lg:left-5 lg:top-5" aria-hidden>
          <div className="h-9 w-9 border-l-2 border-t-2 border-white/28 lg:h-10 lg:w-10 lg:border-exit-lime/45" />
        </div>
        <div className="pointer-events-none absolute bottom-4 right-4 z-[5] lg:bottom-5 lg:right-5" aria-hidden>
          <div className="h-9 w-9 border-b-2 border-r-2 border-white/25 lg:h-10 lg:w-10 lg:border-exit-lime/38" />
        </div>
      </div>
    </section>
  );
}
