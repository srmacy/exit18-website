import type { Metadata } from "next";
import { EchoBrandPage } from "@/components/equipment/EchoBrandPage";
import { EchoPageHero } from "@/components/equipment/EchoPageHero";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WaveDivider } from "@/components/WaveDivider";
import { siteContent } from "@/content/siteContent";

const { equipmentEchoPage: p } = siteContent;

export const metadata: Metadata = {
  title: p.seo.title,
  description: p.seo.description,
};

export default function EchoBrandRoutePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <EchoPageHero />
        <WaveDivider variant="warmToOff" />
        <EchoBrandPage />
        <WaveDivider variant="warmToDark" />
      </main>
      <Footer />
    </>
  );
}
