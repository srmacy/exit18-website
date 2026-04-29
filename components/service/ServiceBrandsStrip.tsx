import { siteContent } from "@/content/siteContent";

export function ServiceBrandsStrip() {
  const { brandsSection: b } = siteContent.servicePage;

  return (
    <section
      aria-labelledby="service-brands-heading"
      className="bg-exit-dark px-5 py-14 md:px-[60px] md:py-[3.75rem]"
    >
      <div className="mx-auto max-w-[1200px] text-center">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[2.5px] text-exit-lime/85">
          {b.eyebrow}
        </p>
        <h2
          id="service-brands-heading"
          className="font-display mx-auto mb-4 max-w-[24ch] text-[clamp(2rem,4vw,2.75rem)] font-black uppercase leading-[0.96] tracking-[-0.5px] text-white"
        >
          {b.headline}
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-[15px] leading-relaxed text-white/65">
          {b.sub}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {b.names.map((name) => (
            <span
              key={name}
              className="inline-flex items-center rounded-[24px] border border-white/[0.12] bg-white/[0.04] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white/55 transition hover:border-exit-lime/50 hover:text-exit-lime md:text-[13px]"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
