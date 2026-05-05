/** Shared CMS shape for `/equipment/{honda,ferris,toro}` pages — mirrors `equipmentEchoPage` minus Echo-only keys + adds `faqSectionTitle`. */
export type OemEquipmentSecondaryBrandPageContent = {
  seo: { title: string; description: string };
  hero: { eyebrow: string; headline: string; subheadline: string };
  whyCarryBrand: { title: string; paragraphs: string[] };
  resources: {
    title: string;
    links: { label: string; href: string; external?: boolean }[];
  };
  whatWeCarry: {
    title: string;
    intro: string;
    bullets: string[];
    shopLeadIn: string;
    shopDetail: string;
  };
  faqs: { question: string; answerHtml: string }[];
  localWhy: {
    title: string;
    intro: string;
    bullets: string[];
    footer: string;
  };
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  tertiaryCta?: { label: string; href: string };
  faqSectionTitle: string;
};
