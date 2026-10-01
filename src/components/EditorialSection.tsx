"use client";

import Image from "next/image";
import { assetPath } from "@/lib/asset";
import { useLanguage } from "@/components/LanguageProvider";

export function EditorialSection() {
  const { t } = useLanguage();

  return (
    <section className="section bg-burgundy text-cream">
      <div className="shell grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
        <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-cocoa/20 sm:aspect-[16/10]">
          <Image
            src={assetPath("/images/process-2.jpg")}
            alt="Handmade chocolate preparation in Tallinn"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="eyebrow !text-cream/55">{t.editorial.kicker}</p>
          <h2 className="mt-5 font-serif text-4xl leading-[1.02] tracking-[-.03em] text-cream sm:text-5xl">{t.editorial.title}</h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-cream/68">{t.editorial.body}</p>
          <p className="mt-8 border-t border-cream/15 pt-5 text-sm leading-6 text-cream/55">{t.editorial.corporate}</p>
        </div>
      </div>
    </section>
  );
}
