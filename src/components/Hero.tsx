"use client";

import Image from "next/image";
import { assetPath } from "@/lib/asset";
import { useLanguage } from "@/components/LanguageProvider";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="shell grid min-h-[calc(100svh-72px)] items-center gap-10 py-8 lg:grid-cols-[0.78fr_1.22fr] lg:py-12">
      <div className="order-2 max-w-2xl lg:order-1">
        <p className="eyebrow">{t.hero.eyebrow}</p>
        <h1 className="display mt-5 max-w-[8.5ch]">{t.hero.title}</h1>
        <p className="mt-6 max-w-lg text-balance text-base leading-7 text-cocoa/66 sm:text-lg">{t.hero.body}</p>
        <div className="mt-8">
          <a href="#chocolate" className="button button-dark min-h-12 focus-ring">{t.hero.cta}</a>
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand shadow-soft sm:aspect-[5/6] lg:aspect-[4/5]">
          <Image
            src={assetPath("/images/hero.jpg")}
            alt="Meloa handmade chocolate gift presentation"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-center transition-transform duration-[1400ms] motion-safe:hover:scale-[1.012]"
          />
          <div className="absolute inset-x-5 bottom-5 rounded-[1.35rem] bg-cream/92 p-4 backdrop-blur-sm sm:inset-x-auto sm:left-5 sm:max-w-xs">
            <p className="text-sm font-medium">{t.hero.giftTitle}</p>
            <p className="mt-1 text-sm leading-5 text-cocoa/62">{t.hero.giftBody}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
