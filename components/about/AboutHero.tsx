import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/content/siteContent";
import { AboutPhotoPlaceholder } from "./AboutPhotoPlaceholder";

export function AboutHero() {
  const { hero: h } = siteContent.aboutPage;
  const { branding, assets } = siteContent;
  const hasPhoto =
    typeof h.familyPhotoSrc === "string" && h.familyPhotoSrc.length > 0;

  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative isolate flex min-h-[min(86svh,800px)] flex-col overflow-hidden md:min-h-[min(78svh,760px)]"
    >
      <div className="absolute inset-0">
        <Image
          src={assets.heroImageUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-br from-[rgba(14,26,15,0.88)] via-[rgba(14,26,15,0.55)] to-[rgba(14,26,15,0.45)] md:bg-gradient-to-r md:from-[rgba(14,26,15,0.92)] md:via-[rgba(14,26,15,0.75)] md:to-[rgba(14,26,15,0.25)]"
        aria-hidden
      />
      <div className="relative z-[1] flex min-h-[min(86svh,800px)] flex-col justify-end px-5 pb-12 pt-28 md:min-h-[min(78svh,760px)] md:justify-center md:px-[60px] md:py-16 md:pt-28">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-9 lg:grid-cols-12 lg:gap-10 lg:gap-x-12 xl:gap-x-14">
          <div className="min-w-0 lg:col-span-7">
            <p className="mb-3 inline-flex rounded border border-exit-lime/35 bg-exit-lime/12 px-3 py-[6px] text-[11px] font-bold uppercase tracking-[2.5px] text-exit-lime">
              {h.eyebrow}
            </p>
            <h1
              id="about-hero-heading"
              className="font-display mb-4 max-w-[18ch] text-[clamp(2.375rem,6vw,4rem)] font-black uppercase leading-[0.93] tracking-[-1px] text-white md:mb-5"
            >
              {h.headline}
            </h1>
            <p className="mb-8 max-w-md text-[16px] leading-[1.65] text-white/78 md:text-[17px]">
              {h.subheadline}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={h.primaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border-2 border-exit-green bg-exit-green px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white no-underline transition hover:-translate-y-px hover:border-exit-green-mid hover:bg-exit-green-mid"
              >
                {h.primaryCta.label}
              </Link>
              <Link
                href={h.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-transparent px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white no-underline transition hover:border-white/70 hover:bg-white/[0.08]"
              >
                {h.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="relative min-w-0 lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.04] shadow-[0_28px_80px_rgba(0,0,0,0.45)] ring-1 ring-black/25 backdrop-blur-[2px]">
              {hasPhoto ? (
                <Image
                  src={h.familyPhotoSrc as string}
                  alt={h.familyPhotoAlt}
                  width={640}
                  height={480}
                  className="aspect-[4/3] w-full object-cover"
                  sizes="(max-width:1024px) 100vw, 40vw"
                />
              ) : (
                <>
                  <div className="p-2 md:p-2.5">
                    <AboutPhotoPlaceholder
                      tone="inset"
                      hint={h.placeholderHint}
                    />
                  </div>
                  <p className="border-t border-white/10 bg-exit-dark/40 px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wide text-white/55">
                    {branding.businessName}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
