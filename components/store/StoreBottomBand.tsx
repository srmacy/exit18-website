import Link from "next/link";
import { siteContent } from "@/content/siteContent";

export function StoreBottomBand() {
  const { storePage, portal, contact } = siteContent;
  const b = storePage.bottomBand;

  return (
    <section
      className="relative w-full overflow-hidden border-t border-white/[0.06]"
      aria-labelledby="store-bottom-cta-heading"
    >
      {/* Full-width dark green gradient — strong closing band */}
      <div
        className="relative bg-gradient-to-br from-[#071509] via-[#123d1f] to-[#0a2412] px-5 py-16 md:px-[60px] md:py-20 lg:py-[5.25rem]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, transparent, transparent 56px, rgba(255,255,255,0.03) 56px, rgba(255,255,255,0.03) 112px)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/[0.03]"
          aria-hidden
        />

        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0 xl:gap-x-16">
          {/* Left: conversion copy + CTAs */}
          <div className="lg:col-span-5">
            <h2
              id="store-bottom-cta-heading"
              className="font-display text-[clamp(1.85rem,4.2vw,3rem)] font-black uppercase leading-[0.98] tracking-[-0.02em] text-white drop-shadow-sm md:leading-[1.02]"
            >
              {b.headline}
            </h2>
            <p className="mt-5 max-w-[26rem] text-[17px] leading-relaxed text-white/[0.72] md:mt-6 md:text-lg md:leading-snug">
              {b.subtext}
            </p>
            <div className="mt-10 flex max-w-xl flex-col gap-4 sm:flex-row sm:flex-wrap md:mt-11">
              <Link
                href={b.shopEquipmentHref}
                className="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-exit-green-mid px-9 py-3.5 text-sm font-black uppercase tracking-[0.1em] text-white no-underline shadow-[0_6px_28px_rgba(0,0,0,0.28)] ring-1 ring-white/10 transition duration-200 hover:bg-exit-green hover:brightness-105"
              >
                {b.shopEquipmentCtaLabel}
              </Link>
              <Link
                href={b.serviceRepairsHref}
                className="inline-flex min-h-[52px] items-center justify-center rounded-lg border-[1.5px] border-white/55 bg-transparent px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white no-underline transition duration-200 hover:border-white hover:bg-white/[0.08]"
              >
                {b.serviceRepairsCtaLabel}
              </Link>
            </div>
          </div>

          {/* Right: glass columns — lighter, less boxy */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-7 lg:gap-7 xl:gap-8">
            <div className="flex flex-col rounded-2xl bg-white/[0.034] px-7 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.09),inset_0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-[32px] backdrop-saturate-125 md:py-9">
              <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-exit-lime/95">
                {b.visitHeading}
              </div>
              <div className="flex flex-col gap-1.5">
                {b.visitLines.map((line) => (
                  <p
                    key={line}
                    className="text-[15px] font-semibold leading-snug tracking-wide text-white/[0.92]"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col rounded-2xl bg-white/[0.034] px-7 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.09),inset_0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-[32px] backdrop-saturate-125 md:py-9">
              <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-exit-lime/95">
                {b.callHeading}
              </div>
              <a
                href={`tel:${contact.phoneTel}`}
                className="text-[17px] font-bold tracking-wide text-white no-underline transition hover:text-exit-lime"
              >
                {contact.phoneDisplay}
              </a>
              <p className="mt-3 text-[14px] leading-relaxed text-white/[0.58]">
                {b.callHoursSummary}
              </p>
            </div>

            <div className="flex flex-col rounded-2xl bg-white/[0.034] px-7 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.09),inset_0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-[32px] backdrop-saturate-125 md:py-9">
              <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-exit-lime/95">
                {b.partsPortalHeading}
              </div>
              <p className="mb-5 flex-grow text-[14px] leading-relaxed text-white/[0.72] md:text-[15px]">
                {b.partsPortalDescription}
              </p>
              <a
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center text-[13px] font-bold uppercase tracking-[0.14em] text-exit-lime no-underline transition hover:text-[#8eff7e]"
              >
                {b.partsPortalLinkLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
