import type { Metadata } from "next";
import { BrandsStrip } from "@/components/BrandsStrip";
import { Footer } from "@/components/Footer";
import { InnerPageHero } from "@/components/InnerPageHero";
import { Navbar } from "@/components/Navbar";
import { WaveDivider } from "@/components/WaveDivider";
import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: siteContent.equipmentPage.seo.title,
  description: siteContent.equipmentPage.seo.description,
};

export default function EquipmentPage() {
  const { hero } = siteContent.equipmentPage;

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <InnerPageHero
          eyebrow={hero.eyebrow}
          headline={hero.headline}
          subheadline={hero.subheadline}
          primaryCta={hero.primaryCta}
          secondaryCta={hero.secondaryCta}
        />
        <WaveDivider variant="warmToDark" />
        <BrandsStrip />
      </main>
      <Footer />
    </>
  );
}
