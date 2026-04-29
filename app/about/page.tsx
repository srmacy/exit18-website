import type { Metadata } from "next";
import { AboutClosingCta } from "@/components/about/AboutClosingCta";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutLegacy } from "@/components/about/AboutLegacy";
import { AboutTeamFeature } from "@/components/about/AboutTeamFeature";
import { AboutWhy } from "@/components/about/AboutWhy";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WaveDivider } from "@/components/WaveDivider";
import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: "About",
  description: siteContent.aboutPage.seo.description,
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <AboutHero />
        <WaveDivider variant="warmToGreen" />
        <AboutLegacy />
        <WaveDivider variant="outOfGreen" />
        <AboutWhy />
        <WaveDivider variant="intoServices" />
        <AboutTeamFeature />
        <WaveDivider variant="warmToGreen" />
        <AboutClosingCta />
      </main>
      <Footer />
    </>
  );
}
