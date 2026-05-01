import Image from "next/image";
import { siteContent } from "@/content/siteContent";

const SERVICE_CARD_IMAGE_ALT: Record<string, string> = {
  "Equipment Sales":
    "Red zero-turn mower outside an equipment dealership",
  "Service & Repairs": "Tools and sockets on a repair workbench",
  "Parts & Accessories":
    "Maintenance parts including filters oil and spark plugs",
};

export function ServicesSection() {
  const { services } = siteContent;

  return (
    <section
      id="services"
      className="scroll-mt-24 mx-auto max-w-[1200px] px-5 py-16 md:px-[60px] md:py-20"
    >
      <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[2px] text-exit-green">
        {services.eyebrow}
      </p>
      <span className="font-hand mb-2 block rotate-[-1deg] text-[22px] text-exit-green">
        {services.handwrittenLine}
      </span>
      <h2 className="font-display mb-12 text-[clamp(2.25rem,4vw,3.25rem)] font-black uppercase leading-[0.95] tracking-[-0.5px] text-exit-dark md:mb-[48px]">
        {services.titleLines.map((t) => (
          <span key={t} className="block">
            {t}
          </span>
        ))}
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.cards.map((c) => (
          <article
            key={c.title}
            className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-none transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
          >
            <div className="relative h-72 w-full overflow-hidden rounded-t-2xl">
              <Image
                src={c.heroImageSrc}
                alt={SERVICE_CARD_IMAGE_ALT[c.title] ?? c.title}
                fill
                className="h-full w-full object-cover object-center contrast-110 brightness-105 saturate-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
              />
              <div
                className="pointer-events-none absolute inset-0 z-[1] bg-black/10"
                aria-hidden
              />
            </div>
            <div className="p-5">
              <h3 className="font-display mb-1.5 text-[22px] font-extrabold uppercase text-exit-dark">
                {c.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-exit-gray">
                {c.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
