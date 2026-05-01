import Image from "next/image";
import { StoreSectionHeading } from "@/components/store/StoreSectionHeading";
import { StoreImageSlot } from "@/components/store/StoreImageSlot";
import { siteContent } from "@/content/siteContent";

export function StoreShopByBrand() {
  const { storePage } = siteContent;

  return (
    <section
      id={storePage.hero.shopByBrandSectionId}
      className="scroll-mt-28 border-b border-black/[0.05] bg-exit-off-white px-5 py-11 md:px-[60px] md:py-16"
      aria-labelledby="store-shop-brand-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <div id="store-shop-brand-heading" className="sr-only">
          {storePage.shopByBrandTitle}
        </div>
        <StoreSectionHeading>{storePage.shopByBrandTitle}</StoreSectionHeading>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-[14px] xl:gap-[18px]">
          {storePage.brandCards.map((card) => (
            <article
              key={card.id}
              className="group/card flex flex-col overflow-hidden rounded-2xl border border-exit-green/[0.12] bg-white shadow-[0_6px_22px_rgba(0,0,0,0.045)] ring-1 ring-transparent transition duration-[350ms] ease-out hover:-translate-y-1 hover:border-exit-green/50 hover:shadow-[0_18px_52px_rgba(26,92,42,0.14),0_0_0_1px_rgba(26,92,42,0.06)] hover:ring-2 hover:ring-exit-green/[0.12]"
            >
              <div className="flex h-[68px] items-center justify-center border-b border-exit-green/[0.07] bg-gradient-to-b from-white to-[#fafaf8] px-4 py-2.5">
                {card.logoSrc ? (
                  <Image
                    src={card.logoSrc}
                    alt={`${card.name} logo`}
                    width={140}
                    height={40}
                    className="h-9 w-auto max-w-[90%] object-contain object-center mix-blend-multiply opacity-95"
                  />
                ) : (
                  <span className="text-center font-display text-[clamp(0.95rem,2.2vw,1.2rem)] font-black uppercase leading-tight tracking-[0.06em] text-exit-dark/72">
                    {card.name}
                  </span>
                )}
              </div>

              <div className="relative isolate aspect-[16/11] w-full shrink-0 overflow-hidden border-b border-exit-green/[0.06]">
                <StoreImageSlot
                  src={card.productImageSrc}
                  alt={`${card.name} product`}
                  fill
                  placeholderWatermark={card.name}
                  placeholderDensity="card"
                />
              </div>

              <div className="flex flex-grow flex-col px-[18px] pb-5 pt-4 text-center">
                <p className="mb-auto text-[13px] leading-snug text-exit-gray md:text-[13.5px] md:leading-relaxed">
                  {card.description}
                </p>
                <div className="mt-5 border-t border-exit-green/[0.06] pt-4">
                  <a
                    href={card.squareStorefrontUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[12px] font-bold uppercase tracking-[0.14em] text-exit-green no-underline decoration-exit-green/25 underline-offset-[5px] transition duration-200 hover:text-exit-green-mid hover:underline hover:decoration-exit-green group-hover/card:gap-1.5"
                  >
                    {card.shopLinkLabel}
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
