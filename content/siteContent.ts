/**
 * Exit 18 Equipment — editable site content (single source of truth).
 * Tell Cursor/other AI: “Update Saturday hours in content/siteContent.ts” instead of hunting markup.
 */

export type NavLink = { label: string; href: string; variant?: "cta" };

export type HeroStatItem = { value: string; label: string };

export type HeroHeadlineSegment =
  | { kind: "text"; text: string }
  | { kind: "accent"; text: string };

/** Row breaks visually (<br />): segments concatenate horizontally unless newline helpers omitted */
export type HeroHeadlineRow =
  | { type: "lines"; segments: HeroHeadlineSegment[] };

/** Convenience: multi-line headline like the mockup */
export type HeroHeadlineBlock = HeroHeadlineRow[];

export type PortalStep = { number: string; htmlParts: string };

export type PortalSpotlightImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ServiceCardContent = {
  /** Full-width photo in card header */
  heroImageSrc: string;
  heroImageAlt: string;
  title: string;
  description: string;
};

export type HoursRow = {
  day: string;
  hours: string;
  closed?: boolean;
};

export type ContactRow = {
  icon: string;
  label: string;
  value: string;
  href?: string;
};

export type FooterNavLink = { label: string; href: string };

/** `/store` — brand storefront cards (Square links) */
export type StorePageBrandCard = {
  id: string;
  name: string;
  description: string;
  shopLinkLabel: string;
  squareStorefrontUrl: string;
  /** `/public` path like `/images/x.png`; empty = logo placeholder box */
  logoSrc: string;
  /** Same; empty = product image placeholder box */
  productImageSrc: string;
};

/** `/store` — featured item cards (Square product URLs; display only — no checkout on site) */
export type StorePageFeaturedProduct = {
  id: string;
  name: string;
  priceDisplay: string;
  viewProductLabel: string;
  squareProductUrl: string;
  /** `/public` or remote; empty = placeholder */
  productImageSrc: string;
};

/** `/store` — trust strip under featured products */
export type StorePageTrustColumn = {
  icon: string;
  title: string;
  description: string;
};

export type AboutWhyCard = {
  icon: string;
  title: string;
  description: string;
};

/** Single source for Parts / Maintenance Portal links site-wide. Swap for production host when ready (e.g. portal.exit18equipment.com). */
export const maintenancePortalUrl =
  "https://exit18-maintenance-portal.vercel.app" as const;

/** Hostname only — contact strip display */
export const maintenancePortalHostname =
  "exit18-maintenance-portal.vercel.app" as const;

