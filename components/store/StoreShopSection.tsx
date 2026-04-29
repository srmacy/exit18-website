import { siteContent } from "@/content/siteContent";

export function StoreShopSection() {
  const { storePage, contact } = siteContent;

  return (
    <section aria-labelledby="store-intro" className="scroll-mt-24 bg-exit-warm px-5 py-16 md:px-[60px] md:py-20">
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[2px] text-exit-green">
          {storePage.introEyebrow}
        </p>
        <p
          id="store-intro"
          className="mb-3 max-w-[40rem] text-[clamp(1.0625rem,2.1vw,1.25rem)] leading-relaxed text-exit-dark md:text-xl"
        >
          {storePage.intro}
        </p>
        <p className="mb-12 max-w-[40rem] text-[13px] leading-relaxed text-exit-gray md:text-[14px] md:leading-relaxed">
          {storePage.squareCheckoutLine}
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {storePage.squareBrands.map((b) => (
            <a
              key={b.id}
              href={b.squareStorefrontUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-none transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
            >
              <div className="flex h-[120px] items-center justify-center bg-exit-green sm:h-[140px]">
                <span className="font-display text-[clamp(1.5rem,4vw,2rem)] font-black uppercase tracking-wide text-white">
                  {b.label}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 p-5">
                <span className="text-[13px] font-semibold uppercase tracking-wide text-exit-dark">
                  {storePage.brandCardActionLabel}
                </span>
                <span
                  className="text-lg text-exit-green/70 transition group-hover:text-exit-green"
                  aria-hidden
                >
                  ↗
                </span>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-12 max-w-2xl border-l-2 border-exit-green/35 pl-4 text-sm leading-relaxed text-exit-gray md:text-[15px]">
          {storePage.inventoryNote}{" "}
          <a
            href={`tel:${contact.phoneTel}`}
            className="font-semibold text-exit-green underline decoration-exit-green/30 underline-offset-2 transition hover:decoration-exit-green"
          >
            {contact.phoneDisplay}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
