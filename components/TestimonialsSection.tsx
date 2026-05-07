import { siteContent } from "@/content/siteContent";

export function TestimonialsSection() {
  const { testimonials } = siteContent;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="scroll-mt-24 border-t border-emerald-900/10 bg-gradient-to-b from-exit-off-white via-[#f3f8f5] to-exit-off-white px-5 py-16 md:px-[60px] md:py-[5.25rem]"
    >
      <div className="mx-auto max-w-[1200px]">
        <h2
          id="testimonials-heading"
          className="font-display mb-12 text-center text-[clamp(1.875rem,3.8vw,2.75rem)] font-black leading-[1.08] tracking-[-0.02em] text-exit-dark md:mb-14"
        >
          {testimonials.title}
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7 lg:items-stretch">
          {testimonials.items.map((item) => (
            <article
              key={item.name}
              className="relative flex h-full flex-col rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_8px_32px_rgba(14,26,15,0.06)] md:p-7"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-2 right-4 font-display text-[4.75rem] font-black leading-[0.85] tracking-tighter text-emerald-900/[0.07] md:right-5 md:text-[5.25rem]"
              >
                “
              </span>
              <span className="sr-only">
                Rated {item.ratingStars} out of 5 stars
              </span>
              <div
                className="relative z-[1] mb-5 flex shrink-0 items-center gap-px text-[clamp(17px,1.15vw,19px)] leading-none text-[#c89412] drop-shadow-[0_0.5px_0_rgba(255,237,185,0.55)]"
                aria-hidden
              >
                {Array.from({ length: item.ratingStars }, (_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <blockquote className="relative z-[1] mb-6 flex-1 border-l-2 border-emerald-600/25 pl-4">
                <p className="text-[14px] font-normal leading-[1.7] tracking-wide text-exit-dark/[0.9] md:text-[15px] md:leading-[1.68]">
                  {item.quote}
                </p>
              </blockquote>
              <footer className="mt-auto shrink-0 border-t border-black/[0.06] pt-5">
                <cite className="font-display text-[14px] font-bold tracking-[0.04em] text-exit-green not-italic">
                  — {item.name}
                </cite>
              </footer>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center md:mt-14">
          <a
            href={testimonials.leaveReviewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-md border-2 border-exit-green bg-transparent px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.14em] text-[#14501f] no-underline shadow-sm outline-none ring-exit-green/35 transition-[color,background-color,box-shadow,border-color] duration-200 ease-out hover:border-exit-green hover:bg-emerald-500/[0.11] hover:text-exit-green hover:shadow-[0_6px_20px_rgba(26,92,42,0.14)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-exit-off-white"
          >
            {testimonials.leaveReviewLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
