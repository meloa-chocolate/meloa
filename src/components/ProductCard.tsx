"use client";

import Image from "next/image";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const add = () => {
    window.dispatchEvent(new CustomEvent("meloa:add-product", { detail: { id: product.id } }));
    document.querySelector("#order")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <article className="group flex h-full flex-col border-t border-cocoa/15 pt-5">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-sand">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]"
        />
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-berry px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-cream">
            {product.badge}
          </span>
        )}
        {!product.available && (
          <span className="absolute right-4 top-4 rounded-full bg-cocoa/85 px-3 py-1.5 text-xs font-semibold text-cream">
            Скоро
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-3xl leading-none">{product.name}</h3>
            <p className="mt-2 text-sm leading-5 text-cocoa/58">{product.subtitle}</p>
          </div>
          <p className="shrink-0 text-base font-semibold">€{product.price}</p>
        </div>

        <p className="mt-4 text-sm leading-6 text-cocoa/72">{product.description}</p>

        <details className="mt-4 border-y border-cocoa/10 py-3 text-sm">
          <summary className="cursor-pointer list-none font-medium focus-ring">Состав и информация</summary>
          <div className="mt-3 space-y-2 text-cocoa/65">
            <p><span className="font-medium text-cocoa">Вес:</span> {product.weight}</p>
            <p><span className="font-medium text-cocoa">Ингредиенты:</span> {product.ingredients.join(", ")}.</p>
            <p><span className="font-medium text-cocoa">Аллергены:</span> {product.foodInfo.allergens}</p>
            <p><span className="font-medium text-cocoa">Хранение:</span> {product.foodInfo.storage}</p>
          </div>
        </details>

        <button
          type="button"
          onClick={add}
          disabled={!product.available}
          className="button button-outline mt-5 min-h-12 w-full focus-ring disabled:cursor-not-allowed disabled:opacity-45"
        >
          {product.available ? "Добавить к заказу" : "Временно недоступно"}
        </button>
      </div>
    </article>
  );
}
