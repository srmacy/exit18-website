"use client";

import { useId, useState, type ReactNode } from "react";

type MoreWaysAccordionProps = {
  children: ReactNode;
};

/** Expand/collapse for homepage “More Ways We Can Help”. */
export function MoreWaysAccordion({ children }: MoreWaysAccordionProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="mt-5">
      <button
        type="button"
        className="customer-tools-more grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 text-left sm:gap-4 sm:px-5"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[rgb(var(--dealer-accent-rgb)/0.28)] bg-[rgb(var(--dealer-accent-rgb)/0.1)] text-[var(--dealer-accent)]"
          aria-hidden
        >
          <GridIcon />
        </span>

        <span className="min-w-0">
          <span className="block font-display text-[clamp(1.05rem,2.4vw,1.35rem)] font-extrabold uppercase tracking-tight text-[#f5f7f5]">
            More Ways We Can Help
          </span>
          <span className="mt-1 block text-[13px] leading-snug text-[rgba(240,245,241,0.62)]">
            Additional online tools coming soon to make equipment ownership even
            easier.
          </span>
        </span>

        <span
          className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[rgb(var(--dealer-accent-rgb)/0.12)] text-[var(--dealer-accent)] transition-transform duration-300 ease-out motion-reduce:transition-none ${
            open ? "rotate-90" : ""
          }`}
          aria-hidden
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        id={panelId}
        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className={`pt-5 transition-opacity duration-300 motion-reduce:transition-none ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="3.5"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.85"
      />
      <rect
        x="13.5"
        y="3.5"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.85"
      />
      <rect
        x="3.5"
        y="13.5"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.85"
      />
      <rect
        x="13.5"
        y="13.5"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.85"
      />
    </svg>
  );
}
