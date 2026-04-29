import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ServiceBrandsStrip } from "@/components/service/ServiceBrandsStrip";
import { ServiceClosingCta } from "@/components/service/ServiceClosingCta";
import { ServiceHero } from "@/components/service/ServiceHero";
import { ServicePickup } from "@/components/service/ServicePickup";
import { ServiceRequestSection } from "@/components/service/ServiceRequestSection";
import { ServiceWhy } from "@/components/service/ServiceWhy";
import { WaveDivider } from "@/components/WaveDivider";
import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: "Service & Repairs",
  description: siteContent.servicePage.seo.description,
};

export default function ServicePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <ServiceHero />
        <WaveDivider variant="warmToOff" />
        <ServiceWhy />
        <ServiceRequestSection />
        <WaveDivider variant="offTowarm" />
        <ServicePickup />
        <WaveDivider variant="warmToDark" />
        <ServiceBrandsStrip />
        <WaveDivider variant="darkToGreen" />
        <ServiceClosingCta />
      </main>
      <Footer />
    </>
  );
}
