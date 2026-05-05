import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/content/siteContent";
import { AboutPhotoPlaceholder } from "@/components/about/AboutPhotoPlaceholder";

export function ServiceHero() {
  const { hero: h } = siteContent.servicePage;
  const { contact } = siteContent;
  const hasPhoto = typeof h.photoSrc === "string" && h.photoSrc.length > 0;

  return (
    <section
      aria-labelledby="service-hero-heading"
      className="relative overflow-hidden border-b border-exit-green/[0.12] bg-gradient-to-br from-[#0d2312] via-exit-green to-[#082010] px-5 pb-12 pt-[5.75rem] md:px-[60px] md:pb-16 md:pt-[7rem] lg:py-[4.25rem]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at left, rgba(16, 185, 129, 0.15), transparent 60%)",
        }}
      />
      <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
        <div className="min-w-0 lg:col-span-6">
          <p className="mb-4 inline-flex max-w-full flex-wrap rounded border border-emerald-400/40 bg-black/10 px-3 py-[7px] text-[10px] font-bold uppercase leading-snug tracking-[0.22em] text-exit-lime md:text-[11px]">
            {h.eyebrow}
          </p>
          <h1
            id="service-hero-heading"
            className="font-display mb-4 text-[clamp(2.5rem,5.5vw,3.85rem)] font-black uppercase leading-[0.92] tracking-[-1px] text-white md:mb-5"
          >
            {h.headline}
          </h1>
          <p className="mb-9 max-w-xl text-[17px] leading-[1.62] text-white/80 md:text-lg">
            {h.subheadline}
          </p>
          <div className="flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={h.primaryCta.href}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-exit-green bg-exit-green px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white no-underline transition hover:-translate-y-px hover:border-exit-green-mid hover:bg-exit-green-mid"
            >
              {h.primaryCta.label}
            </Link>
            <a
              href={`tel:${contact.phoneTel}`}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-transparent px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white no-underline transition hover:border-white/60 hover:bg-white/10"
            >
              <span aria-hidden className="text-base">
                📞
              </span>
              {h.secondaryCtaLabel}:{" "}
              <span className="font-bold">{contact.phoneDisplay}</span>
            </a>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-6">
          <div className="overflow-hidden rounded-2xl border border-exit-dark/[0.07] shadow-[0_20px_60px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.04]">
            {hasPhoto ? (
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={h.photoSrc}
                  alt={h.photoAlt}
                  fill
                  className="h-full w-full object-cover rounded-[inherit]"
                  sizes="(max-width:1024px) 100vw, 46vw"
                  priority
                />
              </div>
            ) : (
              <AboutPhotoPlaceholder hint={h.placeholderHint} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
