import { BenchlineToolEmbed } from "@/components/benchline/BenchlineToolEmbed";
import { siteContent } from "@/content/siteContent";

export function ServiceRequestSection() {
  const { requestSection } = siteContent.servicePage;
  const { contact } = siteContent;

  return (
    <section
      id="request-service"
      aria-labelledby="service-request-heading"
      className="scroll-mt-24 border-t border-black/[0.04] bg-exit-off-white px-5 py-12 md:px-[60px] md:py-[3.75rem]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 max-w-3xl md:mb-10">
          <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[2px] text-exit-green">
            Service desk
          </p>
          <h2
            id="service-request-heading"
            className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-black uppercase leading-tight tracking-tight text-exit-dark"
          >
            {requestSection.infoHeadline}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-exit-gray">
            {requestSection.infoIntro}
          </p>
          <p className="mt-3 text-[14px] text-exit-gray">
            Prefer to call?{" "}
            <a
              href={`tel:${contact.phoneTel}`}
              className="font-semibold text-exit-green underline-offset-2 hover:underline"
            >
              {contact.phoneDisplay}
            </a>
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-[#0b1317] shadow-[0_28px_72px_rgba(0,0,0,0.18)]">
          <BenchlineToolEmbed
            src="https://app.mybenchline.com/exit18/service-request?embed=1"
            title="Exit 18 Equipment Service Request"
            tool="service-request"
            defaultHeight={900}
          />
        </div>
      </div>
    </section>
  );
}
