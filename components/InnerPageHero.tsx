import Link from "next/link";

type Cta = { label: string; href: string };

export type InnerPageHeroProps = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
};

function HeroCta({ cta, primary }: { cta: Cta; primary: boolean }) {
  const scheme =
    cta.href.startsWith("tel:") || cta.href.startsWith("mailto:");
  const primaryClass =
    "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-exit-green bg-exit-green px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white no-underline transition duration-200 ease-out hover:-translate-y-px hover:border-exit-green-mid hover:bg-exit-green-mid";
  const secondaryClass =
    "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-exit-dark/15 bg-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-exit-dark no-underline shadow-sm transition duration-200 ease-out hover:border-exit-green hover:bg-white";

  if (scheme) {
    return (
      <a href={cta.href} className={primary ? primaryClass : secondaryClass}>
        {cta.label}
      </a>
    );
  }

  return (
    <Link href={cta.href} className={primary ? primaryClass : secondaryClass}>
      {cta.label}
    </Link>
  );
}

export function InnerPageHero({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
}: InnerPageHeroProps) {
  return (
    <section
      aria-labelledby="inner-page-heading"
      className="border-b border-black/[0.06] bg-exit-warm px-5 pb-12 pt-[5.75rem] md:px-[60px] md:pb-16 md:pt-[7rem] lg:py-[4.25rem]"
    >
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-4 inline-flex max-w-full flex-wrap rounded border border-exit-green/28 bg-white/80 px-3 py-[7px] text-[10px] font-bold uppercase leading-snug tracking-[0.22em] text-exit-green md:text-[11px]">
          {eyebrow}
        </p>
        <h1
          id="inner-page-heading"
          className="font-display mb-4 text-[clamp(2.5rem,5.5vw,3.85rem)] font-black uppercase leading-[0.92] tracking-[-1px] text-exit-dark md:mb-5"
        >
          {headline}
        </h1>
        <p className="mb-9 max-w-2xl text-[17px] leading-[1.62] text-exit-gray md:text-lg">
          {subheadline}
        </p>
        {(primaryCta || secondaryCta) && (
          <div className="flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
            {primaryCta && <HeroCta cta={primaryCta} primary />}
            {secondaryCta && <HeroCta cta={secondaryCta} primary={false} />}
          </div>
        )}
      </div>
    </section>
  );
}
