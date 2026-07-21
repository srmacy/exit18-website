import {
  CustomerToolCard,
  TruckIcon,
  WrenchIcon,
} from "@/components/customer-tools/CustomerToolCard";
import { MoreWaysAccordion } from "@/components/customer-tools/MoreWaysAccordion";
import { PickupDeliveryMiniPreview } from "@/components/customer-tools/PickupDeliveryMiniPreview";
import { ServiceRequestMiniPreview } from "@/components/customer-tools/ServiceRequestMiniPreview";

const SERVICE_REQUEST_HREF =
  "https://app.mybenchline.com/exit18/service-request";
const PICKUP_HREF = "https://app.mybenchline.com/exit18/pickup";

const COMING_SOON = [
  {
    title: "Maintenance Portal",
    description: "Track maintenance plans and equipment records online.",
  },
  {
    title: "Parts Request",
    description: "Request the parts you need without a phone call.",
  },
  {
    title: "Repair Status",
    description: "Check where your equipment is in the service queue.",
  },
  {
    title: "Estimate Approval",
    description: "Review and approve repair estimates from your phone.",
  },
] as const;

/** Very light topo contour pattern — almost imperceptible. */
const TOPO_PATTERN = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="120" viewBox="0 0 180 120" fill="none">
    <path d="M-10 30 C20 18, 40 42, 70 34 S120 12, 160 28 S200 50, 220 40" stroke="#0b2114" stroke-width="1" fill="none"/>
    <path d="M-10 55 C25 48, 50 68, 85 58 S130 40, 170 56 S210 72, 230 62" stroke="#0b2114" stroke-width="1" fill="none"/>
    <path d="M-10 80 C30 72, 55 94, 95 82 S140 64, 175 84 S215 98, 235 88" stroke="#0b2114" stroke-width="1" fill="none"/>
    <path d="M-10 105 C35 98, 60 116, 100 106 S145 90, 180 108" stroke="#0b2114" stroke-width="1" fill="none"/>
  </svg>`,
)}")`;

export function CustomerToolsHelpSection() {
  return (
    <section
      id="customer-tools"
      aria-labelledby="customer-tools-heading"
      className="relative scroll-mt-24 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 50% 20%, rgba(16, 185, 129, 0.07), transparent 42%),
          linear-gradient(180deg, #ffffff 0%, #f8fbf9 55%, #ffffff 100%)
        `,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: TOPO_PATTERN,
          backgroundSize: "180px 120px",
        }}
      />

      <div className="relative mx-auto max-w-[1120px] px-[18px] py-[52px] pb-[56px] md:px-6 md:py-[72px] md:pb-[76px]">
        <header className="mx-auto mb-[42px] max-w-[720px] text-center">
          <div className="mb-3.5 flex items-center justify-center gap-3">
            <span
              className="hidden h-px w-8 bg-[#168244]/55 sm:block"
              aria-hidden
            />
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#168244]">
              Customer Tools
            </p>
            <span
              className="hidden h-px w-8 bg-[#168244]/55 sm:block"
              aria-hidden
            />
          </div>

          <h2
            id="customer-tools-heading"
            className="font-display text-[clamp(2.25rem,5vw,4rem)] font-black uppercase leading-[0.98] tracking-[-0.025em] text-[#0b2114]"
          >
            How Can We{" "}
            <span className="relative inline-block text-[#159451]">
              Help Today?
              <span
                className="absolute inset-x-[6%] -bottom-1 h-[3px] rounded-full bg-[#159451]/35"
                aria-hidden
              />
            </span>
          </h2>

          <p className="mt-4 text-[17px] leading-[1.6] text-[#536159]">
            Get the help you need without waiting on hold.
          </p>
        </header>

        <div className="grid grid-cols-1 items-stretch gap-[18px] md:grid-cols-2 md:gap-6">
          <CustomerToolCard
            title="Service Request"
            href={SERVICE_REQUEST_HREF}
            ctaLabel="Start Service Request"
            benefits={[
              "Describe the problem",
              "Upload photos",
              "Track your repair",
            ]}
            icon={<WrenchIcon />}
            preview={<ServiceRequestMiniPreview />}
          />
          <CustomerToolCard
            title="Pickup & Delivery"
            href={PICKUP_HREF}
            ctaLabel="Get Pickup Estimate"
            benefits={[
              "Get an instant estimate",
              "See your pricing",
              "Schedule when ready",
            ]}
            icon={<TruckIcon />}
            preview={<PickupDeliveryMiniPreview />}
          />
        </div>

        <MoreWaysAccordion>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {COMING_SOON.map((tool) => (
              <div
                key={tool.title}
                className="rounded-2xl border border-dashed border-[rgba(16,130,71,0.18)] bg-white/80 px-5 py-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-[16px] font-extrabold uppercase tracking-tight text-[#0b2114]">
                    {tool.title}
                  </h3>
                  <span className="rounded-full border border-[#159451]/25 bg-[#159451]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#08763f]">
                    Coming Soon
                  </span>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-[#536159]">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>
        </MoreWaysAccordion>
      </div>
    </section>
  );
}
