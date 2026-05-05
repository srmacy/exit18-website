/** Image paths / alt text / category grid for OEM brand pages (`/equipment/honda`, etc.). Placeholders kick in via `publicImageExists()`. */

export type OemEquipmentBrandCategoryAsset = {
  label: string;
  /** `/public`-relative web path */
  src: string;
  hint: string;
  /** White padded “product” framing — full image visible (object-contain). Default is cover fill. */
  productCardContain?: boolean;
};

export type OemEquipmentBrandUiAssets = {
  slug: string;
  /** Short brand name used in headings/alt — "Honda", "Ferris", "Toro" */
  brandLabel: string;
  heroImage: string;
  toolsImage: string;
  heroImageAlt: string;
  toolsImageAlt: string;
  heroPlaceholderHint: string;
  toolsPlaceholderHint: string;
  categoryAssets: readonly OemEquipmentBrandCategoryAsset[];
  /** “Why we carry” Toro sidebar (`toolsImage`): 16:9 banner crop with tuned object position. Other OEM pages omit this flag. */
  toolsImageContain?: boolean;
};

export const HONDA_BRAND_UI: OemEquipmentBrandUiAssets = {
  slug: "honda",
  brandLabel: "Honda",
  heroImage: "/images/honda-hero.png",
  toolsImage: "/images/honda-tools.png",
  heroImageAlt:
    "Honda outdoor power lineup — mowers, generator, blowers, and trimmers on a green lawn",
  toolsImageAlt:
    "Honda EU7000is inverter generator with power cord on a residential patio for home backup power",
  heroPlaceholderHint: "Honda product image",
  toolsPlaceholderHint: "Honda generators and pumps image",
  categoryAssets: [
    {
      label: "Generators",
      src: "/images/honda-generators.png",
      hint: "Honda Generators",
      productCardContain: true,
    },
    {
      label: "Water pumps",
      src: "/images/honda-pumps.png",
      hint: "Honda pumps",
      productCardContain: true,
    },
    {
      label: "Tillers",
      src: "/images/honda-tillers.png",
      hint: "Honda tillers",
      productCardContain: true,
    },
    {
      label: "Accessories & parts",
      src: "/images/honda-parts.png",
      hint: "Honda accessories & parts",
      productCardContain: true,
    },
  ],
};

export const FERRIS_BRAND_UI: OemEquipmentBrandUiAssets = {
  slug: "ferris",
  brandLabel: "Ferris",
  heroImage: "/images/ferris-hero.png",
  toolsImage: "/images/ferris-tools.png",
  heroImageAlt:
    "Action shot of a red and black Ferris zero-turn mower cutting grass, with the Ferris logo on the side panel and clippings discharging from the deck",
  toolsImageAlt:
    "Close-up of Ferris independent suspension with coil-over shock, 61-inch iCD cutting deck, and triple-blade badges on a Ferris mower",
  heroPlaceholderHint: "Ferris zero-turn image",
  toolsPlaceholderHint: "Ferris suspension mower image",
  categoryAssets: [
    {
      label: "300S / 500S",
      src: "/images/ferris-category-compact-zt.png",
      hint: "Ferris 500S compact zero-turn mower",
      productCardContain: true,
    },
    {
      label: "IS™ series",
      src: "/images/ferris-category-is-700z.png",
      hint: "Ferris IS 700Z zero-turn with suspension",
      productCardContain: true,
    },
    {
      label: "ISX™ commercial",
      src: "/images/ferris-category-isx.png",
      hint: "Ferris ISX series zero-turn with suspension system",
      productCardContain: true,
    },
    {
      label: "Walk-behind & parts",
      src: "/images/ferris-category-commercial.png",
      hint: "Ferris FW45 commercial walk-behind mower",
      productCardContain: true,
    },
  ],
};

export const TORO_BRAND_UI: OemEquipmentBrandUiAssets = {
  slug: "toro",
  brandLabel: "Toro",
  heroImage: "/images/toro-hero.png",
  toolsImage: "/images/toro-commercial-crew-banner.png",
  heroImageAlt:
    "Operator driving a red Toro zero-turn mower on a manicured green lawn",
  toolsImageAlt:
    "Landscape contractors with Toro GrandStand stand-on mower, walk-behind, and zero-turn equipment beside an equipment trailer near a commercial building",
  heroPlaceholderHint: "Toro product image",
  toolsPlaceholderHint: "Toro commercial crew & equipment banner",
  toolsImageContain: true,
  categoryAssets: [
    {
      label: "Zero-turns",
      src: "/images/toro-category-mowers-zt.png",
      hint: "Toro Z Master zero-turn mower",
      productCardContain: true,
    },
    {
      label: "Snow blowers",
      src: "/images/toro-category-snow.png",
      hint: "Toro Power Max two-stage snow blower",
      productCardContain: true,
    },
    {
      label: "Electric handhelds",
      src: "/images/toro-category-electric.png",
      hint: "Toro FLEX-FORCE cordless leaf blower",
      productCardContain: true,
    },
    {
      label: "Batteries & accessories",
      src: "/images/toro-category-accessories.png",
      hint: "Toro Titan mower with oil, deck kit & bagger accessories",
      productCardContain: true,
    },
  ],
};
