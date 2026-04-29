import { siteContent } from "@/content/siteContent";

export function AboutLegacy() {
  const { legacy: s } = siteContent.aboutPage;

  return (
    <section
      aria-labelledby="about-legacy-heading"
      className="relative overflow-hidden bg-exit-green px-5 py-12 md:px-[60px] md:py-[3.75rem]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(255,255,255,0.02) 60px, rgba(255,255,255,0.02) 120px)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-[min(56rem,100%)] lg:max-w-[1100px]">
        <div className="mb-8 border-l-[3px] border-exit-lime/70 pl-5 md:mb-10 md:pl-6">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-exit-lime">
            {s.eyebrow}
          </p>
          <span className="font-hand mb-5 block rotate-[-1deg] text-[clamp(1.25rem,2.5vw,1.375rem)] text-exit-lime">
            {s.handwritten}
          </span>
          <h2
            id="about-legacy-heading"
            className="font-display text-[clamp(1.9375rem,4vw,3rem)] font-black uppercase leading-[0.96] tracking-[-0.5px] text-white"
          >
            {s.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>

        <p className="mb-8 max-w-none text-[1.0625rem] font-medium leading-relaxed tracking-tight text-white/93 md:text-lg md:leading-relaxed">
          {s.intro}
        </p>

        <div className="grid gap-7 text-[15px] leading-[1.75] text-white/[0.82] md:gap-6 md:text-[15px]">
          {s.paragraphs.map((html, i) => (
            <p
              key={i}
              className="max-w-none [&_strong]:font-semibold [&_strong]:text-white"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
