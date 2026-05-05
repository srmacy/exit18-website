import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { OemEquipmentBrandHero } from "@/components/equipment/OemEquipmentBrandHero";
import { OemEquipmentBrandPage } from "@/components/equipment/OemEquipmentBrandPage";
import { WaveDivider } from "@/components/WaveDivider";
import { equipmentToroPage } from "@/content/oemEquipmentPagesContent";
import { TORO_BRAND_UI } from "@/content/oemEquipmentBrandUi";

const p = equipmentToroPage;

export const metadata: Metadata = {
  title: p.seo.title,
  description: p.seo.description,
};

export default function ToroEquipmentBrandRoutePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <OemEquipmentBrandHero content={p} ui={TORO_BRAND_UI} />
        <WaveDivider variant="warmToOff" />
        <OemEquipmentBrandPage content={p} ui={TORO_BRAND_UI} />
        <WaveDivider variant="warmToDark" />
      </main>
      <Footer />
    </>
  );
}
