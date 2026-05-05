import Link from "next/link";
import { siteContent } from "@/content/siteContent";

export function Hero() {
  const { hero } = siteContent;

  return (
    <section
      className="relative flex w-full min-h-[100svh] flex-col justify-end overflow-hidden bg-cover bg-[center_right] md:min-h-[700px]"
      style={{
        backgroundImage: "url('/images/storefront.jpg')",
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#0b2e1f]/95 via-[#0b2e1f]/70 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 w-full px-5 pb-[14rem] pt-24 max-sm:pb-[16rem] md:px-[60px] md:pb-24 md:pt-28">
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
              className="inline-flex items-center gap-2 rounded-full border-2 border-exit-green bg-exit-green px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg hover:border-exit-green-mid hover:bg-exit-green-mid active:scale-[0.98]"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/35 bg-transparent px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg hover:border-white/70 hover:bg-white/[0.08] active:scale-[0.98]"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 grid grid-cols-2 divide-x divide-y divide-white/[0.08] border-t border-white/[0.12] bg-[rgba(14,26,15,0.7)] backdrop-blur-sm md:grid-cols-4">
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
