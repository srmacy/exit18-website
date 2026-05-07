import { StoreAwareLink } from "@/components/StoreComingSoonProvider";
import { siteContent } from "@/content/siteContent";

export function Footer() {
  const { footer } = siteContent;

  return (
    <footer className="flex flex-col items-start justify-between gap-3 border-t border-white/[0.04] bg-[#050a06] px-5 py-4 md:flex-row md:items-center md:px-[60px] md:py-5">
      <p className="text-[11px] leading-snug tracking-wide text-white/[0.22]">
        {footer.copyright}
      </p>
      <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 md:gap-x-6">
        {footer.links.map((l) => (
          <StoreAwareLink
            key={l.label + l.href}
            href={l.href}
            className="text-[11px] text-white/[0.28] no-underline transition hover:text-white/55"
          >
            {l.label}
          </StoreAwareLink>
        ))}
      </nav>
    </footer>
  );
}
