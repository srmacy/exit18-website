import Image from "next/image";
import { siteContent } from "@/content/siteContent";

export function StoreHero() {
  const { storePage: sp, assets } = siteContent;

  return (
    <section className="relative flex min-h-[min(92svh,820px)] flex-col justify-end overflow-hidden md:min-h-[620px]">
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

      <div className="relative z-[1] w-full px-5 pb-20 pt-28 md:px-[60px] md:pb-28 md:pt-32">
        <div className="mr-auto max-w-[900px] pb-4">
          <div className="mb-5 inline-flex items-center gap-2 rounded border border-exit-lime/30 bg-exit-lime/15 px-3 py-[5px] text-[11px] font-bold uppercase tracking-[2px] text-exit-lime">
            {sp.hero.eyebrow}
          </div>

          <h1 className="font-display mb-2 text-[clamp(2.75rem,7vw,5rem)] font-black uppercase leading-[0.94] tracking-[-1px] text-white">
            {sp.hero.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </section>
  );
}
