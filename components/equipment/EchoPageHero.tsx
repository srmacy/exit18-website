import Image from "next/image";
import { StoreAwareLink } from "@/components/StoreComingSoonProvider";
import { siteContent } from "@/content/siteContent";
import { publicImageExists } from "@/lib/publicImage";

const HERO_IMG = "/images/echo-hero.jpg";

/** Echo-only hero — warm strip + CTAs matching InnerPageHero, with right-hand image card. */
export function EchoPageHero() {
  const { equipmentEchoPage: p } = siteContent;
  const hasHero = publicImageExists(HERO_IMG);

  const primaryClass =
    "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-exit-green bg-exit-green px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white no-underline transition duration-200 ease-out hover:-translate-y-px hover:border-exit-green-mid hover:bg-exit-green-mid";
  const secondaryClass =
    "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-exit-dark/15 bg-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-exit-dark no-underline shadow-sm transition duration-200 ease-out hover:border-exit-green hover:bg-white";

  return (
    <section
      aria-labelledby="echo-page-hero-heading"
      className="border-b border-black/[0.06] bg-exit-warm px-5 pb-12 pt-[5.75rem] md:px-[60px] md:pb-16 md:pt-[7rem] lg:py-[4.25rem]"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
        <div className="min-w-0 lg:col-span-6">
          <p className="mb-4 inline-flex max-w-full flex-wrap rounded border border-exit-green/28 bg-white/80 px-3 py-[7px] text-[10px] font-bold uppercase leading-snug tracking-[0.22em] text-exit-green md:text-[11px]">
            {p.hero.eyebrow}
          </p>
          <h1
            id="echo-page-hero-heading"
            className="font-display mb-4 text-[clamp(2.5rem,5.5vw,3.85rem)] font-black uppercase leading-[0.92] tracking-[-1px] text-exit-dark md:mb-5"
          >
            {p.hero.headline}
          </h1>
          <p className="mb-9 max-w-2xl text-[17px] leading-[1.62] text-exit-gray md:text-lg">{p.hero.subheadline}</p>
          {(p.primaryCta || p.secondaryCta || p.tertiaryCta) && (
            <div className="flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
              {p.primaryCta && (
                <StoreAwareLink href={p.primaryCta.href} className={primaryClass}>
                  {p.primaryCta.label}
                </StoreAwareLink>
              )}
              {p.secondaryCta && (
                <StoreAwareLink href={p.secondaryCta.href} className={secondaryClass}>
                  {p.secondaryCta.label}
                </StoreAwareLink>
              )}
              {p.tertiaryCta && (
                <StoreAwareLink href={p.tertiaryCta.href} className={secondaryClass}>
                  {p.tertiaryCta.label}
                </StoreAwareLink>
              )}
            </div>
          )}
        </div>

        <div className="min-w-0 lg:col-span-6">
          <div className="overflow-hidden rounded-2xl border border-exit-dark/[0.07] shadow-[0_20px_60px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.04]">
            {hasHero ? (
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={HERO_IMG}
                  alt="Echo product image"
                  fill
                  className="h-full w-full object-cover rounded-[inherit]"
                  sizes="(max-width:1024px) 100vw, 46vw"
                  priority
                />
              </div>
            ) : (
              <EchoHeroPlaceholder hint="Echo product image" aspectClass="min-h-[220px] sm:min-h-[260px]" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function EchoHeroPlaceholder({ hint, aspectClass }: { hint: string; aspectClass: string }) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-3 rounded-[inherit] border-2 border-dashed border-exit-green/30 bg-white/65 px-6 py-14 text-center ${aspectClass}`}
    >
      <span className="select-none text-[2.25rem] opacity-80" aria-hidden>
        📷
      </span>
      <p className="text-sm font-semibold uppercase tracking-wide text-exit-gray">{hint}</p>
    </div>
  );
}
