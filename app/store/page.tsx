import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { StoreBottomBand } from "@/components/store/StoreBottomBand";
import { StoreFeaturedProducts } from "@/components/store/StoreFeaturedProducts";
import { StoreShopByBrand } from "@/components/store/StoreShopByBrand";
import { StoreSplitHero } from "@/components/store/StoreSplitHero";
import { StoreWhyBuy } from "@/components/store/StoreWhyBuy";
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
        <StoreSplitHero />
        <StoreShopByBrand />
        <StoreFeaturedProducts />
        <StoreWhyBuy />
        <StoreBottomBand />
      </main>
      <Footer />
    </>
  );
}
