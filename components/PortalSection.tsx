import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/content/siteContent";

function IconSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
      <path
        d="M21 21l-4.3-4.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPackage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path
        d="M12 3l9 5v13a2 2 0 01-2 2H5a2 2 0 01-2-2V8l9-5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M3 9l9 6 9-6M12 12v11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconShoppingBag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path
        d="M6 9h15l-2 13H8L6 9z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 9l1-5h4l1 5M6 22h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconShield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path
        d="M12 3l9 4v6c0 5-4 10-9 11-5-1-9-6-9-11V7l9-4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const stepIcons = [
  IconSearch,
  IconPackage,
  IconShoppingBag,
] as const;

export function PortalSection() {
  const { portalPromo, portal } = siteContent;
  const spotlight = portalPromo.spotlightImage;
  const titles = portalPromo.titleLines;
  const lastIdx = titles.length - 1;

  return (
    <section className="relative overflow-x-hidden bg-exit-green px-6 py-14 md:px-16 lg:px-24 md:py-[4.75rem]">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.47]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 56px, rgba(255,255,255,0.038) 56px, rgba(255,255,255,0.038) 112px)",
        }}
        aria-hidden
      />
      <div className="relative z-[1] mx-auto grid max-w-[1380px] grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.52fr)] md:items-start md:gap-x-10 md:gap-y-0 lg:gap-x-14">
        <div className="flex min-w-0 max-w-xl flex-col pt-1 lg:max-w-none md:pt-0">
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded border border-exit-lime/40 bg-exit-lime/[0.12] px-[11px] py-[6px] text-[10px] font-bold uppercase tracking-[2px] text-exit-lime shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] md:mb-4">
            <span
              className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-exit-lime/90 shadow-[0_0_6px_rgba(124,255,107,0.22)]"
              aria-hidden
            />
            {portalPromo.tag}
          </div>
          <h2 className="font-display mb-5 text-[clamp(2rem,5vw,3.85rem)] font-black uppercase leading-[0.93] tracking-[-0.5px] text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.22)] md:mb-[22px]">
            {titles.map((line, i) => (
              <span
                key={line}
                className={`block ${i === lastIdx ? "mt-1 text-[0.93em] text-exit-lime md:mt-1.5" : ""}`}
              >
                {line}
              </span>
            ))}
          </h2>
          <p className="mb-9 max-w-[36rem] text-[16px] font-medium leading-relaxed tracking-[0.01em] text-white/[0.86] md:mb-10 md:text-[17px] md:leading-snug lg:max-w-[38rem]">
            {portalPromo.description}
          </p>
          <div className="mb-10 flex flex-col gap-4 md:mb-10 md:gap-[18px]">
            {portalPromo.steps.map((step, i) => {
              const StepIcon = stepIcons[i] ?? IconSearch;
              return (
                <div key={step.number} className="flex gap-3 sm:gap-4">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-exit-lime/40 bg-exit-lime/[0.14] font-display text-[13px] font-extrabold leading-none text-exit-lime shadow-[0_2px_12px_rgba(0,0,0,0.12)] sm:h-8 sm:w-8">
                    {step.number}
                  </div>
                  <div className="text-exit-lime/90 shrink-0 pt-[6px]" aria-hidden>
                    <StepIcon className="h-[22px] w-[22px]" strokeWidth={1.85} />
                  </div>
                  <p
                    className="min-w-0 flex-1 pt-[5px] text-[15px] font-medium leading-snug text-white/[0.9] [&_strong]:font-bold [&_strong]:text-white"
                    dangerouslySetInnerHTML={{ __html: step.htmlParts }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-start">
            <Link
              href={portal.url}
              className="group/portal inline-flex min-h-[52px] w-full shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-[#fafdfa] px-8 py-[14px] text-[14px] font-black uppercase tracking-[0.055em] text-exit-green no-underline shadow-[0_10px_40px_rgba(0,0,0,0.22)] ring-1 ring-white/80 ring-inset transition-[transform,background-color,box-shadow,ring-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-white hover:text-[#0f3820] hover:shadow-[0_18px_48px_rgba(0,0,0,0.28)] hover:ring-white sm:w-auto md:min-w-[240px]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {portalPromo.ctaLabel}
              <IconArrowRight className="h-[18px] w-[18px] transition-transform duration-300 ease-out group-hover/portal:translate-x-1" strokeWidth={2.25} />
            </Link>
          </div>
          <p className="mt-8 flex max-w-lg items-start gap-2 border-t border-white/[0.13] pt-6 text-[12px] font-medium leading-snug tracking-[0.01em] text-white/[0.55] md:mt-[1.875rem] md:gap-2.5 md:pt-[1.625rem] md:text-[13px]">
            <IconShield className="mt-0.5 h-[17px] w-[17px] shrink-0 text-exit-lime/70" strokeWidth={1.75} aria-hidden />
            <span>{portalPromo.trustNote}</span>
          </p>
        </div>

        <div className="relative z-[1] min-w-0 w-full py-2 md:w-full md:pb-8 md:pt-[3.25rem]">
          <Link
            href={portal.url}
            className="block rounded-2xl transition-opacity duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white hover:opacity-[0.98]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="relative translate-y-[6px]">
              <div
                className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-6 w-40 -translate-x-1/2 rounded-full bg-black/10 blur-md"
                aria-hidden
              />
              <Image
                src={spotlight.src}
                width={spotlight.width}
                height={spotlight.height}
                alt={spotlight.alt}
                className="relative z-[1] block h-auto w-full rounded-2xl object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 54vw, 820px"
                priority
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
