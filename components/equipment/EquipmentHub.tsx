import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/content/siteContent";

export function EquipmentHub() {
  const { brandsSection, simplicity, helpWith, finalCta } =
    siteContent.equipmentPage;
  const telHref = `tel:${siteContent.contact.phoneTel}`;

  return (
    <>
      <section
        aria-labelledby="equipment-brands-heading"
        className="bg-white px-5 pt-24 md:px-[60px] md:pt-28"
      >
        <div className="mx-auto max-w-[1200px] pb-24 md:pb-28">
          <div className="mb-10 flex items-center gap-4 md:mb-14 md:gap-5">
            <div
              className="h-px flex-1 bg-gradient-to-r from-transparent via-black/[0.08] to-black/[0.04]"
              aria-hidden
            />
            <h2
              id="equipment-brands-heading"
              className="shrink-0 text-center font-display text-[clamp(1.25rem,2.5vw,1.65rem)] font-black uppercase tracking-widest text-exit-dark"
            >
              {brandsSection.title}
            </h2>
            <div
              className="h-px flex-1 bg-gradient-to-l from-transparent via-black/[0.08] to-black/[0.04]"
              aria-hidden
            />
          </div>
          <p className="mx-auto mb-16 max-w-xl text-center text-sm font-normal leading-relaxed tracking-wide text-exit-dark/45 md:mb-20 md:text-[15px]">
            {brandsSection.intro}
          </p>

          <div className="mx-auto max-w-[1140px]">
            <div className="grid grid-cols-2 justify-items-center gap-x-10 gap-y-14 md:grid-cols-4 md:gap-x-12 lg:gap-x-14">
              {brandsSection.cards.map((card) => (
                <Link
                  key={card.id}
                  href={card.href}
                  className="group flex max-w-[16rem] flex-col items-center text-center outline-none transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-exit-green/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white group-hover:-translate-y-0.5"
                >
                  <div className="flex w-full max-w-[30ch] flex-col items-center space-y-2">
                    <Image
                      src={card.logoSrc}
                      alt={`${card.name} logo`}
                      width={240}
                      height={96}
                      className="mx-auto h-auto w-[10.5rem] max-h-[92px] object-contain opacity-100 transition-transform duration-200 ease-out group-hover:scale-[1.03] md:w-48 md:max-h-[100px] lg:w-[13rem] lg:max-h-[108px]"
                    />
                    <p className="text-center text-[11px] font-medium uppercase leading-relaxed tracking-[0.08em] text-neutral-800 opacity-80">
                      {card.description}
                    </p>
                    <span
                      className="relative inline-flex items-center gap-1 rounded-md px-2 py-1 text-[1rem] font-semibold tracking-wide text-emerald-700 transition-all duration-200 ease-out group-hover:bg-emerald-50 group-hover:text-emerald-600 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-[3px] after:h-px after:origin-left after:scale-x-0 after:bg-emerald-700/30 after:transition-transform after:duration-200 group-hover:after:scale-x-100"
                    >
                      <span>{card.ctaLabel}</span>
                      <span
                        aria-hidden
                        className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mx-auto mt-16 max-w-[920px] border-t border-neutral-200/80 pt-14 md:mt-20 md:pt-16 lg:max-w-[960px]">
              <h3 className="mb-9 text-center font-display text-[11px] font-black uppercase tracking-[0.18em] text-neutral-400 md:mb-10 md:text-[12px] md:tracking-[0.2em]">
                {brandsSection.engineSupportHeading}
              </h3>
              <div className="mx-auto grid max-w-[960px] grid-cols-2 justify-items-center gap-x-10 gap-y-11 sm:gap-x-12 md:grid-cols-4 md:gap-x-10 md:gap-y-12 lg:gap-x-12">
                {brandsSection.engineSupportBrands.map((brand) => {
                  const isKawasaki = brand.id === "kawasaki";

                  return (
                  <div
                    key={brand.id}
                    role="group"
                    aria-label={brand.name}
                    className="group flex min-h-[120px] w-full max-w-[220px] flex-col items-center justify-start text-center sm:max-w-[240px]"
                  >
                    <div className="flex w-full flex-col items-center justify-center">
                      {brand.logoSrc ? (
                        <Image
                          src={brand.logoSrc}
                          alt={`${brand.name} logo`}
                          width={isKawasaki ? 280 : 380}
                          height={isKawasaki ? 176 : 180}
                          sizes={
                            isKawasaki
                              ? "(max-width: 640px) 36vw, 138px"
                              : "(max-width: 640px) 42vw, 184px"
                          }
                          className={`mx-auto h-auto w-auto object-contain opacity-90 transition-transform duration-300 group-hover:scale-105 group-hover:opacity-100 ${
                            isKawasaki
                              ? "max-h-[68px] max-w-[138px]"
                              : "max-h-[92px] max-w-[188px]"
                          }`}
                        />
                      ) : (
                        <span className="text-center font-display text-[10px] font-black uppercase leading-tight tracking-[0.1em] text-neutral-500 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                          {brand.name}
                        </span>
                      )}
                    </div>
                    <p className="mt-2.5 max-w-[22ch] text-center text-[10px] font-medium uppercase leading-snug tracking-[0.08em] text-neutral-500 opacity-95">
                      {brandsSection.engineSupportTagline}
                    </p>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div
          className="h-px w-full bg-gradient-to-r from-transparent via-emerald-900/30 to-transparent"
          aria-hidden
        />
      </section>

      <section
        aria-labelledby="equipment-simplicity-heading"
        className="border-b border-black/[0.06] bg-neutral-50 px-5 pb-12 pt-14 md:px-[60px] md:pb-16 md:pt-16"
      >
        <div className="mx-auto max-w-[1200px]">
          <h2 id="equipment-simplicity-heading" className="sr-only">
            {simplicity.title}
          </h2>
          <div className="rounded-2xl border border-black/[0.06] bg-neutral-100/80 px-6 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] md:flex md:items-center md:justify-between md:gap-8 md:px-8 md:py-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-6">
              <p className="max-w-[13ch] shrink-0 font-display text-xs font-black uppercase leading-snug tracking-[0.14em] text-exit-dark/38">
                Service focus
              </p>
              <div>
                <h3 className="font-display text-base font-black uppercase tracking-[0.1em] text-exit-dark md:text-[1.05rem]">
                  {simplicity.title}
                </h3>
                <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-exit-dark/72 md:text-[15px]">
                  {simplicity.body}
                </p>
              </div>
            </div>
            <Link
              href={simplicity.ctaHref}
              className="mt-5 inline-flex min-h-[44px] w-full shrink-0 items-center justify-center rounded-full border-2 border-exit-green bg-exit-green px-8 py-3 text-xs font-bold uppercase tracking-wide text-white no-underline transition duration-200 ease-out hover:bg-exit-green-mid md:mt-0 md:w-auto"
            >
              {simplicity.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="equipment-help-heading"
        className="border-b border-black/15 bg-exit-green px-5 py-16 md:px-[60px] md:py-[4.5rem]"
      >
        <h2 id="equipment-help-heading" className="sr-only">
          What Exit 18 sells and services
        </h2>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-0">
            <div className="md:pr-10 lg:pr-16">
              <h3 className="font-display text-xl font-black uppercase tracking-[0.08em] text-white md:text-2xl">
                {helpWith.sellTitle}
              </h3>
              <ul className="mt-6 space-y-3 md:space-y-3.5">
                {helpWith.sellBullets.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[15px] leading-relaxed text-white/[0.82] md:text-[16px] md:leading-relaxed"
                  >
                    <span
                      className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-white/50"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-white/15 pt-12 md:border-l md:border-t-0 md:pl-10 md:pt-0 lg:pl-16">
              <h3 className="font-display text-xl font-black uppercase tracking-[0.08em] text-white md:text-2xl">
                {helpWith.serviceTitle}
              </h3>
              <ul className="mt-6 space-y-3 md:space-y-3.5">
                {helpWith.serviceBullets.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[15px] leading-relaxed text-white/[0.82] md:text-[16px] md:leading-relaxed"
                  >
                    <span
                      className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-white/50"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="equipment-final-cta-heading"
        className="relative overflow-hidden border-t border-white/15 bg-exit-green px-5 py-12 md:px-[60px] md:py-[3.75rem]"
      >
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[rgba(0,0,0,0.2)] to-transparent opacity-70"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-100"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(255,255,255,0.018) 60px, rgba(255,255,255,0.018) 120px)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[min(52rem,100%)] text-center">
          <h2
            id="equipment-final-cta-heading"
            className="font-display mx-auto mb-5 max-w-[26ch] text-[clamp(2rem,4.5vw,2.875rem)] font-black uppercase leading-[0.98] tracking-[-0.5px] text-white"
          >
            {finalCta.headline}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-[16px] leading-[1.7] text-white/[0.78]">
            {finalCta.body}
          </p>
          <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-5">
            <a
              href={telHref}
              className="inline-flex min-h-[48px] min-w-[220px] items-center justify-center gap-2 rounded-md bg-exit-lime px-9 py-3.5 text-sm font-extrabold uppercase tracking-[0.05em] text-exit-dark no-underline shadow-[0_8px_32px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:bg-[#96ff82] hover:shadow-[0_12px_40px_rgba(0,0,0,0.28)]"
            >
              {finalCta.callLabel}
            </a>
            <Link
              href={finalCta.serviceHref}
              className="inline-flex min-h-[48px] min-w-[220px] items-center justify-center gap-2 rounded-md border-[1.5px] border-white/55 bg-transparent px-9 py-3.5 text-sm font-bold uppercase tracking-[0.05em] text-white no-underline transition hover:border-white hover:bg-white/10"
            >
              {finalCta.serviceLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
