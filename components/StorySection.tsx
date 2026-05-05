import { siteContent } from "@/content/siteContent";
import { StoryExpandableParagraphs } from "@/components/StoryExpandableParagraphs";

export function StorySection() {
  const { story } = siteContent;
  const firstParagraph = story.paragraphs[0] ?? "";
  const restParagraphs = story.paragraphs.slice(1);

  return (
    <section id="story" className="scroll-mt-24 bg-exit-warm px-5 py-16 md:px-[60px] md:py-20">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
        <div className="relative h-[280px] overflow-hidden rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] md:h-[400px]">
          <img
            src="/images/family-history.jpg"
            alt="Exit 18 Equipment family history"
            className="h-full w-full object-cover object-center rounded-[inherit]"
          />
          <div className="absolute -bottom-4 -right-4 flex h-[100px] w-[100px] flex-col items-center justify-center rounded-full border-4 border-exit-warm bg-exit-green pb-1 shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
            <span className="font-display text-[28px] font-black leading-none text-white">
              {story.badge.value}
            </span>
            <span className="max-w-[4.5rem] text-center text-[9px] font-bold uppercase leading-tight opacity-80">
              {story.badge.label}
            </span>
          </div>
        </div>
        <div>
          <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[2px] text-exit-green">
            {story.eyebrow}
          </p>
          <span className="font-hand mb-2 block rotate-[-1deg] text-[22px] text-exit-green">
            {story.handwrittenLine}
          </span>
          <h2 className="font-display mb-5 text-[clamp(2.25rem,4vw,3.25rem)] font-black uppercase leading-[0.95] tracking-[-0.5px] text-exit-dark md:mb-5">
            {story.titleLines.map((t) => (
              <span key={t} className="block">
                {t}
              </span>
            ))}
          </h2>
          <StoryExpandableParagraphs
            firstParagraph={firstParagraph}
            restParagraphs={restParagraphs}
          />
        </div>
      </div>
    </section>
  );
}
