import { StoreSectionHeading } from "@/components/store/StoreSectionHeading";
import { StoreImageSlot } from "@/components/store/StoreImageSlot";
import { siteContent } from "@/content/siteContent";

export function StoreFeaturedProducts() {
  const { storePage } = siteContent;

  return (
    <section
      className="scroll-mt-12 border-b border-black/[0.05] bg-exit-off-white px-5 py-11 md:px-[60px] md:py-16"
      aria-labelledby="store-featured-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <div id="store-featured-heading" className="sr-only">
          {storePage.featuredProductsTitle}
        </div>
        <StoreSectionHeading>{storePage.featuredProductsTitle}</StoreSectionHeading>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          {storePage.featuredProducts.map((p) => (
            <article
              key={p.id}
              className="group/card flex flex-col overflow-hidden rounded-2xl border border-exit-green/[0.12] bg-white shadow-[0_6px_24px_rgba(0,0,0,0.05)] ring-1 ring-transparent transition duration-300 hover:-translate-y-0.5 hover:border-exit-green/45 hover:shadow-[0_14px_44px_rgba(26,92,42,0.11)] hover:ring-exit-green/12"
            >
              <div className="relative aspect-square w-full border-b border-exit-green/[0.06]">
                <StoreImageSlot
                  src={p.productImageSrc}
                  alt={p.name}
                  fill
                  placeholderWatermark={p.name}
                  placeholderDensity="product"
                />
              </div>
              <div className="flex flex-grow flex-col px-[18px] pb-5 pt-4 text-center">
                <h3 className="mb-3 font-display text-[14px] font-bold uppercase leading-snug tracking-[0.04em] text-exit-dark">
                  {p.name}
                </h3>
                <p className="mb-5 font-display text-[25px] font-black text-exit-dark md:text-[27px]">
                  {p.priceDisplay}
                </p>
                <div className="mt-auto border-t border-exit-green/[0.06] pt-4">
                  <a
                    href={p.squareProductUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[12px] font-bold uppercase tracking-[0.14em] text-exit-green no-underline decoration-exit-green/25 underline-offset-[5px] transition duration-200 hover:text-exit-green-mid hover:underline hover:decoration-exit-green group-hover/card:gap-1.5"
                  >
                    {p.viewProductLabel}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
