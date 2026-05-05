import Link from "next/link";
import { siteContent } from "@/content/siteContent";

export function AboutHero() {
  const { hero: h } = siteContent.aboutPage;

  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative isolate flex min-h-[520px] flex-col overflow-hidden md:min-h-[700px]"
      style={{
        backgroundImage: `url('${h.familyPhotoSrc}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-emerald-900/20"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#0b1f17]"
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col justify-end px-5 pb-12 pt-28 md:justify-center md:px-[60px] md:py-16 md:pt-28">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="min-w-0">
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
        </div>
      </div>
    </section>
  );
}
