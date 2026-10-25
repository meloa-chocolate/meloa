"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { useCart } from "@/components/CartProvider";
import { products } from "@/data/products";
import { assetPath } from "@/lib/asset";

const copy = {
  et: {
    eyebrow: "LIMITED BATCH",
    title: "Raspberry Pistachio Mini Cupcakes",
    intro: "Praegu saadaval üks värske partii: 6 vaarika ja pistaatsiaga minikoogikest.",
    available: "Saadaval praegu",
    stock: "6 minikoogikest · 1 komplekt",
    weight: "≈45 g tk · ≈270 g kokku",
    price: "€12 komplekt",
    add: "Lisa tellimusse",
    inOrder: "Tellimuses",
    note: "Kogus on piiratud praeguse partiiga.",
    groupAlt: "Kuus vaarika ja pistaatsiaga minikoogikest",
    detailAlt: "Vaarika ja pistaatsiaga minikoogike lähivaates",
    groupCaption: "Kogu partii · 6 tk",
    detailCaption: "Detail · ≈45 g tk",
  },
  ru: {
    eyebrow: "LIMITED BATCH",
    title: "Raspberry Pistachio Mini Cupcakes",
    intro: "Сейчас доступна одна свежая партия: 6 мини-капкейков с малиной и фисташкой.",
    available: "В наличии сейчас",
    stock: "6 мини-капкейков · 1 набор",
    weight: "≈45 г каждый · ≈270 г набор",
    price: "€12 за набор",
    add: "Добавить в заказ",
    inOrder: "В заказе",
    note: "Количество ограничено текущей партией.",
    groupAlt: "Шесть мини-капкейков с малиной и фисташкой",
    detailAlt: "Мини-капкейк с малиной и фисташкой крупным планом",
    groupCaption: "Вся партия · 6 шт",
    detailCaption: "Крупный план · ≈45 г",
  },
  en: {
    eyebrow: "LIMITED BATCH",
    title: "Raspberry Pistachio Mini Cupcakes",
    intro: "One fresh batch is available now: 6 mini cupcakes with raspberry and pistachio.",
    available: "Available now",
    stock: "6 mini cupcakes · 1 set",
    weight: "≈45 g each · ≈270 g total",
    price: "€12 per set",
    add: "Add to order",
    inOrder: "In your order",
    note: "Quantity is limited to the current batch.",
    groupAlt: "Six raspberry pistachio mini cupcakes",
    detailAlt: "Raspberry pistachio mini cupcake close-up",
    groupCaption: "Full batch · 6 pcs",
    detailCaption: "Close-up · ≈45 g each",
  },
} as const;

export function CupcakeSection() {
  const { language } = useLanguage();
  const { quantities, setQuantity } = useCart();
  const t = copy[language];
  const product = products.find((item) => item.id === "raspberry-pistachio-mini-cupcakes")!;
  const quantity = quantities[product.id] ?? 0;

  const addToOrder = () => {
    setQuantity(product.id, 1);
    requestAnimationFrame(() => {
      document.querySelector("#order")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section id="cupcakes" className="section shell scroll-mt-24">
      <div className="grid gap-5 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="section-title mt-4 max-w-[12ch]">{t.title}</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-cocoa/55 lg:justify-self-end">{t.intro}</p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-sand">
            <Image
              src={assetPath("/images/cupcakes-classic.svg")}
              alt={t.groupAlt}
              fill
              priority={false}
              sizes="(max-width: 1024px) 100vw, 62vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 border-t border-cocoa/10 pt-3 text-sm text-cocoa/55">{t.groupCaption}</figcaption>
        </figure>

        <figure>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-sand">
            <Image
              src={assetPath("/images/cupcakes-mini.svg")}
              alt={t.detailAlt}
              fill
              priority={false}
              sizes="(max-width: 1024px) 100vw, 38vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 border-t border-cocoa/10 pt-3 text-sm text-cocoa/55">{t.detailCaption}</figcaption>
        </figure>
      </div>

      <div className="mt-8 rounded-[2rem] border border-cocoa/12 bg-cream p-6 shadow-soft sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-pistachio/24 px-3 py-1 text-xs font-medium text-cocoa">{t.available}</span>
            <span className="text-xs uppercase tracking-[.1em] text-cocoa/45">{t.stock}</span>
          </div>
          <p className="mt-4 font-serif text-3xl">{t.price}</p>
          <p className="mt-2 text-sm text-cocoa/58">{t.weight}</p>
          <p className="mt-2 text-xs text-cocoa/45">{t.note}</p>
        </div>

        <button
          type="button"
          onClick={addToOrder}
          disabled={quantity > 0}
          className="button button-dark mt-6 min-h-12 w-full focus-ring disabled:cursor-default disabled:opacity-75 lg:mt-0 lg:w-auto"
        >
          {quantity > 0 ? t.inOrder : t.add}
        </button>
      </div>
    </section>
  );
}
