import Link from "next/link";
import { siteContent } from "@/content/siteContent";

export function ServiceClosingCta() {
  const { closingCta: c } = siteContent.servicePage;

  return (
    <section
      aria-labelledby="service-footer-cta-heading"
      className="relative overflow-hidden bg-exit-green px-5 py-12 md:px-[60px] md:py-[3.25rem]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(255,255,255,0.018) 60px, rgba(255,255,255,0.018) 120px)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-[1100px] flex-col items-center gap-8 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="flex max-w-xl flex-col gap-4 text-center md:flex-row md:items-center md:gap-8 md:text-left">
          <span
            className="mx-auto flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-3xl md:mx-0"
            aria-hidden
          >
            📅
          </span>
          <div>
            <h2
              id="service-footer-cta-heading"
              className="font-display text-[clamp(1.5rem,3vw,2.125rem)] font-black uppercase leading-tight tracking-[-0.5px] text-white"
            >
              {c.headline}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-white/[0.78]">
              {c.body}
            </p>
          </div>
        </div>

        <Link
          href={c.buttonHref}
          className="inline-flex shrink-0 min-h-[52px] min-w-[260px] items-center justify-center gap-2 rounded-md bg-white px-8 py-4 text-center text-sm font-extrabold uppercase tracking-[0.06em] text-exit-green no-underline shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:bg-exit-off-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
        >
          {c.buttonLabel}
          <span aria-hidden>›</span>
        </Link>
      </div>
    </section>
  );
}
