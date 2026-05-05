import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/content/siteContent";
import { publicImageExists } from "@/lib/publicImage";

const TOOLS_IMG = "/images/echo-tools.jpg";

const CATEGORY_ASSETS = [
  { label: "Trimmers", src: "/images/echo-category-trimmers.jpg", hint: "Trimmers" },
  { label: "Chainsaws", src: "/images/echo-category-chainsaws.jpg", hint: "Chainsaws" },
  { label: "Blowers", src: "/images/echo-category-blowers.jpg", hint: "Blowers" },
  { label: "Accessories", src: "/images/echo-category-accessories.jpg", hint: "Accessories" },
] as const;

/** `/equipment/echo` — legacy echo.html copy adapted to Exit 18 layout */
export function EchoBrandPage() {
  const { equipmentEchoPage: p } = siteContent;

  const proseLink =
    "[&_a]:font-semibold [&_a]:text-exit-green [&_a]:underline [&_a]:underline-offset-[3px] hover:[&_a]:opacity-85";

  const hasToolsPhoto = publicImageExists(TOOLS_IMG);

  return (
    <article className="bg-exit-off-white px-5 py-12 md:px-[60px] md:pb-16 md:pt-14">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 md:gap-14">
        <section
          aria-labelledby="echo-why-heading"
          className="grid gap-10 border-b border-exit-dark/[0.08] pb-12 md:gap-14 md:pb-14 lg:grid-cols-12 lg:items-center lg:gap-12"
        >
          <div className="order-2 min-w-0 lg:order-1 lg:col-span-7">
            <h2
              id="echo-why-heading"
              className="font-display mb-5 text-[clamp(1.5rem,2.75vw,1.875rem)] font-black uppercase tracking-[-0.5px] text-exit-dark"
            >
              {p.whyCarryEcho.title}
            </h2>
            <div className="space-y-4 text-[16px] leading-[1.75] text-exit-gray">
              {p.whyCarryEcho.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="order-1 min-w-0 lg:order-2 lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-exit-dark/[0.07] bg-white shadow-[0_16px_48px_rgba(0,0,0,0.1)] ring-1 ring-black/[0.04]">
              {hasToolsPhoto ? (
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={TOOLS_IMG}
                    alt="Echo handheld trimmers and outdoor power equipment at Exit 18"
                    fill
                    className="object-cover rounded-[inherit]"
                    sizes="(max-width:1024px) 100vw, 38vw"
                  />
                </div>
              ) : (
                <EchoInlinePlaceholder hint="Echo tools image" tall />
              )}
            </div>
          </div>
        </section>

        <section aria-labelledby="echo-resources-heading" className="mx-auto w-full max-w-[720px]">
          <h2
            id="echo-resources-heading"
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

        <section aria-labelledby="echo-inventory-heading" className="border-t border-exit-dark/[0.08] pt-12 md:pt-14">
          <h2
            id="echo-inventory-heading"
            className="font-display mb-4 text-[clamp(1.5rem,2.75vw,1.875rem)] font-black uppercase tracking-[-0.5px] text-exit-dark"
          >
            {p.whatWeCarry.title}
          </h2>
          <p className="mb-8 max-w-[720px] text-[16px] leading-[1.75] text-exit-gray">{p.whatWeCarry.intro}</p>

          <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORY_ASSETS.map((cat) => (
              <CategoryCard key={cat.label} label={cat.label} src={cat.src} fallbackHint={`Echo ${cat.hint}`} />
            ))}
          </div>

          <ul className="mb-8 max-w-[720px] list-disc space-y-2 pl-5 text-[16px] leading-[1.65] text-exit-gray marker:text-exit-green">
            {p.whatWeCarry.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <h3 className="mb-2 max-w-[720px] text-[15px] font-bold uppercase tracking-wide text-exit-dark">
            {p.whatWeCarry.shopLeadIn}
          </h3>
          <p className="max-w-[720px] text-[16px] leading-[1.75] text-exit-gray">{p.whatWeCarry.shopDetail}</p>
        </section>

        <section
          aria-labelledby="echo-faq-heading"
          className="mx-auto w-full max-w-[720px] border-t border-exit-dark/[0.08] pt-12 md:pt-14"
        >
          <h2
            id="echo-faq-heading"
            className="font-display mb-8 text-[clamp(1.5rem,2.75vw,1.875rem)] font-black uppercase tracking-[-0.5px] text-exit-dark"
          >
            Echo power equipment FAQs
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
          aria-labelledby="echo-local-heading"
          className="mx-auto w-full max-w-[720px] border-t border-exit-dark/[0.08] pt-12 md:border-b md:pb-14 md:pt-14"
        >
          <h2
            id="echo-local-heading"
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

function CategoryCard({ label, src, fallbackHint }: { label: string; src: string; fallbackHint: string }) {
  const exists = publicImageExists(src);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-exit-dark/[0.07] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-700/25 hover:shadow-2xl">
      <div className="relative aspect-square w-full overflow-hidden bg-white">
        {exists ? (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="relative h-full w-full min-h-0 min-w-0">
              <Image
                src={src}
                alt={`Echo ${label}`}
                fill
                className="object-contain object-center transition-transform duration-300 group-hover:scale-[1.04]"
                sizes="(max-width:640px) 100vw, 24vw"
              />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0">
            <EchoInlinePlaceholder hint={fallbackHint} />
          </div>
        )}
      </div>
      <div className="border-t border-exit-dark/[0.06] bg-exit-warm px-4 py-3 transition-colors duration-300 group-hover:bg-emerald-50">
        <h3 className="text-[13px] font-black uppercase tracking-wide text-exit-dark">{label}</h3>
      </div>
    </article>
  );
}

function EchoInlinePlaceholder({ hint, tall }: { hint: string; tall?: boolean }) {
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
