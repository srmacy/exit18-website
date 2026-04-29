import Link from "next/link";
import { siteContent } from "@/content/siteContent";

type HoursContactProps = { sectionId?: string };

export function HoursContact({ sectionId = "hours" }: HoursContactProps) {
  const { hoursContact } = siteContent;

  return (
    <section
      id={sectionId}
      className="scroll-mt-24 grid grid-cols-1 gap-10 bg-exit-dark px-5 py-12 md:grid-cols-2 md:gap-[60px] md:px-[60px] md:py-14"
    >
      <div>
        <h2 className="font-display mb-6 text-[36px] font-black uppercase leading-tight text-white md:text-[42px]">
          {hoursContact.hoursTitle}
        </h2>
        <ul className="list-none p-0">
          {hoursContact.hours.map((row) => (
            <li
              key={row.day}
              className="flex justify-between gap-4 border-b border-white/[0.08] py-2.5 text-sm"
            >
              <span className="font-medium text-white/60">{row.day}</span>
              <span
                className={
                  row.closed ? "font-medium text-white/30" : "font-semibold text-white"
                }
              >
                {row.hours}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        {hoursContact.contact.map((c) => (
          <div key={c.label} className="flex items-start gap-3.5">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-exit-lime/20 bg-exit-lime/10 text-base"
              aria-hidden
            >
              {c.icon}
            </div>
            <div>
              <div className="mb-0.5 text-[11px] font-bold uppercase tracking-wide text-white/40">
                {c.label}
              </div>
              {c.href ? (
                <Link
                  href={c.href}
                  className="text-[15px] font-semibold text-white no-underline hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {c.value}
                </Link>
              ) : (
                <div className="text-[15px] font-semibold text-white">
                  {c.value}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
