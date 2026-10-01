import type { Metadata } from "next";
import "./globals.css";
import { BRAND } from "@/lib/brand";
import { SITE_URL } from "@/lib/site";
import { LanguageProvider } from "@/components/LanguageProvider";
import { CartProvider } from "@/components/CartProvider";

const OG_IMAGE = `${SITE_URL}/brand/og-preview.webp`;
const BRAND_ICON = `${SITE_URL}/brand/emblem.webp`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${BRAND.name} — käsitööšokolaad Tallinnas`,
  description: "Käsitööšokolaad ja väikesed kingitused Tallinnas. Väikesed partiid, läbimõeldud maitsed ja kinkimiseks valmis pakend.",
  openGraph: {
    title: `${BRAND.name} — handmade chocolate in Tallinn`,
    description: "Small-batch handmade chocolate, gift ready in Tallinn.",
    type: "website",
    locale: "et_EE",
    alternateLocale: ["ru_EE", "en_EE"],
    url: SITE_URL,
    siteName: BRAND.name,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Meloa — Handmade Chocolate · Tallinn" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — handmade chocolate in Tallinn`,
    description: "Small-batch handmade chocolate, gift ready in Tallinn.",
    images: [OG_IMAGE],
  },
  icons: {
    icon: BRAND_ICON,
    shortcut: BRAND_ICON,
    apple: BRAND_ICON,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="et">
      <body>
        <LanguageProvider>
          <CartProvider>{children}</CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