export const siteContent = {
  seo: {
    title: "Exit 18 Equipment | Outdoor Power in Georgia, VT",
    description:
      "Family-owned Honda, Ferris, Toro, Echo & Simplicity dealer in Georgia, Vermont since 1995. Equipment sales, expert service, and parts.",
    siteUrl: "https://exit18equipment.com",
  },

  branding: {
    businessName: "Exit 18 Equipment",
    logoUrl: "/images/exit18-logo.png",
    logoAlt: "Exit 18 Equipment",
  },

  /** Shop phone & email — used on /service and tel: links */
  contact: {
    phoneDisplay: "(802) 524-2974",
    phoneTel: "+18025242974",
    /** Update when live — form API placeholder does not send mail yet */
    serviceEmail: "service@exit18equipment.com",
  },

  assets: {
    heroImageUrl:
      "https://www.exit18equipment.com/uploads/6/7/6/2/6762647/background-images/1931004891.jpeg",
    heroImageAlt: "Exit 18 Equipment shop exterior",
    /** Same shop photo used in About section */
    storyImageAlt: "Exit 18 Equipment shop",
  },

  portal: {
    /** Same as `maintenancePortalUrl` — use `siteContent.portal.url` in components */
    url: maintenancePortalUrl,
    hostnameDisplay: maintenancePortalHostname,
  },

  navbar: {
    links: [
      { label: "About", href: "/about" },
      { label: "Equipment", href: "/equipment" },
      { label: "Service & Repairs", href: "/service" },
      { label: "Store", href: "/store" },
      { label: "Contact", href: "/contact" },
      {
        label: "Parts Portal",
        href: maintenancePortalUrl,
        variant: "cta",
      },
    ] satisfies NavLink[],
  },

  hero: {
    eyebrow: "Family owned · Georgia, Vermont · Since 1995",
    headlineRows: [
      [{ kind: "text", text: "Your" }],
      [{ kind: "text", text: "Neighbor" }],
      [
        { kind: "text", text: "for " },
        { kind: "accent", text: "Outdoor" },
      ],
      [{ kind: "text", text: "Power." }],
    ] satisfies HeroHeadlineSegment[][],
    subheadline:
      "We've been helping Vermont homeowners and commercial operators keep their equipment running for over 30 years. Stop in — we actually know your name.",
    primaryCta: {
      label: "Shop Equipment",
      href: "/#services",
    },
    secondaryCta: {
      label: "Service & Repairs",
      href: "/#services",
    },
    stats: [
      { value: "30+", label: "Years Serving Vermont" },
      { value: "5", label: "Brands We Stand Behind" },
      { value: "Family", label: "Owned & Operated" },
      { value: "Real", label: "People at the Counter" },
    ] satisfies HeroStatItem[],
  },

  brands: {
    stripLabel: "Authorized Dealer",
    names: ["Honda", "Ferris", "Toro", "Echo", "Simplicity"],
  },

  portalPromo: {
    tag: "Maintenance Portal",
    titleLines: ["Order", "Maintenance", "Parts", "Before You Pull In."],
    description:
      "Log in, choose your machine, and order routine maintenance parts ahead of time. We'll pull everything and have it ready at the counter.",
    steps: [
      {
        number: "1",
        htmlParts:
          "<strong>Find your equipment.</strong>",
      },
      {
        number: "2",
        htmlParts:
          "<strong>Choose your maintenance kit.</strong>",
      },
      {
        number: "3",
        htmlParts:
          "<strong>Pick up at the counter.</strong>",
      },
    ] satisfies PortalStep[],
    trustNote:
      "Built for Exit 18 customers with equipment already on file.",
    ctaLabel: "Open Parts Portal",
    spotlightImage: {
      src: "/images/portal-product-hero.png",
      alt:
        "Exit 18 Maintenance Portal — login, maintenance kit checkout, and cart",
      width: 1535,
      height: 1024,
    } satisfies PortalSpotlightImage,
  },

  story: {
    eyebrow: "Our Story",
    handwrittenLine: "Still family run, still here.",
    titleLines: ["We Know", "Our Customers", "By Name."],
    paragraphs: [
      "Exit 18 Equipment has been part of the Georgia, Vermont community since 1995. We started as a small shop and we're still a small shop — and that's exactly how we like it.",
      "When you bring your equipment to us, you're talking to the same people who sold it to you, who serviced it last season, and who'll be here next season too. <strong>We're not a chain. We're your neighbors.</strong>",
      "We sell the brands we personally stand behind — Honda, Ferris, Toro, Echo, and Simplicity — and we back everything up with in-house service from technicians who have seen it all.",
    ],
    badge: {
      value: "30+",
      label: "Years in Vermont",
    },
  },

  services: {
    eyebrow: "What We Do",
    handwrittenLine: "honest work, honest prices",
    titleLines: ["We're a Shop,", "Not a Chain."],
    cards: [
      {
        heroImageSrc: "/images/equipment-sales.jpg",
        heroImageAlt:
          "Red zero-turn mower at Exit 18 Equipment showroom in Vermont",
        title: "Equipment Sales",
        description:
          "We sell the brands we believe in — Honda, Ferris, Toro, Echo & Simplicity. We'll help you find the right machine, not just the most expensive one.",
      },
      {
        heroImageSrc: "/images/service-repairs.jpg",
        heroImageAlt: "Mechanic tools and socket set on a workbench",
        title: "Service & Repairs",
        description:
          "Our techs have seen it all. Whether it's a tune-up or a full rebuild, we'll get your equipment back in the field fast.",
      },
      {
        heroImageSrc: "/images/parts-accessories.jpg",
        heroImageAlt:
          "Engine maintenance parts including filters, spark plug, and oil",
        title: "Parts & Accessories",
        description:
          "We stock the parts you actually need. Commercial customers can now order routine maintenance parts online and pick up at the counter.",
      },
    ] satisfies ServiceCardContent[],
  },

  hoursContact: {
    hoursTitle: "Store Hours",
    hours: [
      { day: "Sunday", hours: "Closed", closed: true },
      { day: "Monday", hours: "Closed", closed: true },
      { day: "Tuesday", hours: "8:00am – 5:00pm" },
      { day: "Wednesday", hours: "8:00am – 5:00pm" },
      { day: "Thursday", hours: "8:00am – 5:00pm" },
      { day: "Friday", hours: "8:00am – 5:00pm" },
      { day: "Saturday", hours: "8:00am – 12:00pm" },
    ] satisfies HoursRow[],
    contact: [
      {
        icon: "📍",
        label: "Location",
        value: "Georgia, Vermont",
      },
      {
        icon: "🌐",
        label: "Parts Portal",
        value: maintenancePortalHostname,
        href: maintenancePortalUrl,
      },
      {
        icon: "⭐",
        label: "Serving Vermont Since",
        value: "1995 — 30 Years Strong",
      },
    ] satisfies ContactRow[],
  },

  /** Standalone `/about` page — headings, CTAs, and story beats */
  aboutPage: {
    seo: {
      title: "About Exit 18 Equipment | Georgia, VT",
      description:
        "Meet the Macy family behind Exit 18 Equipment. Family-owned lawn and power equipment dealership in Georgia, Vermont since 1995 — honest service since the Senesac Lawn & Garden days.",
    },

    hero: {
      eyebrow: "Georgia, Vermont · Since 1995",
      headline: "About Exit 18 Equipment",
      subheadline:
        "Family-owned, technician-led, and serving Vermont since 1995.",
      /** Replace with `/images/your-photo.jpg` in public/ when ready; empty = styled placeholder */
      familyPhotoSrc: "",
      familyPhotoAlt:
        "The Exit 18 Equipment family — photo coming soon.",
      placeholderHint: "Family photo — add to public/images and set aboutPage.hero.familyPhotoSrc",
      primaryCta: { label: "Visit the Shop", href: "/#hours" },
      secondaryCta: { label: "Service & Repairs", href: "/#services" },
    },

    legacy: {
      eyebrow: "Local roots · Real people",
      handwritten: "three decades along the interstate.",
      titleLines: [
        "From Lawn & Garden",
        "to Outdoor Power,",
        "We're Still Local.",
      ],
      intro:
        "Our story grows out of Vermont's independent equipment trade — rooted in Senesac Lawn & Garden heritage and sharpened behind the mower shop counter.",
      paragraphs: [
        "When <strong>Brett and Brenda Macy</strong> took ownership of Exit 18 Equipment in <strong>1995</strong>, the mission was straightforward: serve northern Vermont with the hustle and honesty locals expect from a neighbor — not a national chain.",
        "We've turned wrenches for more than thirty years — walk-behinds, zero-turns, tractors, handhelds — keeping homeowners mowing and crews rolling.",
        "<strong>You'll still find family at the register.</strong> Same names. Same bays. Same commitment when your season is on the line.",
      ],
    },

    whyUs: {
      eyebrow: "Why Choose Exit 18",
      titleLines: ["Straight Talk.", "Straight Service."],
      cards: [
        {
          icon: "🏠",
          title: "Family-owned accountability",
          description:
            "Decisions aren't made in a distant office — they're weighed right here beside the bench.",
        },
        {
          icon: "🛠️",
          title: "Real technicians, not a chain",
          description:
            "Our wrenches turn in Georgia. Diagnostics to delivery — people who understand Vermont winters and mowing seasons.",
        },
        {
          icon: "⚙️",
          title: "Trusted equipment brands",
          description:
            "Honda, Ferris, Toro, Echo, Simplicity — inventory we stake our reputation on, not closeout specials.",
        },
        {
          icon: "🧭",
          title: "Straightforward advice",
          description:
            "We won't sell horsepower nobody needs — just rigs that pull their weight.",
        },
        {
          icon: "🤝",
          title: "Long-term local support",
          description:
            "Parts continuity and benches that recognize you season after season — walk in or tap the Maintenance Portal.",
        },
      ] satisfies AboutWhyCard[],
    },

    teamFeature: {
      heading: "The crew behind the counter",
      captionLead:
        "Reserve this space for family or crew — help customers recognize the faces behind the wrenches.",
      imageSrc: "",
      imageAlt: "Exit 18 Equipment crew at the Georgia, VT shop",
    },

    closingCta: {
      headline: "Need equipment, service, or parts?",
      body:
        "Stop by the shop in Georgia, Vermont, or use the Parts Portal to order routine maintenance parts ahead of time.",
      primary: { label: "Contact Us", href: "/#hours" },
      secondary: {
        label: "Open Parts Portal",
        href: maintenancePortalUrl,
      },
    },
  },

  /** `/service` — repairs lead page */
  servicePage: {
    seo: {
      title: "Service & Repairs | Exit 18 Equipment Georgia, VT",
      description:
        "Trusted local diagnostics, pickup & delivery options, and factory-aligned service for Honda, Ferris, Toro, Echo, Simplicity & more — Exit 18 Equipment in Georgia, Vermont.",
    },

    hero: {
      eyebrow:
        "Power equipment repair & service · Georgia, Vermont",
      headline: "Service & Repairs",
      subheadline:
        "Trusted local technicians. Fast turnaround. Honest advice.",
      photoSrc: "",
      photoAlt:
        "Exit 18 Equipment technician servicing outdoor power equipment in the Georgia, VT shop.",
      placeholderHint:
        "Service bay photo — add `/public/images/service-hero.jpg` and set servicePage.hero.photoSrc.",
      primaryCta: {
        label: "Request Service",
        href: "#request-service",
      },
      secondaryCtaLabel: "Call Shop",
    },

    whyIntro: {
      eyebrow: "Why Choose Exit 18 Service",
      titleLines: ["Straight answers.", "Solid repairs."],
    },

    whyCards: [
      {
        icon: "🔧",
        title: "Real technicians",
        description:
          "Bench-trained techs who work on outdoor power daily — not a scripted call center.",
      },
      {
        icon: "⚡",
        title: "Fast turnaround",
        description:
          "Scheduling that respects Vermont seasons — we hustle when your window is tight.",
      },
      {
        icon: "⚙️",
        title: "Trusted brands",
        description:
          "Hands-on familiarity with Honda, Ferris, Toro, Echo, Simplicity — plus common engine lines.",
      },
      {
        icon: "🚛",
        title: "Pickup available",
        description:
          "Pickup & delivery routes where scheduling allows — ask when you call.",
      },
      {
        icon: "💬",
        title: "Straight answers",
        description:
          "We'll tell you plainly what it needs, what can wait, and what doesn't make sense to fix.",
      },
    ] satisfies AboutWhyCard[],

    requestSection: {
      infoHeadline: "Need service? We're here to help.",
      infoIntro:
        "Tell us what you are running, what it is doing, and we'll get you lined up with the right bench time.",
      bullets: [
        "Shop labor billed in half-hour increments.",
        "Pickup & delivery quoted by address and machine type — not a one-size-fits-all add-on.",
        "Estimates may require inspection; we'll call before we do work you did not approve.",
      ],
      /** Shown in info card — tune in content as rates change */
      rateNote:
        "Labor rate & fees current as posted in-store; ask the counter for today's numbers.",
      contactTimeOptions: [
        "Any reasonable time",
        "Morning (before noon)",
        "Afternoon",
        "Evenings by appointment",
      ],
    },

    formCopy: {
      title: "Request service",
      subtitle:
        "Submit the form — we will reply by phone or email.",
      submitLabel: "Request Service",
      submittingLabel: "Sending…",
      privacyLine:
        "We use this information only to respond to your request. No spam, no resale.",
      successMessage:
        "Your request has been received. We'll contact you shortly.",
    },

    formFields: {
      name: "Full name",
      phone: "Phone",
      email: "Email",
      address: "Town / address",
      brand: "Machine brand",
      model: "Model",
      issue: "What is going on?",
      pickup: "Need pickup?",
      pickupYes: "Yes",
      pickupNo: "No",
      brandPlaceholder: "Select or choose brand",
      contactTime: "Best time to reach you",
    },

    machineBrands: [
      "Honda",
      "Ferris",
      "Toro",
      "Echo",
      "Simplicity",
      "Briggs & Stratton",
      "Kawasaki",
      "Kohler",
      "Other / not sure",
    ],

    pickupSection: {
      eyebrow: "Pickup & delivery",
      titleLines: ["We can come to you,", "when routing allows."],
      lead:
        "Commercial route days and residential stops are scheduled around the shop calendar — not arbitrary minimums. Describe your machine and town in the form so we can quote fairly.",
      bullets: [
        {
          icon: "📅",
          title: "Flexible scheduling",
          text: "Morning and afternoon windows typical; we confirm before we roll.",
        },
        {
          icon: "🧰",
          title: "Careful handling",
          text: "Chains, straps, and ramps — treated like your equipment is ours.",
        },
        {
          icon: "✅",
          title: "Return ready",
          text: "Returned running or clearly explained — paperwork matches the work performed.",
        },
      ],
      estimator: {
        badge: "Coming soon",
        title: "Pickup & delivery price estimator",
        body:
          "Instant ballpark pricing from your address — know the fee before you schedule. Shipping this module next.",
      },
    },

    brandsSection: {
      eyebrow: "Factory-aligned support",
      headline: "Brands we service",
      sub:
        "Authorized service practices, genuine parts when they matter, and candid advice when aftermarket makes sense.",
      names: [
        "Honda",
        "Ferris",
        "Toro",
        "Echo",
        "Simplicity",
        "Briggs & Stratton",
        "Kohler",
        "Kawasaki",
      ],
    },

    closingCta: {
      headline: "Need service now?",
      body: "Tell us what broke, what it is doing, and when you need it back in the field.",
      buttonLabel: "Request service today",
      buttonHref: "#request-service",
    },
  },

  equipmentPage: {
    seo: {
      title: "Equipment",
      description:
        "Outdoor power equipment — Honda, Ferris, Toro, Echo & Simplicity — at Exit 18 Equipment in Georgia, Vermont.",
    },
    hero: {
      eyebrow: "Authorized dealer",
      headline: "Equipment",
      subheadline:
        "We carry the brands we service — walk the floor with us and we'll match you to the right machine.",
      primaryCta: { label: "What we carry", href: "/#services" },
      secondaryCta: { label: "Call the shop", href: "tel:+18025242974" },
    },
  },

  storePage: {
    seo: {
      title: "Store",
      description:
        "Shop parts and equipment online with Exit 18 Equipment — order on Square and pick up in Georgia, Vermont. Honda, Toro, Echo, Ferris, Briggs & Stratton.",
    },
    heroInteriorImage: {
      src: "/images/store-hero-showroom.png",
      alt: "Equipment showroom interior at Exit 18 Equipment — mowers and power equipment",
    },
    hero: {
      eyebrow: "ONLINE STORE",
      headline: "SHOP PARTS & EQUIPMENT",
      subtext: "Order online, pick up locally in Georgia, Vermont.",
      shopByBrandSectionId: "shop-by-brand",
      shopByBrandButtonLabel: "SHOP BY BRAND →",
      viewAllProductsButtonLabel: "VIEW ALL PRODUCTS",
    },
    /** Full Square catalog placeholder — VIEW ALL PRODUCTS CTA */
    viewAllProductsSquareUrl:
      "https://PLACEHOLDER_REPLACE.square.site/full-catalog",

    shopByBrandTitle: "SHOP BY BRAND",
    /** Square storefront URLs placeholders — swap when live */
    brandCards: [
      {
        id: "echo",
        name: "ECHO",
        description: "Outdoor power equipment & accessories",
        shopLinkLabel: "SHOP ECHO →",
        squareStorefrontUrl:
          "https://PLACEHOLDER_REPLACE.square.site/exit18-brand-echo",
        logoSrc: "",
        productImageSrc: "",
      },
      {
        id: "toro",
        name: "TORO",
        description: "Mowers, snowblowers, and more",
        shopLinkLabel: "SHOP TORO →",
        squareStorefrontUrl:
          "https://PLACEHOLDER_REPLACE.square.site/exit18-brand-toro",
        logoSrc: "",
        productImageSrc: "",
      },
      {
        id: "honda",
        name: "HONDA",
        description: "Generators, pumps, and engines",
        shopLinkLabel: "SHOP HONDA →",
        squareStorefrontUrl:
          "https://PLACEHOLDER_REPLACE.square.site/exit18-brand-honda",
        logoSrc: "",
        productImageSrc: "",
      },
      {
        id: "ferris",
        name: "FERRIS",
        description: "Commercial-grade mowing equipment",
        shopLinkLabel: "SHOP FERRIS →",
        squareStorefrontUrl:
          "https://PLACEHOLDER_REPLACE.square.site/exit18-brand-ferris",
        logoSrc: "",
        productImageSrc: "",
      },
      {
        id: "briggs",
        name: "BRIGGS & STRATTON",
        description: "Engines & replacement parts",
        shopLinkLabel: "SHOP BRIGGS →",
        squareStorefrontUrl:
          "https://PLACEHOLDER_REPLACE.square.site/exit18-brand-briggs",
        logoSrc: "",
        productImageSrc: "",
      },
    ] satisfies StorePageBrandCard[],

    featuredProductsTitle: "FEATURED PRODUCTS",
    featuredProducts: [
      {
        id: "ferris-blades",
        name: `Ferris 52" Mulching Blade (Set of 3)`,
        priceDisplay: "$47.00",
        viewProductLabel: "VIEW PRODUCT →",
        squareProductUrl:
          "https://PLACEHOLDER_REPLACE.square.site/product/ferris-blades-placeholder",
        productImageSrc: "",
      },
      {
        id: "vanguard-oil",
        name:
          "Vanguard 5W-30 Full Synthetic Engine Oil Quart (100401Q)",
        priceDisplay: "$6.39",
        viewProductLabel: "VIEW PRODUCT →",
        squareProductUrl:
          "https://PLACEHOLDER_REPLACE.square.site/product/vanguard-oil-placeholder",
        productImageSrc: "",
      },
      {
        id: "echo-trimmer-line",
        name: `ECHO .095" Cross-Fire Trimmer Line (5 lb. Spool)`,
        priceDisplay: "$32.99",
        viewProductLabel: "VIEW PRODUCT →",
        squareProductUrl:
          "https://PLACEHOLDER_REPLACE.square.site/product/echo-line-placeholder",
        productImageSrc: "",
      },
      {
        id: "honda-filter",
        name: "Honda Oil Filter (15400-PLM-A02)",
        priceDisplay: "$8.99",
        viewProductLabel: "VIEW PRODUCT →",
        squareProductUrl:
          "https://PLACEHOLDER_REPLACE.square.site/product/honda-filter-placeholder",
        productImageSrc: "",
      },
    ] satisfies StorePageFeaturedProduct[],

    whyBuyTitle: "WHY BUY FROM EXIT 18",
    whyTrustColumns: [
      {
        icon: "📍",
        title: "Local Pickup in Georgia, VT",
        description:
          "Order online and pick up at our store. Support local.",
      },
      {
        icon: "🎧",
        title: "Real Technicians, Not a Call Center",
        description:
          "Get honest advice from our experienced team.",
      },
      {
        icon: "🔧",
        title: "Parts & Service After the Sale",
        description:
          "We're here to keep your equipment running.",
      },
      {
        icon: "🛡️",
        title: "We Stock What We Trust",
        description:
          "Quality brands. Proven performance.",
      },
    ] satisfies StorePageTrustColumn[],

    bottomBand: {
      headline: "NEED EQUIPMENT, SERVICE, OR PARTS?",
      subtext: "We're here to help you get the job done right.",
      shopEquipmentCtaLabel: "SHOP EQUIPMENT →",
      shopEquipmentHref: "/equipment",
      serviceRepairsCtaLabel: "SERVICE & REPAIRS →",
      serviceRepairsHref: "/service",
      visitHeading: "VISIT US",
      visitLines: ["Exit 18 Equipment", "Georgia, Vermont"],
      callHeading: "CALL US",
      callHoursSummary: "Tue–Fri 8–5 · Sat 8–12",
      partsPortalHeading: "PARTS PORTAL",
      partsPortalDescription:
        "Order parts online anytime, anywhere.",
      partsPortalLinkLabel: "Open portal →",
    },
  },

  contactPage: {
    seo: {
      title: "Contact",
      description:
        "Call, email, or visit Exit 18 Equipment in Georgia, VT. Store hours and shop contact.",
    },
    hero: {
      eyebrow: "Get in touch",
      headline: "Contact",
      subheadline:
        "Reach us during shop hours by phone — or email for equipment and service questions.",
      primaryCta: { label: "Call (802) 524-2974", href: "tel:+18025242974" },
      secondaryCta: {
        label: "Email us",
        href: "mailto:service@exit18equipment.com",
      },
    },
  },

  footer: {
    copyright:
      "© 2026 Exit 18 Equipment · Georgia, VT · Family owned since 1995 · Thanks for supporting local.",
    links: [
      { label: "About", href: "/about" },
      { label: "Equipment", href: "/equipment" },
      { label: "Service & Repairs", href: "/service" },
      { label: "Store", href: "/store" },
      { label: "Contact", href: "/contact" },
      {
        label: "Parts Portal",
        href: maintenancePortalUrl,
      },
    ] satisfies FooterNavLink[],
  },
} as const;
