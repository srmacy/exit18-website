"use client";

/**
 * TEMPORARY — Annual inventory closure notice (through July 20, 2026).
 * Delete this file and remove `<InventoryClosureModal />` from `app/layout.tsx` when no longer needed.
 */

import { useCallback, useEffect, useState } from "react";

/** Active immediately through end of July 20 (ET); stops at midnight July 21. */
const INVENTORY_CLOSURE_END_MS = Date.parse("2026-07-21T00:00:00-04:00");
const SESSION_STORAGE_KEY = "inventory-closure-2026-dismissed";

export function InventoryClosureModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (
      Number.isNaN(INVENTORY_CLOSURE_END_MS) ||
      Date.now() >= INVENTORY_CLOSURE_END_MS
    ) {
      return;
    }
    try {
      if (sessionStorage.getItem(SESSION_STORAGE_KEY)) return;
    } catch {
      return;
    }

    const id = window.setTimeout(() => setOpen(true), 2500);
    return () => window.clearTimeout(id);
  }, []);

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, "1");
    } catch {
      /* ignore private mode / quota */
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <>
      <style>{`
        @keyframes inventory-closure-2026-title-in {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .inventory-closure-2026-title-in {
          animation: inventory-closure-2026-title-in 280ms ease-out both;
          transform-origin: left center;
        }
        @media (prefers-reduced-motion: reduce) {
          .inventory-closure-2026-title-in {
            animation: none;
          }
        }
      `}</style>
      <div className="fixed inset-0 z-[225] flex items-center justify-center p-5 sm:p-6">
        <button
          type="button"
          aria-label="Close dialog"
          className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
          onClick={dismiss}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="inventory-closure-2026-title"
          className="relative z-[1] mx-auto w-full max-w-[min(100%,28rem)] rounded-2xl border border-exit-green/15 bg-white p-6 shadow-[0_24px_80px_rgba(14,26,15,0.18)] ring-1 ring-exit-green/10 sm:p-8"
        >
          <div
            className="mb-4 h-1 w-12 rounded-full bg-exit-green"
            aria-hidden
          />
          <div className="inventory-closure-2026-title-in flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span
              className="shrink-0 select-none text-[1.125rem] leading-none sm:text-[1.25rem]"
              aria-hidden
            >
              📋
            </span>
            <h2
              id="inventory-closure-2026-title"
              className="font-display min-w-0 flex-1 text-xl font-black uppercase tracking-[0.06em] text-exit-dark sm:text-2xl"
            >
              Inventory Closure
            </h2>
          </div>
          <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-exit-gray">
            <p>
              Exit 18 Equipment will be closed Thursday, July 17 through Sunday,
              July 20 for our annual inventory count.
            </p>
            <p>
              We will reopen with normal business hours on Monday, July 21.
            </p>
            <p>
              Thank you for your patience while we complete this important yearly
              process.
            </p>
          </div>
          <div className="mt-8 flex justify-end sm:mt-9">
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex min-h-11 min-w-[7.5rem] items-center justify-center rounded-full border-2 border-exit-green bg-exit-green px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition duration-200 hover:border-exit-green-mid hover:bg-exit-green-mid"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
