import type { MetadataRoute } from "next";
import { siteContent } from "@/content/siteContent";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteContent.branding.businessName,
    short_name: "Exit 18",
    description: siteContent.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#1a5c2a",
    theme_color: "#1a5c2a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
