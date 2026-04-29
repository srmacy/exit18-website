import { siteContent } from "@/content/siteContent";

const articleClass =
  "group flex h-full flex-col rounded-2xl border border-exit-dark/[0.06] bg-white p-6 shadow-[0_4px_28px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.03] transition duration-200 ease-out hover:-translate-y-1 hover:border-exit-green/18 hover:shadow-[0_18px_48px_rgba(0,0,0,0.1)] md:p-7";

export function AboutWhy() {
  const { whyUs } = siteContent.aboutPage;

  return (
    <section
      aria-labelledby="about-why-heading"
      className="px-5 py-12 md:px-[60px] md:py-[3.75rem]"
    >
      <div className="mx-auto max-w-[1200px]">
        <header className="mx-auto mb-11 max-w-3xl text-center md:mb-12">
          <p className="mb-4 inline-block rounded border border-exit-green/15 bg-white px-4 py-[5px] text-[11px] font-bold uppercase tracking-[2.5px] text-exit-green">
            {whyUs.eyebrow}
          </p>
          <h2
            id="about-why-heading"
            className="font-display mt-3 text-[clamp(2rem,4.25vw,3.375rem)] font-black uppercase leading-[0.93] tracking-[-0.5px] text-exit-dark"
          >
            {whyUs.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </header>

        <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 xl:grid-cols-5 xl:gap-5">
          {whyUs.cards.map((c) => (
            <li key={c.title} className="min-w-0">
              <article className={articleClass}>
                <div
                  className="mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-exit-green/25 bg-gradient-to-br from-[#153d24] to-[#0f2918] text-2xl shadow-sm transition duration-200 group-hover:-translate-y-0.5 group-hover:border-exit-lime/40 group-hover:shadow-md"
                  aria-hidden
                >
                  {c.icon}
                </div>
                <h3 className="font-display mb-2.5 flex-1 text-lg font-extrabold uppercase leading-snug tracking-tight text-exit-dark">
                  {c.title}
                </h3>
                <p className="text-[14px] leading-relaxed tracking-tight text-exit-gray">
                  {c.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
