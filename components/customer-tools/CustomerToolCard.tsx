import type { ReactNode } from "react";
import Link from "next/link";

type CustomerToolCardProps = {
  title: string;
  href: string;
  ctaLabel: string;
  benefits: readonly string[];
  icon: ReactNode;
  preview: ReactNode;
};

export function CustomerToolCard({
  title,
  href,
  ctaLabel,
  benefits,
  icon,
  preview,
}: CustomerToolCardProps) {
  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[rgba(10,74,42,0.09)] border-b-[3px] border-b-[#159451] bg-[rgba(255,255,255,0.96)] p-[22px] shadow-[0_18px_45px_rgba(14,48,30,0.09),0_3px_10px_rgba(14,48,30,0.04)] transition-[transform,box-shadow] duration-[180ms] ease-out motion-safe:md:hover:-translate-y-[3px] motion-safe:md:hover:shadow-[0_24px_52px_rgba(14,48,30,0.13),0_5px_12px_rgba(14,48,30,0.05)] sm:p-[26px]"
    >
      <div className="grid flex-1 grid-cols-1 items-stretch gap-5 md:grid-cols-[minmax(0,1fr)_minmax(140px,170px)] md:gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(168px,210px)] lg:gap-[22px]">
        <div className="flex min-w-0 flex-col">
          <div className="flex items-start gap-3.5">
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[rgba(16,185,129,0.12)] bg-[linear-gradient(145deg,rgba(16,185,129,0.14),rgba(16,185,129,0.06))] text-[#128047]"
              aria-hidden
            >
              {icon}
            </span>
            <h3 className="font-display pt-1 text-[22px] font-extrabold uppercase leading-[1.05] tracking-tight text-[#0b2114] sm:text-[25px]">
              {title}
            </h3>
          </div>

          <ul className="mt-5 space-y-[11px]">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-2.5 text-[15px] leading-[1.45] text-[#263b30]"
              >
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#159451]" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-7">
            <Link
              href={href}
              className="group/cta inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[7px] border border-[rgba(0,64,34,0.5)] bg-[linear-gradient(180deg,#08763f_0%,#055b31_100%)] px-5 text-[13px] font-bold uppercase tracking-[0.045em] text-white no-underline shadow-[0_7px_16px_rgba(7,104,57,0.18),inset_0_1px_0_rgba(255,255,255,0.15)] transition-[transform,box-shadow,background] duration-[180ms] ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_11px_22px_rgba(7,104,57,0.24),inset_0_1px_0_rgba(255,255,255,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#08763f]/50 md:w-auto"
            >
              <span>{ctaLabel}</span>
              <span
                aria-hidden
                className="inline-block transition-transform duration-[180ms] ease-out motion-safe:group-hover/cta:translate-x-[3px]"
              >
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="min-w-0 md:self-stretch">
          <div className="h-full transition-transform duration-[180ms] ease-out motion-safe:md:group-hover:-translate-y-1.5">
            {preview}
          </div>
        </div>
      </div>
    </article>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M3.5 8.25 6.4 11.1 12.5 4.9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M14.7 6.3a4.2 4.2 0 0 0-5.9 5.9L3 18l3 3 5.8-5.8a4.2 4.2 0 0 0 5.9-5.9l-2.5 2.5-2.5-2.5 2.5-2.5Z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TruckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 7.5h10.5V16H3V7.5Z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 10.5H18l2.5 3V16h-7V10.5Z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="17.5" r="1.6" stroke="currentColor" strokeWidth="1.85" />
      <circle cx="17" cy="17.5" r="1.6" stroke="currentColor" strokeWidth="1.85" />
    </svg>
  );
}
