"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { products } from "@/data/products";
import { assetPath } from "@/lib/asset";
import { productCopy } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";
import { useCart } from "@/components/CartProvider";

const localCopy = {
  et: {
    available: "Saadaval",
    development: "Arenduses",
    vote: "Hääleta selle maitse poolt",
    close: "Sulge",
    zoom: "Suurenda pilti",
    decrease: "Vähenda kogust",
    increase: "Suurenda kogust",
    signature: "Signature",
    signatureIngredients: [
      "Valge Belgia šokolaad",
      "Kooritud ja soolamata pistaatsiapähklid",
      "Külmkuivatatud vaarikas",
      "Jäme meresool",
    ],
  },
  ru: {
    available: "Доступно",
    development: "В разработке",
    vote: "Проголосовать за этот вкус",
    close: "Закрыть",
    zoom: "Увеличить изображение",
    decrease: "Уменьшить количество",
    increase: "Увеличить количество",
    signature: "Signature",
    signatureIngredients: [
      "Белый бельгийский шоколад",
      "Фисташки, очищенные и несолёные",
      "Сублимированная малина",
      "Крупная морская соль",
    ],
  },
  en: {
    available: "Available",
    development: "In development",
    vote: "Vote for this flavour",
    close: "Close",
    zoom: "Zoom image",
    decrease: "Decrease quantity",
    increase: "Increase quantity",
    signature: "Signature",
    signatureIngredients: [
      "Belgian white chocolate",
      "Shelled unsalted pistachios",
      "Freeze-dried raspberry",
      "Coarse sea salt",
    ],
  },
} as const;

export function ProductGrid() {
  const { language, t } = useLanguage();
  const { quantities, setQuantity } = useCart();
  const [zoomed, setZoomed] = useState<string | null>(null);
  const signature = products.find((product) => product.id === "raspberry-pistachio")!;
  const coming = products.filter((product) => product.id !== signature.id);
  const quantity = quantities[signature.id] ?? 0;
  const ui = localCopy[language];

  useEffect(() => {
    if (!zoomed) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomed(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [zoomed]);

  const addSignature = () => {
    if (quantity < 1) setQuantity(signature.id, 1);
  };

  const selectForVote = (productId: string) => {
    window.dispatchEvent(new CustomEvent("meloa-select-flavor", { detail: productId }));
  };

  return (
    <section id="chocolate" className="section shell scroll-mt-24">
      <div className="max-w-2xl">
        <p className="eyebrow">{t.signature.eyebrow}</p>
        <h2 className="section-title mt-4">{t.signature.title}</h2>
      </div>

      <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
        <button type="button" onClick={() => setZoomed(signature.image)} className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand text-left focus-ring" aria-label={`${ui.zoom}: ${signature.name}`}>
          <Image
            src={assetPath(signature.image)}
            alt={`${signature.name} — ${productCopy[signature.id][language].subtitle}`}
            fill
            sizes="(max-width: 1024px) 100vw, 56vw"
            className="object-cover transition-transform duration-[1200ms] motion-safe:group-hover:scale-[1.012]"
          />
          <span className="absolute left-5 top-5 rounded-full bg-berry px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-cream">{ui.signature}</span>
          <span className="absolute bottom-5 right-5 rounded-full bg-cream/90 px-3 py-1.5 text-xs font-medium text-cocoa backdrop-blur-sm" aria-hidden="true">＋</span>
        </button>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm uppercase tracking-[0.1em] text-cocoa/45">{t.signature.meta}</p>
            <span className="rounded-full bg-pistachio/24 px-3 py-1 text-xs font-medium text-cocoa">{ui.available}</span>
          </div>
          <h3 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">{t.signature.headline}</h3>
          <p className="mt-5 max-w-lg text-base leading-7 text-cocoa/66">{productCopy[signature.id][language].description}</p>
          <p className="mt-5 max-w-lg text-sm leading-6 text-cocoa/52">{productCopy[signature.id][language].subtitle}</p>

          <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {ui.signatureIngredients.map((ingredient) => <span key={ingredient} className="rounded-[1rem] border border-cocoa/10 bg-sand/35 px-3 py-3 text-xs leading-5 text-cocoa/62">{ingredient}</span>)}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex min-h-12 items-center rounded-full border border-cocoa/16 bg-cream" aria-label={t.signature.quantity}>
              <button type="button" onClick={() => setQuantity(signature.id, quantity - 1)} className="focus-ring min-h-12 min-w-12 rounded-l-full text-xl" aria-label={ui.decrease}>−</button>
              <output className="min-w-10 text-center text-sm font-semibold" aria-live="polite">{quantity}</output>
              <button type="button" onClick={() => setQuantity(signature.id, quantity + 1)} className="focus-ring min-h-12 min-w-12 rounded-r-full text-xl" aria-label={ui.increase}>+</button>
            </div>
            <a href={quantity > 0 ? "#order" : "#chocolate"} onClick={addSignature} className="button button-dark min-h-12 focus-ring">
              {quantity > 0 ? `${t.signature.inOrder} · ${quantity} · €${(quantity * signature.price).toFixed(2)}` : `${t.signature.add} · €${signature.price}`}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-20 border-t border-cocoa/12 pt-10">
        <div className="grid gap-5 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <div>
            <p className="eyebrow">{t.next.eyebrow}</p>
            <h3 className="mt-3 font-serif text-4xl sm:text-5xl">{t.next.title}</h3>
          </div>
          <p className="max-w-xl text-sm leading-6 text-cocoa/55 lg:justify-self-end">{t.next.body}</p>
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2">
          {coming.map((product) => (
            <article key={product.id} className="group">
              <button type="button" onClick={() => setZoomed(product.image)} className="relative block aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-sand text-left focus-ring" aria-label={`${ui.zoom}: ${product.name}`}>
                <Image
                  src={assetPath(product.image)}
                  alt={`${product.name} — ${productCopy[product.id][language].subtitle}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1000ms] motion-safe:group-hover:scale-[1.012]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1.5 text-xs font-medium text-cocoa backdrop-blur-sm">{ui.development}</span>
                <span className="absolute bottom-4 right-4 rounded-full bg-cream/90 px-3 py-1.5 text-xs font-medium text-cocoa backdrop-blur-sm" aria-hidden="true">＋</span>
              </button>
              <div className="mt-4 flex items-start justify-between gap-5 border-t border-cocoa/10 pt-4">
                <div>
                  <h4 className="font-serif text-2xl sm:text-3xl">{product.name}</h4>
                  <a href="#vote" onClick={() => selectForVote(product.id)} className="mt-2 inline-block text-xs font-semibold uppercase tracking-[.08em] text-berry underline-offset-4 hover:underline">{ui.vote}</a>
                </div>
                <p className="max-w-[18rem] text-right text-sm leading-6 text-cocoa/52">{productCopy[product.id][language].subtitle}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {zoomed && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-cocoa/85 p-4" role="dialog" aria-modal="true" aria-label={ui.zoom}>
          <button type="button" onClick={() => setZoomed(null)} className="absolute right-5 top-5 z-10 rounded-full bg-cream px-4 py-2 text-sm font-medium text-cocoa focus-ring">{ui.close} ×</button>
          <button type="button" onClick={() => setZoomed(null)} className="absolute inset-0" aria-label={ui.close} />
          <div className="relative z-[1] h-[82vh] w-full max-w-4xl overflow-hidden rounded-[1.5rem] bg-sand">
            <Image src={assetPath(zoomed)} alt="Meloa chocolate detail" fill sizes="95vw" className="object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}
