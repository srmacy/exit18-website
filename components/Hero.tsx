import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/content/siteContent";

export function Hero() {
  const { hero, assets } = siteContent;

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden md:min-h-[700px]">
      <div className="absolute inset-0">
        <Image
          src={assets.heroImageUrl}
          alt={assets.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-[rgba(14,26,15,0.3)] from-0% via-[rgba(14,26,15,0.2)] via-[40%] to-[rgba(14,26,15,0.85)] to-100%"
        aria-hidden
      />

      <div className="relative z-[1] w-full px-5 pb-[14rem] pt-24 max-sm:pb-[16rem] md:px-[60px] md:pb-24 md:pt-28">
        <div className="mr-auto max-w-[900px] pb-4">
          <div className="mb-5 inline-flex items-center gap-2 rounded border border-exit-lime/30 bg-exit-lime/15 px-3 py-[5px] text-[11px] font-bold uppercase tracking-[2px] text-exit-lime">
            {hero.eyebrow}
          </div>

          <h1 className="font-display mb-5 text-[clamp(2.5rem,8vw,6.25rem)] font-black uppercase leading-[0.92] tracking-[-1px] text-white">
            {hero.headlineRows.map((row, i) => (
              <span key={i} className="block">
                {row.map((seg, j) =>
                  seg.kind === "accent" ? (
                    <em
                      key={j}
                      className="font-display not-italic text-exit-lime"
                    >
                      {seg.text}
                    </em>
                  ) : (
                    <span key={j}>{seg.text}</span>
                  ),
                )}
              </span>
            ))}
          </h1>

          <p className="mb-9 max-w-[480px] text-[17px] leading-relaxed text-white/70">
            {hero.subheadline}
          </p>

          <div className="flex flex-wrap gap-3.5">
            <Link
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border-2 border-exit-green bg-exit-green px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white no-underline transition hover:-translate-y-px hover:border-exit-green-mid hover:bg-exit-green-mid"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/35 bg-transparent px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white no-underline transition hover:border-white/70 hover:bg-white/[0.08]"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 divide-x divide-y divide-white/[0.08] border-t border-white/[0.12] bg-[rgba(14,26,15,0.7)] backdrop-blur-sm md:grid-cols-4">
        {hero.stats.map((s) => (
          <div key={s.label} className="px-4 py-4 md:px-8">
            <div className="font-display mb-0.5 text-[28px] font-extrabold leading-none text-exit-lime">
              {s.value}
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
