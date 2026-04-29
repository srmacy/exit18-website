import Link from "next/link";
import { siteContent } from "@/content/siteContent";

export function Footer() {
  const { footer } = siteContent;

  return (
    <footer className="flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] bg-[#080f08] px-5 py-7 md:flex-row md:items-center md:px-[60px]">
      <p className="text-xs text-white/30">{footer.copyright}</p>
      <nav aria-label="Footer" className="flex flex-wrap gap-4 md:gap-5">
        {footer.links.map((l) => (
          <Link
            key={l.label + l.href}
            href={l.href}
            className="text-xs text-white/35 no-underline transition hover:text-white/70"
            {...(l.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
