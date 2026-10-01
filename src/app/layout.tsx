import type { Metadata } from "next";
import "./globals.css";
import { BRAND } from "@/lib/brand";
import { SITE_URL } from "@/lib/site";
import { LanguageProvider } from "@/components/LanguageProvider";
import { CartProvider } from "@/components/CartProvider";

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
    images: [{ url: "/images/hero.jpg", width: 1200, height: 1500, alt: `${BRAND.name} handmade chocolate` }],
  },
  icons: { icon: "/favicon.svg" },
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
