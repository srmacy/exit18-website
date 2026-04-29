import Link from "next/link";
import { siteContent } from "@/content/siteContent";

export function AboutClosingCta() {
  const { closingCta: c } = siteContent.aboutPage;

  return (
    <section
      aria-labelledby="about-close-cta-heading"
      className="relative overflow-hidden bg-exit-green px-5 py-12 md:px-[60px] md:py-[3.75rem]"
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
          id="about-close-cta-heading"
          className="font-display mb-5 max-w-[22ch] mx-auto text-[clamp(2.125rem,4.5vw,2.875rem)] font-black uppercase leading-[0.98] tracking-[-0.5px] text-white"
        >
          {c.headline}
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-[16px] leading-[1.7] text-white/[0.78]">
          {c.body}
        </p>
        <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-5">
          <Link
            href={c.primary.href}
            className="inline-flex min-h-[48px] min-w-[220px] items-center justify-center gap-2 rounded-md bg-exit-lime px-9 py-3.5 text-sm font-extrabold uppercase tracking-[0.05em] text-exit-dark no-underline shadow-[0_8px_32px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:bg-[#96ff82] hover:shadow-[0_12px_40px_rgba(0,0,0,0.28)]"
          >
            {c.primary.label}
          </Link>
          <Link
            href={c.secondary.href}
            className="inline-flex min-h-[48px] min-w-[220px] items-center justify-center gap-2 rounded-md border-[1.5px] border-white/55 bg-transparent px-9 py-3.5 text-sm font-bold uppercase tracking-[0.05em] text-white no-underline transition hover:border-white hover:bg-white/10"
            target="_blank"
            rel="noopener noreferrer"
          >
            {c.secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
