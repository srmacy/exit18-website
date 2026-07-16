/**
 * Excerpt from content/siteContent.ts — pickupSection only.
 * Source: content/siteContent.ts (lines ~611–643)
 */
export const pickupSectionExcerpt = {
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
    title: "Get a quick travel quote",
    intro:
      "Enter your address, choose the service you need, and we will estimate pickup and delivery using Google driving time from our shop in Georgia, Vermont.",
    rateStrip: ["$75 minimum", "$85 per travel hour", "Google drive time"],
  },
} as const;
