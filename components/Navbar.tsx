"use client";

import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/content/siteContent";
import { useState } from "react";

export function Navbar() {
  const { navbar, branding } = siteContent;
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-[100] border-b border-white/[0.08] bg-[rgba(14,26,15,0.92)] backdrop-blur-md">
      <nav
        className="flex h-16 items-center justify-between px-4 md:px-10"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="flex h-full min-h-[44px] shrink-0 items-center pr-5 no-underline md:min-h-0 md:pr-8"
          aria-label={branding.businessName}
        >
          <Image
            src="/images/exit18-logo.png"
            alt={branding.logoAlt}
            width={560}
            height={160}
            priority
            sizes="(max-width: 768px) 52vw, 280px"
            className="block h-[38px] w-auto max-w-[min(232px,calc(100vw-120px))] object-contain object-left mix-blend-lighten sm:h-[42px] sm:max-w-[264px] md:h-[44px] lg:h-11 lg:max-w-[292px]"
          />
        </Link>

        <button
          type="button"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-white/20 px-3 text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            className="block"
          >
            {open ? (
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>

        <ul className="hidden list-none items-center gap-6 lg:flex xl:gap-8">
          {navbar.links.map((link) => (
            <li key={link.label + link.href}>
              <Link
                href={link.href}
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={
                  link.variant === "cta"
                    ? "rounded-md bg-exit-lime px-[18px] py-2 text-[13px] font-bold uppercase tracking-wide text-exit-dark no-underline transition duration-200 ease-out hover:opacity-95"
                    : "text-[13px] font-semibold uppercase tracking-[0.08em] text-white/70 no-underline transition-colors duration-200 ease-out hover:text-white"
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div
        id="mobile-nav"
        className={`border-t border-white/10 bg-[rgba(14,26,15,0.98)] px-4 py-3 lg:hidden ${open ? "block" : "hidden"}`}
      >
        <ul className="flex list-none flex-col gap-1">
          {navbar.links.map((link) => (
            <li key={`m-${link.label}`}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={
                  link.variant === "cta"
                    ? "mt-2 flex min-h-11 items-center justify-center rounded-md bg-exit-lime px-4 py-2 text-center text-sm font-bold uppercase tracking-wide text-exit-dark no-underline transition duration-200 ease-out hover:opacity-95"
                    : "flex min-h-11 items-center text-sm font-semibold uppercase tracking-wide text-white/80 no-underline transition-colors duration-200 ease-out hover:text-white"
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
