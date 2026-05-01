import { StoreSectionHeading } from "@/components/store/StoreSectionHeading";
import { siteContent } from "@/content/siteContent";

export function StoreWhyBuy() {
  const { storePage } = siteContent;

  return (
    <section
      className="border-b border-black/[0.06] bg-exit-warm px-5 py-11 md:px-[60px] md:py-16"
      aria-labelledby="store-why-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <div id="store-why-heading" className="sr-only">
          {storePage.whyBuyTitle}
        </div>
        <StoreSectionHeading>{storePage.whyBuyTitle}</StoreSectionHeading>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-4 lg:gap-5">
          {storePage.whyTrustColumns.map((col) => (
            <div key={col.title} className="text-center lg:px-0.5">
              <div
                className="mx-auto mb-3 flex h-[52px] w-[52px] items-center justify-center rounded-xl border border-exit-green/30 bg-white text-[22px] shadow-[0_4px_14px_rgba(26,92,42,0.08)]"
                aria-hidden
              >
                {col.icon}
              </div>
              <h3 className="mb-2 font-display text-[11px] font-black uppercase leading-[1.25] tracking-[0.12em] text-exit-dark md:text-[12px]">
                {col.title}
              </h3>
              <p className="mx-auto max-w-[17rem] text-[13.5px] leading-[1.45] text-exit-gray md:text-[14px] md:leading-snug">
                {col.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
