import type { ReactNode } from "react";
import Link from "next/link";

type CustomerToolCardProps = {
  title: string;
  tagline: string;
  href: string;
  ctaLabel: string;
  benefits: readonly string[];
  icon: ReactNode;
  preview: ReactNode;
};

export function CustomerToolCard({
  title,
  tagline,
  href,
  ctaLabel,
  benefits,
  icon,
  preview,
}: CustomerToolCardProps) {
  return (
    <article className="customer-tools-card group h-full overflow-hidden p-5 md:p-[clamp(1.35rem,2vw,1.8rem)]">
      <div className="customer-tool-card-content">
        <div className="customer-tool-copy flex min-w-0 flex-col">
          <div className="flex items-start gap-[0.9rem]">
            <span className="customer-tools-icon-wrap shrink-0" aria-hidden>
              {icon}
            </span>
            <div className="min-w-0 pt-0.5">
              <h3 className="font-display text-[clamp(1.75rem,2.4vw,2.35rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.025em] text-[#f6f8f6]">
                {formatTitle(title)}
              </h3>
              <p className="mt-[0.65rem] text-[14px] font-semibold leading-[1.4] text-[var(--dealer-accent)]">
                {tagline}
              </p>
            </div>
          </div>

          <ul className="mt-[1.1rem] space-y-[0.72rem]">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-2.5 text-[14px] leading-[1.4] text-[rgba(245,248,246,0.86)] sm:text-[15px]"
              >
                <span className="customer-tools-check mt-0.5" aria-hidden>
                  <CheckMark />
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="customer-tool-preview min-w-0">
          <div className="transition-transform duration-[220ms] ease-out motion-safe:md:group-hover:-translate-y-1.5">
            {preview}
          </div>
        </div>

        <div className="customer-tool-cta-row">
          <Link href={href} className="customer-tool-cta">
            <span className="customer-tool-cta-label">{ctaLabel}</span>
            <span className="customer-tool-cta-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Prefer a clean two-line wrap for “Pickup & Delivery” on desktop. */
function formatTitle(title: string) {
  if (title === "Pickup & Delivery") {
    return (
      <>
        Pickup &amp;{" "}
        <span className="md:block">Delivery</span>
      </>
    );
  }
  return title;
}

function CheckMark() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
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

/** Mechanical wrench + partial gear badge for Service Request. */
export function ServiceRequestIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="30"
      height="30"
      viewBox="0 0 34 34"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="24.5"
        cy="9.5"
        r="5.2"
        stroke="currentColor"
        strokeWidth="1.7"
        opacity="0.55"
      />
      <path
        d="M24.5 5.2v1.4M24.5 12.4v1.4M20.2 9.5h1.4M27.4 9.5h1.4M21.5 6.5l1 1M26.5 11.5l1 1M26.5 6.5l-1 1M21.5 11.5l-1 1"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M18.2 8.4a5.4 5.4 0 0 0-7.6 7.6L4 22.6 7.4 26l6.6-6.6a5.4 5.4 0 0 0 7.6-7.6l-3.2 3.2-3.2-3.2 3.2-3.2Z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12.6" cy="14" r="1.35" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

/** Utility truck with subtle gear detail for Pickup & Delivery. */
export function PickupTruckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="30"
      height="30"
      viewBox="0 0 34 34"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 12.5h13.5V22H3.5v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinejoin="round"
      />
      <path
        d="M17 15.5h6.2L26.5 19.2V22H17v-6.5Z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 12.5 6 9h7.5l1.5 3.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="8.2" cy="23.5" r="2.1" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="22.2" cy="23.5" r="2.1" stroke="currentColor" strokeWidth="1.7" />
      <circle
        cx="27.2"
        cy="8.8"
        r="3.4"
        stroke="currentColor"
        strokeWidth="1.45"
        opacity="0.5"
      />
      <path
        d="M27.2 6.2v1M27.2 10.4v1M24.6 8.8h1M28.8 8.8h1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
