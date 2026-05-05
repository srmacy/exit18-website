import Image from "next/image";
import Link from "next/link";
import type { OemEquipmentSecondaryBrandPageContent } from "@/content/oemEquipmentSecondaryBrands.types";
import type { OemEquipmentBrandUiAssets } from "@/content/oemEquipmentBrandUi";
import { publicImageExists } from "@/lib/publicImage";

type Props = {
  content: OemEquipmentSecondaryBrandPageContent;
  ui: OemEquipmentBrandUiAssets;
};

/** Clone structure of EchoBrandPage — Echo route keeps EchoBrandPage.tsx untouched. */
export function OemEquipmentBrandPage({ content: p, ui }: Props) {
  const proseLink =
    "[&_a]:font-semibold [&_a]:text-exit-green [&_a]:underline [&_a]:underline-offset-[3px] hover:[&_a]:opacity-85";

  const hasToolsPhoto = publicImageExists(ui.toolsImage);
  const s = ui.slug;
  const toolsMat = ui.toolsImageContain === true;

  return (
    <article className="bg-exit-off-white px-5 py-12 md:px-[60px] md:pb-16 md:pt-14">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 md:gap-14">
        <section
          aria-labelledby={`${s}-why-heading`}
          className="grid gap-10 border-b border-exit-dark/[0.08] pb-12 md:gap-14 md:pb-14 lg:grid-cols-12 lg:items-center lg:gap-12"
        >
          <div className="order-2 min-w-0 lg:order-1 lg:col-span-7">
            <h2
              id={`${s}-why-heading`}
              className="font-display mb-5 text-[clamp(1.5rem,2.75vw,1.875rem)] font-black uppercase tracking-[-0.5px] text-exit-dark"
            >
              {p.whyCarryBrand.title}
            </h2>
            <div className="space-y-4 text-[16px] leading-[1.75] text-exit-gray">
              {p.whyCarryBrand.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="order-1 min-w-0 lg:order-2 lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-exit-dark/[0.07] bg-white shadow-[0_16px_48px_rgba(0,0,0,0.1)] ring-1 ring-black/[0.04]">
              {hasToolsPhoto ? (
                <div
                  className={
                    toolsMat
                      ? "relative aspect-[16/9] w-full overflow-hidden rounded-xl"
                      : "relative aspect-[4/3] w-full"
                  }
                >
                  <Image
                    src={ui.toolsImage}
                    alt={ui.toolsImageAlt}
                    fill
                    className={
                      toolsMat
                        ? "object-cover object-[center_30%]"
                        : "rounded-[inherit] object-cover"
                    }
                    sizes="(max-width:1024px) 100vw, 38vw"
                  />
                </div>
              ) : toolsMat ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                  <OemInlinePlaceholder hint={ui.toolsPlaceholderHint} tall />
                </div>
              ) : (
                <OemInlinePlaceholder hint={ui.toolsPlaceholderHint} tall />
              )}
            </div>
          </div>
        </section>

        <section aria-labelledby={`${s}-resources-heading`} className="mx-auto w-full max-w-[720px]">
          <h2
            id={`${s}-resources-heading`}
            className="font-display mb-5 text-[clamp(1.5rem,2.75vw,1.875rem)] font-black uppercase tracking-[-0.5px] text-exit-dark"
          >
            {p.resources.title}
          </h2>
          <ul className="space-y-3 text-[16px] leading-snug">
            {p.resources.links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-semibold text-exit-green underline underline-offset-[3px] hover:opacity-85"
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby={`${s}-inventory-heading`} className="border-t border-exit-dark/[0.08] pt-12 md:pt-14">
          <h2
            id={`${s}-inventory-heading`}
            className="font-display mb-4 text-[clamp(1.5rem,2.75vw,1.875rem)] font-black uppercase tracking-[-0.5px] text-exit-dark"
          >
            {p.whatWeCarry.title}
          </h2>
          <p className="mb-8 max-w-[720px] text-[16px] leading-[1.75] text-exit-gray">{p.whatWeCarry.intro}</p>

          <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ui.categoryAssets.map((cat) => (
              <CategoryCard
                key={cat.label}
                brandLabel={ui.brandLabel}
                label={cat.label}
                src={cat.src}
                fallbackHint={cat.hint}
                productCardContain={cat.productCardContain}
              />
            ))}
          </div>

          <ul className="mb-8 max-w-[720px] list-disc space-y-2 pl-5 text-[16px] leading-[1.65] text-exit-gray marker:text-exit-green">
            {p.whatWeCarry.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <h3 className="mb-2 max-w-[720px] text-[15px] font-bold uppercase tracking-wide text-exit-dark">{p.whatWeCarry.shopLeadIn}</h3>
          <p className="max-w-[720px] text-[16px] leading-[1.75] text-exit-gray">{p.whatWeCarry.shopDetail}</p>
        </section>

        <section
          aria-labelledby={`${s}-faq-heading`}
          className="mx-auto w-full max-w-[720px] border-t border-exit-dark/[0.08] pt-12 md:pt-14"
        >
          <h2
            id={`${s}-faq-heading`}
            className="font-display mb-8 text-[clamp(1.5rem,2.75vw,1.875rem)] font-black uppercase tracking-[-0.5px] text-exit-dark"
          >
            {p.faqSectionTitle}
          </h2>
          <dl className="space-y-8">
            {p.faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="mb-2 text-[15px] font-bold text-exit-dark">{faq.question}</dt>
                <dd
                  className={`text-[15px] leading-[1.75] text-exit-gray ${proseLink}`}
                  dangerouslySetInnerHTML={{ __html: faq.answerHtml }}
                />
              </div>
            ))}
          </dl>
        </section>

        <section
          aria-labelledby={`${s}-local-heading`}
          className="mx-auto w-full max-w-[720px] border-t border-exit-dark/[0.08] pt-12 md:border-b md:pb-14 md:pt-14"
        >
          <h2
            id={`${s}-local-heading`}
            className="font-display mb-4 text-[clamp(1.5rem,2.75vw,1.875rem)] font-black uppercase tracking-[-0.5px] text-exit-dark"
          >
            {p.localWhy.title}
          </h2>
          <p className="mb-5 text-[16px] leading-[1.75] text-exit-gray">{p.localWhy.intro}</p>
          <ul className="mb-6 list-disc space-y-2 pl-5 text-[16px] leading-[1.65] text-exit-gray marker:text-exit-green">
            {p.localWhy.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="text-[15px] font-medium leading-[1.7] text-exit-dark/90">{p.localWhy.footer}</p>
        </section>
      </div>
    </article>
  );
}

