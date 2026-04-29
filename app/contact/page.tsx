import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { HoursContact } from "@/components/HoursContact";
import { InnerPageHero } from "@/components/InnerPageHero";
import { Navbar } from "@/components/Navbar";
import { WaveDivider } from "@/components/WaveDivider";
import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: siteContent.contactPage.seo.title,
  description: siteContent.contactPage.seo.description,
};

export default function ContactPage() {
  const { hero } = siteContent.contactPage;

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
        <HoursContact sectionId="contact-hours" />
      </main>
      <Footer />
    </>
  );
}
