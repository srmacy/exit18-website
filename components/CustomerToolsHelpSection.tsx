import {
  CustomerToolCard,
  PickupTruckIcon,
  ServiceRequestIcon,
} from "@/components/customer-tools/CustomerToolCard";
import { MoreWaysAccordion } from "@/components/customer-tools/MoreWaysAccordion";
import { PickupDeliveryMiniPreview } from "@/components/customer-tools/PickupDeliveryMiniPreview";
import { ServiceRequestMiniPreview } from "@/components/customer-tools/ServiceRequestMiniPreview";

import { benchlineCustomerToolUrl } from "@/lib/benchline-app-origin";

const SERVICE_REQUEST_HREF = benchlineCustomerToolUrl("/exit18/service-request");
const PICKUP_HREF = benchlineCustomerToolUrl("/exit18/pickup");

const COMING_SOON = [
  {
    title: "Maintenance Portal",
    description: "Track maintenance plans and equipment records online.",
    icon: ClipboardWrenchIcon,
  },
  {
    title: "Parts Request",
    description: "Request the parts you need without a phone call.",
    icon: GearStackIcon,
  },
  {
    title: "Repair Status",
    description: "Check where your equipment is in the service queue.",
    icon: ProgressGaugeIcon,
  },
  {
    title: "Estimate Approval",
    description: "Review and approve repair estimates from your phone.",
    icon: DocumentCheckIcon,
  },
] as const;

export function CustomerToolsHelpSection() {
  return (
    <section
      id="customer-tools"
      aria-labelledby="customer-tools-heading"
      className="customer-tools-section relative scroll-mt-24 overflow-hidden"
    >
      <div aria-hidden className="customer-tools-topo absolute inset-0" />

      <div className="relative mx-auto max-w-[1180px] px-5 py-[clamp(5rem,8vw,7.5rem)]">
        <header className="mx-auto mb-[clamp(2.25rem,4vw,3.25rem)] max-w-[720px] text-center">
          <div className="mb-3.5 flex items-center justify-center gap-3">
            <span
              className="hidden h-px w-8 bg-[var(--dealer-accent)]/55 sm:block"
              aria-hidden
            />
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.24em] text-[var(--dealer-accent)]">
              Customer Tools
            </p>
            <span
              className="hidden h-px w-8 bg-[var(--dealer-accent)]/55 sm:block"
              aria-hidden
            />
          </div>

          <h2
            id="customer-tools-heading"
            className="font-display text-[clamp(2.25rem,5vw,4.75rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.035em] text-[#f5f7f5] text-balance"
          >
            How Can We{" "}
            <span className="text-[var(--dealer-accent)]">Help Today?</span>
          </h2>

          <p className="mx-auto mt-4 max-w-[620px] text-[clamp(1rem,1.6vw,1.2rem)] leading-relaxed text-[rgba(240,245,241,0.72)]">
            Get the help you need without waiting on hold.
          </p>
        </header>

        <div className="grid grid-cols-1 items-stretch gap-[clamp(1.25rem,2.4vw,2rem)] md:grid-cols-2">
          <CustomerToolCard
            title="Service Request"
            tagline="Get your machine into our service system."
            href={SERVICE_REQUEST_HREF}
            ctaLabel="Start Service Request"
            benefits={[
              "Tell us exactly what is happening",
              "Add equipment and model details",
              "Upload photos for our service team",
            ]}
            icon={<ServiceRequestIcon />}
            preview={<ServiceRequestMiniPreview />}
          />
          <CustomerToolCard
            title="Pickup & Delivery"
            tagline="See what pickup will cost before you decide."
            href={PICKUP_HREF}
            ctaLabel="Get Pickup Estimate"
            benefits={[
              "Enter your equipment location",
              "Get an instant travel estimate",
              "Continue directly into service",
            ]}
            icon={<PickupTruckIcon />}
            preview={<PickupDeliveryMiniPreview />}
          />
        </div>

        <MoreWaysAccordion>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {COMING_SOON.map((tool) => (
              <div
                key={tool.title}
                className="rounded-2xl border border-dashed border-[rgb(var(--dealer-accent-rgb)/0.28)] bg-[rgba(255,255,255,0.03)] px-5 py-5"
              >
                <div className="flex items-start gap-3.5">
                  <span
                    className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[11px] border border-[rgb(var(--dealer-accent-rgb)/0.28)] bg-[rgb(var(--dealer-accent-rgb)/0.1)] text-[var(--dealer-accent)]"
                    aria-hidden
                  >
                    <tool.icon />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-[16px] font-extrabold uppercase tracking-tight text-[#f5f7f5]">
                        {tool.title}
                      </h3>
                      <span className="rounded-full border border-[rgb(var(--dealer-accent-rgb)/0.3)] bg-[rgb(var(--dealer-accent-rgb)/0.12)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--dealer-accent)]">
                        Coming Soon
                      </span>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-[rgba(240,245,241,0.65)]">
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

function ClipboardWrenchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="5"
        y="4"
        width="11"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.85"
      />
      <path
        d="M8.5 4.2V3.4a1.2 1.2 0 0 1 1.2-1.2h1.6A1.2 1.2 0 0 1 12.5 3.4v.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M16.2 12.2a2.6 2.6 0 0 0-3.2 3.2L10.5 18l1.6 1.6 2.5-2.5a2.6 2.6 0 0 0 3.2-3.2l-1.4 1.4-1.4-1.4 1.4-1.4Z"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GearStackIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="3.2" stroke="currentColor" strokeWidth="1.85" />
      <path
        d="M11 4.8v1.4M11 16v1.4M4.8 11h1.4M16 11h1.4M6.4 6.4l1 1M14.6 14.6l1 1M14.6 6.4l-1 1M6.4 14.6l-1 1"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
      />
      <path
        d="M15.5 16.2h4.2v3.5H15.5z"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProgressGaugeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5.2 16.5a7.5 7.5 0 1 1 13.6 0"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
      <path
        d="M12 13.5 15.2 8.8"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
      <circle cx="12" cy="13.5" r="1.4" fill="currentColor" />
      <path
        d="M7 18.5h10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

function DocumentCheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
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
