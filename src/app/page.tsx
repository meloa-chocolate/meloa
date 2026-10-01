import { Footer } from "@/components/Footer";
import { GiftSection } from "@/components/GiftSection";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { EditorialSection } from "@/components/EditorialSection";
import { FAQSection } from "@/components/FAQSection";
import { OrderForm } from "@/components/OrderForm";
import { ProductGrid } from "@/components/ProductGrid";
import { SocialSection } from "@/components/SocialSection";
import { products } from "@/data/products";
import { BRAND } from "@/lib/brand";
import { SITE_URL } from "@/lib/site";

export default function Home() {
  const productSchema = products
    .filter((product) => product.available)
    .map((product) => ({
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
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
      <main>
        <Hero />
        <ProductGrid />
        <GiftSection />
        <EditorialSection />
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
