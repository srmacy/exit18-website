import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { OemEquipmentBrandHero } from "@/components/equipment/OemEquipmentBrandHero";
import { OemEquipmentBrandPage } from "@/components/equipment/OemEquipmentBrandPage";
import { WaveDivider } from "@/components/WaveDivider";
import { equipmentHondaPage } from "@/content/oemEquipmentPagesContent";
import { HONDA_BRAND_UI } from "@/content/oemEquipmentBrandUi";

const p = equipmentHondaPage;

export const metadata: Metadata = {
  title: p.seo.title,
  description: p.seo.description,
};

export default function HondaEquipmentBrandRoutePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <OemEquipmentBrandHero content={p} ui={HONDA_BRAND_UI} />
        <WaveDivider variant="warmToOff" />
        <OemEquipmentBrandPage content={p} ui={HONDA_BRAND_UI} />
        <WaveDivider variant="warmToDark" />
      </main>
      <Footer />
    </>
  );
}
