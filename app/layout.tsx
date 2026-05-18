import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, Caveat } from "next/font/google";
import "./globals.css";
import { MemorialDay2026ClosureModal } from "@/components/MemorialDay2026ClosureModal";
import { StoreComingSoonProvider } from "@/components/StoreComingSoonProvider";
import { siteContent } from "@/content/siteContent";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteContent.seo.siteUrl),
  icons: {
    icon: [
      {
        url: "/favicon.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  title: {
    default: siteContent.seo.title,
    template: `%s | ${siteContent.branding.businessName}`,
  },
  description: siteContent.seo.description,
  openGraph: {
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    url: siteContent.seo.siteUrl,
    siteName: siteContent.branding.businessName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.seo.title,
    description: siteContent.seo.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <StoreComingSoonProvider>{children}</StoreComingSoonProvider>
        <MemorialDay2026ClosureModal />
      </body>
    </html>
  );
}
