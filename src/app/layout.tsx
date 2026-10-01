import type { Metadata } from "next";
import "./globals.css";
import { BRAND } from "@/lib/brand";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${BRAND.name} — handmade chocolate in Tallinn`,
  description:
    "Авторский шоколад ручной работы в Tallinn. Небольшие партии, необычные сочетания и подарочная упаковка.",
  openGraph: {
    title: `${BRAND.name} — handmade chocolate`,
    description: "Small-batch chocolate, made beautifully in Tallinn.",
    type: "website",
    locale: "ru_EE",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 1500, alt: `${BRAND.name} handmade chocolate` }],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
