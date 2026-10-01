"use client";

import Image from "next/image";
import { products } from "@/data/products";
import { assetPath } from "@/lib/asset";

export function ProductGrid() {
  const signature = products.find((product) => product.id === "raspberry-pistachio")!;
  const coming = products.filter((product) => product.id !== signature.id);

  const addSignature = () => {
    window.dispatchEvent(new CustomEvent("meloa:add-product", { detail: { id: signature.id } }));
    document.querySelector("#order")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="chocolate" className="section shell">
      <div className="max-w-2xl">
        <p className="eyebrow">SIGNATURE BAR</p>
        <h2 className="section-title mt-4">Raspberry Pistachio</h2>
      </div>

      <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand">
          <Image
            src={assetPath(signature.image)}
            alt={signature.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover transition-transform duration-700 motion-safe:hover:scale-[1.02]"
          />
          <span className="absolute left-5 top-5 rounded-full bg-berry px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-cream">
            Signature
          </span>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.1em] text-cocoa/45">{signature.weight} · €{signature.price}</p>
          <h3 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Сливочный, ягодный, с лёгким солёным акцентом.</h3>
          <p className="mt-5 max-w-lg text-base leading-7 text-cocoa/66">{signature.description}</p>
          <p className="mt-5 max-w-lg text-sm leading-6 text-cocoa/52">{signature.subtitle}</p>
          <button type="button" onClick={addSignature} className="button button-dark mt-8 min-h-12 focus-ring">
            Добавить к заказу · €{signature.price}
          </button>
        </div>
      </div>

      <div className="mt-20 border-t border-cocoa/12 pt-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">COMING NEXT</p>
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl">Следующие вкусы</h3>
          </div>
          <p className="max-w-md text-sm leading-6 text-cocoa/55">Новые вкусы уже получили собственную визуальную серию. В продажу добавим их после финальной рецептуры.</p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {coming.map((product) => (
            <article key={product.id} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-sand">
                <Image
                  src={assetPath(product.image)}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]"
                />
                <span className="absolute right-3 top-3 rounded-full bg-cream/92 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-cocoa backdrop-blur-sm">
                  Coming soon
                </span>
              </div>
              <h4 className="mt-4 font-serif text-2xl">{product.name}</h4>
              <p className="mt-2 text-sm leading-6 text-cocoa/55">{product.subtitle}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
