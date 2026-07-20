import { BenchlineToolEmbed } from "@/components/benchline/BenchlineToolEmbed";
import { siteContent } from "@/content/siteContent";

export function ServicePickup() {
  const { pickupSection: s } = siteContent.servicePage;

  return (
    <section
      aria-labelledby="service-pickup-heading"
      className="border-t border-black/[0.05] bg-exit-warm px-5 py-12 md:px-[60px] md:py-[3.75rem]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 max-w-3xl md:mb-10">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[2.5px] text-exit-green">
            {s.eyebrow}
          </p>
          <h2
            id="service-pickup-heading"
            className="font-display mb-4 text-[clamp(1.875rem,3.5vw,2.625rem)] font-black uppercase leading-[0.96] tracking-[-0.5px] text-exit-dark"
          >
            {s.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="max-w-xl text-[15px] leading-relaxed text-exit-gray md:text-[16px]">
            {s.lead}
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-[#0b1317] shadow-[0_28px_72px_rgba(0,0,0,0.16)]">
          <BenchlineToolEmbed
            src="https://app.mybenchline.com/exit18/pickup?embed=1"
            title="Exit 18 Equipment Pickup & Delivery"
            tool="pickup"
            defaultHeight={760}
          />
        </div>
      </div>
    </section>
  );
}
