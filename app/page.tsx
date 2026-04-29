import { BrandsStrip } from "@/components/BrandsStrip";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HoursContact } from "@/components/HoursContact";
import { Navbar } from "@/components/Navbar";
import { PortalSection } from "@/components/PortalSection";
import { ServicesSection } from "@/components/ServicesSection";
import { StorySection } from "@/components/StorySection";
import { WaveDivider } from "@/components/WaveDivider";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="scroll-mt-24 pt-16">
        <Hero />
        <BrandsStrip />
        <WaveDivider variant="intoGreen" />
        <PortalSection />
        <WaveDivider variant="outOfGreen" />
        <StorySection />
        <WaveDivider variant="intoServices" />
        <ServicesSection />
        <HoursContact />
      </main>
      <Footer />
    </>
  );
}
