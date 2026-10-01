"use client";

import Image from "next/image";
import { useState } from "react";
import { products } from "@/data/products";
import { assetPath } from "@/lib/asset";
import { productCopy } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";
import { useCart } from "@/components/CartProvider";

const ingredientCopy = {
  et: ["Belgia valge šokolaad", "Pistaatsia", "Külmkuivatatud vaarikas", "Jäme meresool"],
  ru: ["Белый бельгийский шоколад", "Фисташка", "Сублимированная малина", "Крупная морская соль"],
  en: ["Belgian white chocolate", "Pistachio", "Freeze-dried raspberry", "Coarse sea salt"],
} as const;

const feedbackCopy = {
  et: "Lisatud tellimusse",
  ru: "Добавлено в заказ",
  en: "Added to order",
} as const;

export function ProductGrid() {
  const { language, t } = useLanguage();
  const { quantities, setQuantity } = useCart();
  const [feedback, setFeedback] = useState(false);
  const signature = products.find((product) => product.id === "raspberry-pistachio")!;
  const coming = products.filter((product) => product.id !== signature.id);
  const quantity = quantities[signature.id] ?? 0;

  const showFeedback = () => {
    setFeedback(true);
    window.setTimeout(() => setFeedback(false), 1400);
  };

  const increase = () => {
    setQuantity(signature.id, quantity + 1);
    showFeedback();
  };

  const primaryAction = () => {
    if (quantity === 0) {
      setQuantity(signature.id, 1);
      showFeedback();
      return;
    }
    document.querySelector("#order")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="chocolate" className="section shell">
      <div className="max-w-2xl">
        <p className="eyebrow">{t.signature.eyebrow}</p>
        <h2 className="section-title mt-4">{t.signature.title}</h2>
      </div>

      <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand">
          <Image
            src={assetPath(signature.image)}
            alt={signature.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 56vw"
            className="object-cover transition-transform duration-[1200ms] motion-safe:hover:scale-[1.012]"
          />
          <span className="absolute left-5 top-5 rounded-full bg-berry px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-cream">Signature</span>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.1em] text-cocoa/45">{t.signature.meta}</p>
          <h3 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">{t.signature.headline}</h3>
          <p className="mt-5 max-w-lg text-base leading-7 text-cocoa/66">{productCopy[signature.id][language].description}</p>

          <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-[1.25rem] bg-cocoa/10">
            {ingredientCopy[language].map((ingredient, index) => (
              <div key={ingredient} className="bg-cream px-4 py-4">
                <p className="text-[11px] font-semibold tracking-[.12em] text-cocoa/35">0{index + 1}</p>
                <p className="mt-1 text-sm leading-5 text-cocoa/72">{ingredient}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex min-h-12 items-center rounded-full border border-cocoa/16 bg-cream" aria-label={t.signature.quantity}>
              <button type="button" onClick={() => setQuantity(signature.id, quantity - 1)} className="focus-ring min-h-12 min-w-12 rounded-l-full text-xl" aria-label="Decrease">−</button>
              <output className="min-w-10 text-center text-sm font-semibold" aria-live="polite">{quantity}</output>
              <button type="button" onClick={increase} className="focus-ring min-h-12 min-w-12 rounded-r-full text-xl" aria-label="Increase">+</button>
            </div>
            <button type="button" onClick={primaryAction} className="button button-dark min-h-12 focus-ring">
              {quantity > 0 ? `${t.nav.order} · ${quantity} · €${(quantity * signature.price).toFixed(2)}` : `${t.signature.add} · €${signature.price}`}
            </button>
            <span className={`text-sm text-cocoa/55 transition-opacity duration-200 ${feedback ? "opacity-100" : "opacity-0"}`} role="status" aria-live="polite">
              {feedbackCopy[language]}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-24 border-t border-cocoa/12 pt-10">
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
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-sand">
                <Image
                  src={assetPath(product.image)}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1000ms] motion-safe:group-hover:scale-[1.012]"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-5 border-t border-cocoa/10 pt-4">
                <h4 className="font-serif text-2xl sm:text-3xl">{product.name}</h4>
                <p className="max-w-[18rem] text-right text-sm leading-6 text-cocoa/52">{productCopy[product.id][language].subtitle}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
