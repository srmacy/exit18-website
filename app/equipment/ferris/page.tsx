import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { OemEquipmentBrandHero } from "@/components/equipment/OemEquipmentBrandHero";
import { OemEquipmentBrandPage } from "@/components/equipment/OemEquipmentBrandPage";
import { WaveDivider } from "@/components/WaveDivider";
import { equipmentFerrisPage } from "@/content/oemEquipmentPagesContent";
import { FERRIS_BRAND_UI } from "@/content/oemEquipmentBrandUi";

const p = equipmentFerrisPage;

export const metadata: Metadata = {
  title: p.seo.title,
  description: p.seo.description,
};

export default function FerrisEquipmentBrandRoutePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <OemEquipmentBrandHero content={p} ui={FERRIS_BRAND_UI} />
        <WaveDivider variant="warmToOff" />
        <OemEquipmentBrandPage content={p} ui={FERRIS_BRAND_UI} />
        <WaveDivider variant="warmToDark" />
      </main>
      <Footer />
    </>
  );
}
