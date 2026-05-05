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
    /**
     * In-nav OEM pages (`/equipment/*`). Simplicity intentionally omitted — still serviced / visible in strip without a storefront route.
     *
     * **Template:** `/equipment/echo` — reuse that page’s layout, spacing, typography, and section order for Honda, Ferris, and Toro when building them (swap brand copy/images only).
     *
     * Legacy reference (exit18equipment.com): honda.html, ferris.html, toro.html
     */
    stripBrandHrefs: {
      Honda: "/equipment/honda",
      Ferris: "/equipment/ferris",
      Toro: "/equipment/toro",
      Echo: "/equipment/echo",
    } as Record<string, string>,
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
    handwrittenLine: "Roots in Senesac Lawn & Garden.",
    titleLines: ["We Know", "Our Customers", "By Name."],
    paragraphs: [
      "Owned by <strong>Brett and Brenda Macy</strong>, our family business has been a cornerstone for reliable outdoor power equipment in Vermont for 30 years. Our roots trace back to <strong>Senesac Lawn and Garden</strong>, established by Roger and Lucille Senesac decades ago — a shop known for its commitment to customers. That ethic is what Brett and Brenda built on when they <strong>purchased Exit 18 Equipment in 1995</strong>.",
      "We're here to earn your trust year after year. Simply put, your satisfaction guides our decisions.",
      "Being family-owned and operated means <strong>accountability and direct access to expertise</strong>. We carefully select what we carry — gear known for performance and durability. We're factory-trained and authorized for <strong>Ferris, Simplicity, Echo,</strong> and <strong>Toro</strong>, and we're a Honda Power Equipment \"Premiere\" dealer. That means genuine sales, parts, and service aligned with manufacturer standards.",
      "Here's a key difference you'll find here: we're <strong>not just owners — we're technicians.</strong> Brett, Brenda, and our team work directly with the machines. We know the mechanics, the maintenance schedules, and how to match equipment to real jobs. That's practical advice and reliable support — plain and local — instead of scripted retail fluff.",
      "When you need equipment or service, you deserve <strong>straightforward answers</strong> and confidence in what you buy. We keep shopping focused so you can get straight information without runaround.",
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
        value:
          "Exit 18 Equipment\n27 Morse Drive\nGeorgia, Vermont\nJust off Route 7 past the park and ride.",
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
        "Family-owned and technician-led Exit 18 Equipment — Brett and Brenda Macy, serving Vermont outdoor power needs since the 1995 purchase from roots in Senesac Lawn & Garden. Factory-trained Ferris, Simplicity, Echo, Toro & Honda Power Equipment Premiere dealer. 27 Morse Drive, Georgia, Vermont — just off Route 7 past the park and ride.",
    },

    hero: {
      eyebrow: "Georgia, Vermont · Since 1995",
      headline: "About Exit 18 Equipment",
      subheadline:
        "Family-owned, technician-led, and serving Vermont since 1995 — real people behind the wrench, rooted in Senesac Lawn & Garden tradition.",
      familyPhotoSrc: "/images/about-hero.jpg",
      familyPhotoAlt:
        "Exit 18 Equipment showroom interior with lawn mowers and service counter floor display",
      placeholderHint:
        "Hero photo — add `/public/images/about-hero.jpg` and set aboutPage.hero.familyPhotoSrc.",
      primaryCta: { label: "Visit the Shop", href: "/#hours" },
      secondaryCta: { label: "Service & Repairs", href: "/#services" },
    },

    /** “We Know Our Customers By Name.” — `/about` only; homepage uses root `story` copy + same image file path on disk */
    story: {
      imageSrc: "/images/family-history.jpg",
      imageAlt: "Exit 18 Equipment family history",
    },

    legacy: {
      eyebrow: "Local roots · Real people",
      handwritten: "Three decades — 27 Morse Drive.",
      titleLines: [
        "From Lawn & Garden",
        "to Outdoor Power,",
        "We're Still Local.",
      ],
      intro:
        "Northern Vermont deserves a dealership that remembers names — built on Senesac Lawn & Garden's customer-first ethos and sharpened every season since Brett and Brenda took ownership in 1995.",
      paragraphs: [
        "We've turned wrenches on walk-behinds, zero-turns, tractors, and handheld gear for thirty years — <strong>snowstorms, mud season,</strong> and thick grass aren't theory on our bench.",
        "<strong>We're at 27 Morse Drive in Georgia, Vermont — just off Route 7 past the park and ride.</strong> Walk in for equipment, routine parts pickup, or a straight answer about what's worth fixing. We stand behind the products we stock and the work we authorize.",
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
            "Decisions aren't made in a distant office — they're weighed right here. Family ownership means accountability and direct access to the people steering the bench and the storefront.",
        },
        {
          icon: "🛠️",
          title: "Technicians behind the desk",
          description:
            "We're not paper-only owners — we're technicians. Brett, Brenda, and crew work on the iron: diagnostics through delivery, calibrated to Vermont's seasons.",
        },
        {
          icon: "⚙️",
          title: "Factory-trained dealer brands",
          description:
            "Authorized Ferris, Simplicity, Echo, and Toro; Honda Power Equipment \"Premiere\" dealer — curated lines we stake our reputation on, with genuine parts and manufacturer-backed procedures.",
        },
        {
          icon: "🧭",
          title: "Straightforward advice",
          description:
            "Straight answers, practical pairings between machine and chore, reliable support afterward — skip the scripted upsell playbook.",
        },
        {
          icon: "🤝",
          title: "Long-term local support",
          description:
            "Parts continuity season after season, technicians who recall your fleet, Maintenance Portal pickups when it fits your workflow.",
        },
      ] satisfies AboutWhyCard[],
    },

    teamFeature: {
      heading: "The crew behind the counter",
      captionLead:
        "You talk to crew who turn wrenches on the same brands we stock — Brett, Brenda, and the team diagnose, assemble, service, and stand behind what's on the showroom floor.",
      imageSrc: "",
      imageAlt: "Exit 18 Equipment crew at the Georgia, VT shop",
    },

    closingCta: {
      headline: "Need equipment, service, or parts?",
      body:
        "Stop by Exit 18 Equipment at 27 Morse Drive in Georgia, Vermont — just off Route 7 past the park and ride. Talk through what you're running, line up service, or grab Maintenance Portal orders at the counter. See the difference real technicians and a family-owned shop make.",
      primary: { label: "Contact Us", href: "/#hours" },
      secondary: {
        label: "Open Parts Portal",
        href: maintenancePortalUrl,
      },
    },
  },

  /** `/service` — repairs lead page (wording aligned with legacy exit18equipment.com/service--repairs.html) */
  servicePage: {
    seo: {
      title: "Service & Repairs | Exit 18 Equipment Georgia, VT",
      description:
        "Lawn mower repair, snow blower service, generator tune-ups, and small engine repair in Georgia, Vermont. Factory-trained authorized service for Toro, Echo, Ferris, Honda, Simplicity & common engines. Call (802) 524-2974.",
    },

    hero: {
      eyebrow:
        "Power equipment repair & service · Georgia, Vermont",
      headline: "Service & Repairs",
      subheadline:
        "Exit 18 Equipment — lawn mower repair, small engine service, and local expertise you can trust. Even the best equipment needs maintenance, and when it does, our shop is here to help. Service is more than just a department — it's the heart of our business. We deliver expert lawn mower repair, snow blower service, generator tune-ups, and small engine repair in Georgia, VT, backed by decades of hands-on experience. Whether you purchased your machine from us or just need trusted service, our technicians are ready to help.",
      photoSrc: "/images/service-hero.jpg",
      photoAlt:
        "Exit 18 Equipment service bay with mower being repaired",
      placeholderHint:
        "Service bay photo — add `/public/images/service-hero.jpg` and set servicePage.hero.photoSrc.",
      primaryCta: {
        label: "Request Service",
        href: "#request-service",
      },
      secondaryCtaLabel: "Call Shop",
    },

    whyIntro: {
      eyebrow: "Authorized repairs & maintenance",
      titleLines: ["Fast turnaround.", "Honest advice.", "Real results."],
    },

    whyCards: [
      {
        icon: "🔧",
        title: "Bench expertise",
        description:
          "Expert lawn mower repair, snow blower service, generator tune-ups, and small engine repair right here in Georgia, VT — backed by decades of hands-on experience and technicians who live on this equipment daily.",
      },
      {
        icon: "⚙️",
        title: "Trusted brands & engines",
        description:
          "We're factory trained on Toro, Echo, Ferris, Honda, and Simplicity — plus Briggs & Stratton, Kawasaki, and Kohler engines — following manufacturer guidelines with genuine parts when they're the right call.",
      },
      {
        icon: "⭐",
        title: "Bought from us? Priority service",
        description:
          "Purchased here? Enjoy 10% off current shop labor rates, priority placement in the service queue, and service from the same folks who matched you to the equipment.",
      },
      {
        icon: "⚡",
        title: "Straight guidance & turnaround",
        description:
          "Fast turnaround with honest advice: diagnose the issue, steer you plainly, and get your mower, blower, trimmer, or generator running right — quality work without the runaround.",
      },
      {
        icon: "🚛",
        title: "Pickup when routing allows",
        description:
          "Pickup & delivery quoted by address and machine — schedule around the shop calendar, confirm before we roll, and we'll arrange convenient drop-off or pickup.",
      },
    ] satisfies AboutWhyCard[],

    requestSection: {
      infoHeadline: "Need service? We're here to help.",
      infoIntro:
        "To schedule: call (802) 524-2974, email us via the contact page, or stop in Tuesday–Friday 8:00–5:00 and Saturday 8:00–12:00 (closed Sundays & Mondays). Scheduling in advance is appreciated — especially during busy spring. When you reach out, your work order enters our shop queue that same day, and we'll arrange a convenient time for drop-off or pickup.",
      bullets: [
        "Current shop labor rate: $98/hr",
        "Pickup / delivery: $85/hr travel time · $75 minimum",
        "Estimates may require inspection — we'll call before we perform work you have not approved.",
      ],
      rateNote:
        "Shop labor billed in half-hour increments. Rates updated June 2025 — ask the counter for today's numbers.",
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
        "Submit the form — we'll reply by phone or email.",
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
      "Toro",
      "Echo",
      "Ferris",
      "Honda",
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
        "Pickup and delivery fees are quoted by route and equipment — published travel billing runs $85/hr with a $75 minimum when we dispatch. Commercial routes and residential stops are planned around bench load; describe your town and machine in the form so we quote fairly before we roll.",
      bullets: [
        {
          icon: "📅",
          title: "Season-smart routing",
          text: "Spring rush and storm weeks tighten fast — typical morning and afternoon windows, always confirmed before the truck rolls.",
        },
        {
          icon: "🧰",
          title: "Careful handling",
          text: "Chains, straps, and ramps — equipment is secured and unloaded into our full-time service bays, treated with the same care we'd give our own iron.",
        },
        {
          icon: "✅",
          title: "Return ready",
          text: "Equipment returns running — or paperwork spells out exactly what's needed next — mirroring how we explain every invoice on the bench.",
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
      eyebrow: "Factory-trained support",
      headline: "Brands we service",
      sub:
        "As a factory-trained authorized dealer we follow manufacturer guidance and prioritize genuine components when they're the smartest fix — with candid aftermarket advice only when Vermont conditions say so.",
      names: [
        "Toro",
        "Echo",
        "Ferris",
        "Honda",
        "Simplicity",
        "Briggs & Stratton",
        "Kawasaki",
        "Kohler",
      ],
    },

    closingCta: {
      headline: "Ready to schedule?",
      body: "Tell us what broke, what it's doing, and when you need it back in the field — we'll plug you into the same-day queue routing we use every season.",
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

  equipmentEchoPage: {
    seo: {
      title: "Echo Outdoor Power Equipment Vermont | Exit 18 Equipment",
      description:
        "Authorized Echo dealer in Georgia, VT — handheld power equipment, parts, service, and repairs for Franklin County, Chittenden County & beyond.",
    },
    hero: {
      eyebrow: "Authorized Echo dealer · Georgia, Vermont",
      headline: "Echo outdoor power equipment in Vermont",
      subheadline:
        "Looking for high-performance handheld equipment that stands up to Vermont's toughest jobs? At Exit 18 Equipment, we're proud to be your authorized local Echo dealer, serving homeowners and pros across Franklin and Chittenden Counties and beyond. Whether you need a string trimmer, chainsaw, leaf blower or other Echo outdoor power equipment, we offer the power, reliability, and easy handling you need.",
    },
    whyCarryEcho: {
      title: "Why we carry the Echo brand",
      paragraphs: [
        "Echo products are built for the real world — and that's exactly why we carry them. Whether you're trimming fence lines in Fairfax or clearing brush in St. Albans, Echo's lightweight, fuel-efficient tools are easy to start and built to last. We've trusted the brand for years because our customers trust it in the field.",
        "As a certified Echo dealer in Vermont, we offer in-house service, parts, and repairs to keep your equipment running smoothly.",
      ],
    },
    resources: {
      title: "Helpful Echo resources & blog posts",
      links: [
        {
          label:
            "Lawn mower fuel tips: how to choose the right gas & use fuel stabilizer",
          href: "https://www.exit18equipment.com/blog/lawn-mower-fuel-tips-how-to-choose-the-right-gas-use-fuel-stabilizer",
          external: true,
        },
        {
          label: "Trimmer buyer's guide: gas vs. battery for Vermont homeowners",
          href: "https://www.exit18equipment.com/blog/trimmer-buyers-guide-gas-vs-battery-for-vermont-homeowners",
          external: true,
        },
        {
          label: "Echo powers up outdoor power equipment aisles with new products",
          href: "https://www.echo-usa.com/press-releases/echo-powers-up-outdoor-power-equipment-aisles-with-new-products",
          external: true,
        },
      ],
    },
    whatWeCarry: {
      title: "What we carry – Vermont Echo equipment",
      intro:
        "We stock a wide range of electric and gas-powered Echo tools and accessories, including:",
      bullets: [
        "Echo chainsaws",
        "Echo electric trimmers",
        "Echo handheld blowers",
        "Echo hedge trimmers",
        "Echo pole pruners",
        "Echo backpack blowers",
        "Echo trimmers",
        "Echo push mowers",
        "Echo pressure washers",
        "Echo accessories like batteries, attachment heads, hand tools and more!",
      ],
      shopLeadIn: "Shop Echo online or in store",
      shopDetail:
        "Prefer to shop online? You can browse Echo products on our site and pick up at 27 Morse Drive in Georgia, Vermont. Not sure what you need? Stop by — we'll help you find the perfect Echo tool for your lawn or worksite.",
    },
    faqs: [
      {
        question: "Are Echo trimmers good for large properties in Vermont?",
        answerHtml: `Yes—especially Echo&apos;s gas-powered models like the <a href="https://www.exit18equipment.com/store/p810/ECHO-SRM-225-Straight-Shaft-Trimmer.html" target="_blank" rel="noopener noreferrer">SRM-225</a> and <a href="https://www.exit18equipment.com/store/p812/ECHO-SRM-2620-Trimmer-with-Speed-Feed-Head.html" target="_blank" rel="noopener noreferrer">SRM-2620</a>. They offer long run times, high torque, and durability for trimming thick grass and brush around large rural yards and farms.`,
      },
      {
        question: "Can I use Echo batteries across multiple tools?",
        answerHtml: `Yes! Echo&apos;s <a href="https://www.exit18equipment.com/store/c44/ECHO-accessories" target="_blank" rel="noopener noreferrer">56V battery platform</a> is compatible with multiple handheld tools, including trimmers, blowers, hedge trimmers, lawn mowers, backpack blowers and more. Great for homeowners looking to simplify their setup.`,
      },
      {
        question: "Do Echo chainsaws work well in cold weather?",
        answerHtml: `Absolutely. <a href="https://www.exit18equipment.com/store/c48/ECHO-Chainsaws" target="_blank" rel="noopener noreferrer">Echo chainsaws</a> are built with dependable 2-stroke engines and cold-weather reliability. Proper winter storage and fresh fuel are key for performance.`,
      },
      {
        question: "Can I get Echo parts and service at Exit 18 Equipment?",
        answerHtml: `Yes—we&apos;re a certified Echo dealer and service center. We stock common Echo parts and offer <a href="/service">full repair support</a> on the tools and brands we sell.`,
      },
      {
        question:
          "Can Exit 18 repair my Echo power equipment if I didn't buy it from you?",
        answerHtml:
          "Yes! We repair all Echo outdoor power equipment and can order parts when necessary. This includes (but is not limited to) anything under Echo&apos;s warranty policy.",
      },
    ],
    localWhy: {
      title: "Why buy your Echo equipment locally from Exit 18 Equipment?",
      intro:
        "At Exit 18 Equipment, we don't just sell Echo—we stand behind it. As a long-time Vermont dealer, we offer hands-on service and support to make sure your equipment performs season after season.",
      bullets: [
        "Certified Echo dealer with expert support",
        "Local service, parts, and warranty work",
        "Hands-on team with 50+ years of combined Vermont power equipment experience",
        "Conveniently located at 27 Morse Drive, Georgia, VT — just off Route 7 past the park and ride",
      ],
      footer:
        "Proudly serving Franklin & Chittenden County — Exit 18 Equipment is your Echo dealer for Georgia, St. Albans, Milton, Burlington, Fairfax, and the surrounding Vermont communities.",
    },
    primaryCta: { label: "Contact us", href: "/contact" },
    secondaryCta: { label: "Service & repairs", href: "/service" },
    tertiaryCta: { label: "Shop online store", href: "/store" },
  },

  storePage: {
    seo: {
      title: "Store",
      description:
        "Shop parts and equipment online with Exit 18 Equipment — order on Square and pick up at 27 Morse Drive, Georgia, Vermont. Honda, Toro, Echo, Ferris, Briggs & Stratton.",
    },
    heroInteriorImage: {
      src: "/images/service-parts-room.jpg",
      alt: "Exit 18 Equipment parts room with organized inventory shelves",
    },
    hero: {
      eyebrow: "ONLINE STORE",
      headline: "SHOP PARTS & EQUIPMENT",
      subtext: "Order online, pick up at 27 Morse Drive — Georgia, Vermont.",
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
        productImageSrc: "/images/echo-logo.png",
      },
      {
        id: "toro",
        name: "TORO",
        description: "Mowers, snowblowers, and more",
        shopLinkLabel: "SHOP TORO →",
        squareStorefrontUrl:
          "https://PLACEHOLDER_REPLACE.square.site/exit18-brand-toro",
        logoSrc: "",
        productImageSrc: "/images/toro-hero.png",
      },
      {
        id: "honda",
        name: "HONDA",
        description: "Generators, pumps, and engines",
        shopLinkLabel: "SHOP HONDA →",
        squareStorefrontUrl:
          "https://PLACEHOLDER_REPLACE.square.site/exit18-brand-honda",
        logoSrc: "",
        productImageSrc: "/images/honda-logo.png",
      },
      {
        id: "ferris",
        name: "FERRIS",
        description: "Commercial-grade mowing equipment",
        shopLinkLabel: "SHOP FERRIS →",
        squareStorefrontUrl:
          "https://PLACEHOLDER_REPLACE.square.site/exit18-brand-ferris",
        logoSrc: "",
        productImageSrc: "/images/ferris-logo.png",
      },
      {
        id: "briggs",
        name: "BRIGGS & STRATTON",
        description: "Engines & replacement parts",
        shopLinkLabel: "SHOP BRIGGS →",
        squareStorefrontUrl:
          "https://PLACEHOLDER_REPLACE.square.site/exit18-brand-briggs",
        logoSrc: "",
        productImageSrc: "/images/briggs-stratton-logo.png",
      },
    ],
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
          "Order online and pick up at 27 Morse Drive, Georgia, VT. Support local.",
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
      visitLines: [
        "Exit 18 Equipment",
        "27 Morse Drive",
        "Georgia, Vermont",
        "Just off Route 7 past the park and ride.",
      ],
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
        "Call, email, or visit Exit 18 Equipment — 27 Morse Drive, Georgia, VT, just off Route 7 past the park and ride. Store hours and shop contact.",
    },
    hero: {
      eyebrow: "Get in touch",
      headline: "Contact",
      subheadline:
        "Reach us during shop hours by phone — or email for equipment and service questions. Visit: 27 Morse Drive, Georgia, Vermont — just off Route 7 past the park and ride.",
      primaryCta: { label: "Call (802) 524-2974", href: "tel:+18025242974" },
      secondaryCta: {
        label: "Email us",
        href: "mailto:service@exit18equipment.com",
      },
    },
  },

  footer: {
    copyright:
      "© 2026 Exit 18 Equipment · 27 Morse Drive, Georgia, VT · Family owned since 1995 · Thanks for supporting local.",
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
