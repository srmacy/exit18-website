import Link from "next/link";
import { siteContent } from "@/content/siteContent";

export function StorePartsPortalCta() {
  const { storePage, portal } = siteContent;

  return (
    <section className="border-t border-black/[0.06] bg-exit-off-white px-5 py-16 md:px-[60px]">
      <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
        <Link
          href={portal.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-exit-green/90 bg-transparent px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-exit-green no-underline shadow-sm shadow-black/[0.04] transition duration-200 ease-out hover:border-exit-green hover:bg-exit-green hover:text-white"
        >
          {storePage.partsPortalCta.label}
        </Link>
      </div>
    </section>
  );
}
