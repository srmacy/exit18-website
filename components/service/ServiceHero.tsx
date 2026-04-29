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
      className="border-b border-black/[0.06] bg-exit-warm px-5 pb-12 pt-[5.75rem] md:px-[60px] md:pb-16 md:pt-[7rem] lg:py-[4.25rem]"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
        <div className="min-w-0 lg:col-span-6">
          <p className="mb-4 inline-flex max-w-full flex-wrap rounded border border-exit-green/28 bg-white/80 px-3 py-[7px] text-[10px] font-bold uppercase leading-snug tracking-[0.22em] text-exit-green md:text-[11px]">
            {h.eyebrow}
          </p>
          <h1
            id="service-hero-heading"
            className="font-display mb-4 text-[clamp(2.5rem,5.5vw,3.85rem)] font-black uppercase leading-[0.92] tracking-[-1px] text-exit-dark md:mb-5"
          >
            {h.headline}
          </h1>
          <p className="mb-9 max-w-xl text-[17px] leading-[1.62] text-exit-gray md:text-lg">
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
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-exit-dark/15 bg-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-exit-dark no-underline shadow-sm transition hover:border-exit-green hover:bg-white"
            >
              <span aria-hidden className="text-base">
                📞
              </span>
              {h.secondaryCtaLabel}: <span className="font-bold">{contact.phoneDisplay}</span>
            </a>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-6">
          <div className="overflow-hidden rounded-2xl border border-exit-dark/[0.07] shadow-[0_24px_72px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.04]">
            {hasPhoto ? (
              <Image
                src={h.photoSrc}
                alt={h.photoAlt}
                width={900}
                height={675}
                className="aspect-[4/3] w-full object-cover"
                sizes="(max-width:1024px) 100vw, 46vw"
                priority
              />
            ) : (
              <AboutPhotoPlaceholder hint={h.placeholderHint} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
