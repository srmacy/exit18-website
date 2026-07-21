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
    icon: CalendarCheckIcon,
  },
  {
    title: "Parts Request",
    description: "Request the parts you need without a phone call.",
    icon: PackageGearIcon,
  },
  {
    title: "Repair Status",
    description: "Check where your equipment is in the service queue.",
    icon: StatusListIcon,
  },
  {
    title: "Estimate Approval",
    description: "Review and approve repair estimates from your phone.",
    icon: FileCheckIcon,
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
                <div className="flex items-start gap-3.5">
                  <span
                    className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[11px] border border-[rgba(16,185,129,0.14)] bg-[linear-gradient(145deg,rgba(16,185,129,0.14),rgba(16,185,129,0.06))] text-[#0f5c34]"
                    aria-hidden
                  >
                    <tool.icon />
                  </span>
                  <div className="min-w-0">
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
                </div>
              </div>
            ))}
          </div>
        </MoreWaysAccordion>
      </div>
    </section>
  );
}

function CalendarCheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect
        x="3.5"
        y="5"
        width="17"
        height="15.5"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.85"
      />
      <path
        d="M8 3.5v3M16 3.5v3M3.5 9.5h17"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
      <path
        d="m8.8 14.1 2.1 2.1 4.2-4.3"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PackageGearIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="m12 3.8 7 3.5v9.4l-7 3.5-7-3.5V7.3l7-3.5Z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinejoin="round"
      />
      <path
        d="M12 7.2v5.1M5.2 7.1 12 10.5l6.8-3.4"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17.4" cy="16.9" r="2.1" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M17.4 13.8v1M17.4 19v1M20.1 16.9h-1M15.7 16.9h-1M19.3 15l-.7.7M16.2 18.1l-.7.7M19.3 18.8l-.7-.7M16.2 15.7l-.7-.7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StatusListIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 7h10M9 12h10M9 17h10"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
      <circle cx="5.2" cy="7" r="1.2" fill="currentColor" />
      <circle cx="5.2" cy="12" r="1.2" fill="currentColor" />
      <path
        d="m3.8 17.1 1 1 2-2.1"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FileCheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 3.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 6 19V5A1.5 1.5 0 0 1 7.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinejoin="round"
      />
      <path
        d="M13 3.8V8h4.2"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m8.8 14.2 2 2 4-4.2"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
