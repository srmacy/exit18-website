import { siteContent } from "@/content/siteContent";
import { ServiceRequestForm } from "./ServiceRequestForm";

export function ServiceRequestSection() {
  const { requestSection } = siteContent.servicePage;
  const { hoursContact, contact } = siteContent;

  return (
    <section
      id="request-service"
      aria-labelledby="service-request-heading"
      className="scroll-mt-24 border-t border-black/[0.04] bg-exit-off-white px-5 py-12 md:px-[60px] md:py-[3.75rem]"
    >
      <div className="mx-auto max-w-[1200px]">
        <h2 id="service-request-heading" className="sr-only">
          Request service
        </h2>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <aside className="lg:col-span-5">
            <div className="sticky top-24 rounded-2xl bg-exit-green p-8 text-white shadow-[0_28px_72px_rgba(0,0,0,0.2)] md:p-10">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.35em] text-exit-lime/90">
                Service desk
              </p>
              <h3 className="font-display mt-3 text-[clamp(1.5rem,2.5vw,1.875rem)] font-black uppercase leading-tight tracking-tight">
                {requestSection.infoHeadline}
              </h3>
              <p className="mt-5 text-[15px] leading-relaxed text-white/88">
                {requestSection.infoIntro}
              </p>

              <div className="my-8 border-t border-white/15" />

              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-exit-lime/90">
                {hoursContact.hoursTitle}
              </p>
              <ul className="mt-3 space-y-2.5 text-[14px] leading-snug">
                {hoursContact.hours.map((row) => (
                  <li
                    key={row.day}
                    className="flex justify-between gap-4 border-b border-white/10 pb-2 last:border-0"
                  >
                    <span className="font-medium text-white/70">{row.day}</span>
                    <span
                      className={
                        row.closed
                          ? "text-white/35"
                          : "font-semibold text-white"
                      }
                    >
                      {row.hours}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={`tel:${contact.phoneTel}`}
                className="mt-6 inline-flex text-[15px] font-bold text-exit-lime underline-offset-4 hover:underline"
              >
                Call {contact.phoneDisplay}
              </a>

              <ul className="mt-8 list-disc space-y-2.5 pl-4 text-[14px] leading-relaxed text-white/84 marker:text-exit-lime">
                {requestSection.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              <p className="mt-10 text-[13px] italic leading-relaxed text-white/70">
                {requestSection.rateNote}
              </p>
            </div>
          </aside>

          <div className="lg:col-span-7">
            <ServiceRequestForm />
          </div>
        </div>
      </div>
    </section>
  );
}
