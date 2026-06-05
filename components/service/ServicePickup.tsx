import { PickupDeliveryEstimator } from "@/components/service/PickupDeliveryEstimator";
import { siteContent } from "@/content/siteContent";

export function ServicePickup() {
  const { pickupSection: s } = siteContent.servicePage;

  return (
    <section
      aria-labelledby="service-pickup-heading"
      className="border-t border-black/[0.05] bg-exit-warm px-5 py-12 md:px-[60px] md:py-[3.75rem]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
          <div className="min-w-0 lg:col-span-6">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[2.5px] text-exit-green">
              {s.eyebrow}
            </p>
            <h2
              id="service-pickup-heading"
              className="font-display mb-6 text-[clamp(1.875rem,3.5vw,2.625rem)] font-black uppercase leading-[0.96] tracking-[-0.5px] text-exit-dark"
            >
              {s.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mb-10 max-w-xl text-[15px] leading-relaxed text-exit-gray md:text-[16px]">
              {s.lead}
            </p>
            <ul className="space-y-8">
              {s.bullets.map((b) => (
                <li key={b.title} className="flex gap-4">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-exit-green/22 bg-white text-xl shadow-sm"
                    aria-hidden
                  >
                    {b.icon}
                  </span>
                  <div>
                    <p className="font-display text-base font-extrabold uppercase tracking-tight text-exit-dark">
                      {b.title}
                    </p>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-exit-gray">
                      {b.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 lg:col-span-6">
            <PickupDeliveryEstimator />
          </div>
        </div>
      </div>
    </section>
  );
}