function CategoryCard({
  brandLabel,
  label,
  src,
  fallbackHint,
  productCardContain,
}: {
  brandLabel: string;
  label: string;
  src: string;
  fallbackHint: string;
  productCardContain?: boolean;
}) {
  const exists = publicImageExists(src);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-exit-dark/[0.07] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-700/25 hover:shadow-2xl">
      <div className="relative aspect-square w-full overflow-hidden bg-white">
        {exists ? (
          <div
            className={`absolute inset-0 flex items-center justify-center ${productCardContain ? "p-4" : ""}`}
          >
            <div className="relative h-full w-full min-h-0 min-w-0">
              <Image
                src={src}
                alt={`${brandLabel} ${label}`}
                fill
                className={`object-center transition-transform duration-300 group-hover:scale-[1.04] ${productCardContain ? "object-contain" : "object-cover"}`}
                sizes="(max-width:640px) 100vw, 24vw"
              />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0">
            <OemInlinePlaceholder hint={fallbackHint} />
          </div>
        )}
      </div>
      <div className="border-t border-exit-dark/[0.06] bg-exit-warm px-4 py-3 transition-colors duration-300 group-hover:bg-emerald-50">
        <h3 className="text-[13px] font-black uppercase tracking-wide text-exit-dark">{label}</h3>
      </div>
    </article>
  );
}

function OemInlinePlaceholder({ hint, tall }: { hint: string; tall?: boolean }) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-exit-green/25 bg-exit-warm-mid/40 px-4 text-center ${tall ? "min-h-[200px] py-14 sm:min-h-[240px]" : "py-8"}`}
    >
      <span className="select-none text-2xl opacity-75" aria-hidden>
        📷
      </span>
      <p className="text-[11px] font-bold uppercase tracking-wider text-exit-gray">{hint}</p>
    </div>
  );
}
