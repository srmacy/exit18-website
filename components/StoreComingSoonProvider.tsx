"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/** Internal paths that open the Store coming-soon modal instead of navigating. */
export const storeComingSoonPath = "/store" as const;

type StoreComingSoonContextValue = {
  openStoreComingSoon: () => void;
};

const StoreComingSoonContext = createContext<StoreComingSoonContextValue | null>(
  null,
);

export function useStoreComingSoon(): StoreComingSoonContextValue {
  const ctx = useContext(StoreComingSoonContext);
  if (!ctx) {
    throw new Error(
      "useStoreComingSoon must be used within StoreComingSoonProvider.",
    );
  }
  return ctx;
}

/** Link, mailto:, tel:, or `/store` button — keeps one pattern for CTAs across the site. */
export function StoreAwareLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  const { openStoreComingSoon } = useStoreComingSoon();

  if (href === storeComingSoonPath) {
    return (
      <button type="button" onClick={openStoreComingSoon} className={className}>
        {children}
      </button>
    );
  }

  if (href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function StoreComingSoonProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const openStoreComingSoon = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  return (
    <StoreComingSoonContext.Provider value={{ openStoreComingSoon }}>
      {children}
      {open ? (
        <div className="fixed inset-0 z-[220] flex items-center justify-center p-5 sm:p-6">
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            onClick={close}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="store-coming-soon-title"
            className="relative z-[1] mx-auto w-full max-w-[min(100%,28rem)] rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_24px_80px_rgba(14,26,15,0.18)] sm:p-8"
          >
            <div
              className="mb-4 h-1 w-12 rounded-full bg-exit-green"
              aria-hidden
            />
            <h2
              id="store-coming-soon-title"
              className="font-display text-xl font-black uppercase tracking-[0.06em] text-exit-dark sm:text-2xl"
            >
              Online Store Coming Soon
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-exit-gray">
              We&apos;re working on a better way to browse equipment, parts, and
              accessories online. Soon you&apos;ll be able to shop directly from
              Exit 18 Equipment with a cleaner, easier ordering experience.
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-exit-dark/55">
              In the meantime, give us a call or stop by and we&apos;ll help you
              find what you need.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:justify-end">
              <Link
                href="/contact"
                onClick={close}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border-2 border-exit-green bg-exit-green px-6 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-white no-underline transition duration-200 hover:border-exit-green-mid hover:bg-exit-green-mid sm:flex-none"
              >
                Contact Us
              </Link>
              <button
                type="button"
                onClick={close}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border-2 border-exit-dark/12 bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-exit-dark transition duration-200 hover:border-exit-green/40 sm:flex-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </StoreComingSoonContext.Provider>
  );
}
