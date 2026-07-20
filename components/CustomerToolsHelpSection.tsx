import Link from "next/link";
import { ExpandableMoreTools } from "@/components/benchline/BenchlineToolEmbed";

const FEATURED = [
  {
    title: "Service Request",
    description:
      "Tell us about your equipment, describe the issue, and upload photos so our shop can get started.",
    href: "https://app.mybenchline.com/exit18/service-request",
    cta: "Start Service Request",
  },
  {
    title: "Pickup & Delivery",
    description:
      "Get a travel estimate for transporting equipment and continue into a service request when you are ready.",
    href: "https://app.mybenchline.com/exit18/pickup",
    cta: "Get Pickup Estimate",
  },
] as const;

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

export function CustomerToolsHelpSection() {
  return (
    <section
      id="customer-tools"
      aria-labelledby="customer-tools-heading"
      className="scroll-mt-24 border-t border-black/[0.05] bg-exit-off-white px-5 py-16 md:px-[60px] md:py-20"
    >
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[2px] text-exit-green">
          Customer tools
        </p>
        <h2
          id="customer-tools-heading"
          className="font-display mb-3 text-[clamp(2.25rem,4vw,3.25rem)] font-black uppercase leading-[0.95] tracking-[-0.5px] text-exit-dark"
        >
          How Can We Help Today?
        </h2>
        <p className="mb-10 max-w-2xl text-[16px] leading-relaxed text-exit-gray md:mb-12 md:text-[17px]">
          Take care of the most common equipment needs online.
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {FEATURED.map((tool) => (
            <article
              key={tool.title}
              className="flex flex-col rounded-2xl border border-black/[0.06] bg-white p-6 shadow-none transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] md:p-8"
            >
              <h3 className="font-display text-[22px] font-extrabold uppercase tracking-tight text-exit-dark md:text-[24px]">
                {tool.title}
              </h3>
              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-exit-gray md:text-[15px]">
                {tool.description}
              </p>
              <Link
                href={tool.href}
                className="mt-7 inline-flex w-full items-center justify-center rounded-full border-2 border-exit-green bg-exit-green px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-exit-green-mid hover:bg-exit-green-mid hover:shadow-lg active:scale-[0.98] sm:w-auto"
              >
                {tool.cta}
              </Link>
            </article>
          ))}
        </div>

        <ExpandableMoreTools>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {COMING_SOON.map((tool) => (
              <div
                key={tool.title}
                className="rounded-2xl border border-dashed border-black/[0.1] bg-white/70 px-5 py-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-[16px] font-extrabold uppercase tracking-tight text-exit-dark">
                    {tool.title}
                  </h3>
                  <span className="rounded-full border border-exit-green/25 bg-exit-green/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-exit-green">
                    Coming Soon
                  </span>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-exit-gray">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>
        </ExpandableMoreTools>
      </div>
    </section>
  );
}
