import { Footer } from "@/components/Footer";
import { GiftSection } from "@/components/GiftSection";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { EditorialSection } from "@/components/EditorialSection";
import { FAQSection } from "@/components/FAQSection";
import { OrderForm } from "@/components/OrderForm";
import { ProductGrid } from "@/components/ProductGrid";
import { SocialSection } from "@/components/SocialSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { FlavorVoteSection } from "@/components/FlavorVoteSection";
import { products } from "@/data/products";
import { BRAND } from "@/lib/brand";
import { productCopy } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

export default function Home() {
  const productSchema = products
    .filter((product) => product.available)
    .map((product) => ({
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: productCopy[product.id].et.description,
      image: `${SITE_URL}${product.image}`,
      brand: { "@type": "Brand", name: BRAND.name },
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: product.price.toFixed(2),
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/#order`,
      },
    }));

  const brandSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/emblem.webp`,
    image: `${SITE_URL}/brand/og-preview.webp`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tallinn",
      addressCountry: "EE",
    },
    sameAs: [BRAND.instagram, BRAND.tiktok].filter(Boolean),
  };

  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <ProductGrid />
        <ExperienceSection />
        <GiftSection />
        <EditorialSection />
        <FlavorVoteSection />
        <SocialSection />
        <OrderForm />
        <FAQSection />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }} />
    </>
  );
}
