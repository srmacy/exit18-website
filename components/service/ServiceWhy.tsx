import { siteContent } from "@/content/siteContent";

export function ServiceWhy() {
  const { whyIntro } = siteContent.servicePage;

  return (
    <section
      aria-labelledby="service-why-heading"
      className="bg-exit-off-white px-5 py-12 md:px-[60px] md:py-[3.75rem]"
    >
      <div className="mx-auto max-w-[1200px]">
        <header className="mx-auto mb-11 max-w-3xl text-center md:mb-12">
          <p className="mb-4 inline-block rounded border border-exit-green/18 bg-white px-4 py-[6px] text-[11px] font-bold uppercase tracking-[2.5px] text-exit-green">
            {whyIntro.eyebrow}
          </p>
          <h2
            id="service-why-heading"
            className="font-display mt-2 text-[clamp(2rem,4.25vw,3.25rem)] font-black uppercase leading-[0.93] tracking-[-0.5px] text-exit-dark"
          >
            {whyIntro.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-7 max-w-3xl text-center leading-relaxed text-muted-foreground md:mt-8">
            At Exit 18 Equipment, service isn&apos;t just repairs — it&apos;s making
            sure your equipment works when you need it most. From routine maintenance
            to full diagnostics, our team delivers straightforward answers, quality
            work, and turnaround times that keep you moving.
          </p>
        </header>
      </div>
    </section>
  );
}
