import Image from "next/image";
import { siteContent } from "@/content/siteContent";

export function StorySection() {
  const { story, assets } = siteContent;

  return (
    <section id="story" className="scroll-mt-24 bg-exit-warm px-5 py-16 md:px-[60px] md:py-20">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
        <div className="relative overflow-hidden rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
          <Image
            src={assets.heroImageUrl}
            alt={assets.storyImageAlt}
            width={900}
            height={400}
            className="h-[280px] w-full object-cover md:h-[400px]"
            sizes="(max-width:768px) 100vw, 50vw"
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
          {story.paragraphs.map((p, i) => (
            <p
              key={i}
              className="mb-4 text-[15px] leading-[1.8] text-exit-gray [&_strong]:text-exit-dark"
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
