import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/content/siteContent";

export function PortalSection() {
  const { portalPromo, branding, portal } = siteContent;

  return (
    <section className="relative overflow-hidden bg-exit-green px-5 py-16 md:px-[60px] md:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(255,255,255,0.02) 60px, rgba(255,255,255,0.02) 120px)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-[60px]">
        <div>
          <div className="mb-4 inline-flex items-center gap-1.5 rounded border border-exit-lime/35 bg-exit-lime/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[2px] text-exit-lime">
            <span
              className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-exit-lime"
              aria-hidden
            />
            {portalPromo.tag}
          </div>
          <h2 className="font-display mb-[18px] text-[clamp(2.25rem,4vw,3.5rem)] font-black uppercase leading-[0.95] tracking-[-0.5px] text-white">
            {portalPromo.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mb-7 text-base leading-relaxed text-white/[0.72]">
            {portalPromo.description}
          </p>
          <div className="mb-8 flex flex-col gap-3.5">
            {portalPromo.steps.map((step) => (
              <div key={step.number} className="flex gap-3.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-exit-lime/30 bg-exit-lime/15 font-display text-[13px] font-extrabold text-exit-lime">
                  {step.number}
                </div>
                <p
                  className="text-sm leading-normal text-white/75 [&_strong]:text-white"
                  dangerouslySetInnerHTML={{ __html: step.htmlParts }}
                />
              </div>
            ))}
          </div>
          <Link
            href={portal.url}
            className="inline-flex items-center gap-2.5 rounded-md bg-white px-7 py-3.5 text-sm font-extrabold uppercase tracking-wide text-exit-green no-underline shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            {portalPromo.ctaLabel}
          </Link>
        </div>

        <div className="rounded-2xl border border-white/[0.12] bg-[rgba(16,18,22,0.72)] p-7 shadow-[0_40px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          <div className="mb-5 flex items-center gap-2.5 border-b border-white/[0.1] pb-4">
            <Image
              src={branding.logoUrl}
              alt=""
              width={140}
              height={32}
              className="h-8 w-auto"
            />
            <div>
              <div className="font-display text-base font-extrabold uppercase tracking-wide text-white">
                {branding.businessName}
              </div>
              <div className="text-[10px] uppercase tracking-wide text-white/40">
                {portalPromo.previewCard.subtitle}
              </div>
            </div>
          </div>
          {portalPromo.previewCard.machines.map((m) => (
            <div
              key={m.name}
              className="mb-3 flex items-center gap-3 rounded-[10px] bg-white/[0.06] p-3.5"
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-exit-lime/10 text-xl"
                aria-hidden
              >
                {m.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold text-white">
                  {m.name}
                </div>
                <div className="text-[11px] text-white/45">{m.detail}</div>
              </div>
              <span className="ml-auto shrink-0 rounded-[20px] border border-exit-lime/30 bg-exit-lime/15 px-2.5 py-0.5 text-[10px] font-bold whitespace-nowrap text-exit-lime">
                {m.badge}
              </span>
            </div>
          ))}
          <Link
            href={portal.url}
            className="mt-1 flex w-full items-center justify-center rounded-lg border-0 bg-exit-green py-3 text-center font-sans text-[13px] font-bold uppercase tracking-wide text-white no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {portalPromo.previewCard.previewButtonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
