import type { Metadata } from "next";
import { BrandsStrip } from "@/components/BrandsStrip";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { StoreHero } from "@/components/store/StoreHero";
import { StorePartsPortalCta } from "@/components/store/StorePartsPortalCta";
import { StoreShopSection } from "@/components/store/StoreShopSection";
import { WaveDivider } from "@/components/WaveDivider";
import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: siteContent.storePage.seo.title,
  description: siteContent.storePage.seo.description,
};

export default function StorePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <StoreHero />
        <BrandsStrip />
        <WaveDivider variant="intoGreen" />
        <div className="h-14 shrink-0 bg-exit-green" aria-hidden />
        <WaveDivider variant="outOfGreen" />
        <StoreShopSection />
        <WaveDivider variant="warmToOff" />
        <StorePartsPortalCta />
      </main>
      <Footer />
    </>
  );
}
