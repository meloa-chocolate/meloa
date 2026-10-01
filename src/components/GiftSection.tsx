"use client";

import Image from "next/image";
import { assetPath } from "@/lib/asset";
import { useLanguage } from "@/components/LanguageProvider";

export function GiftSection() {
  const { t } = useLanguage();

  return (
    <section id="gifts" className="section bg-pistachio/18">
      <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative min-h-[500px] overflow-hidden rounded-[2rem] sm:min-h-[660px]">
          <Image
            src={assetPath("/images/gift-box.webp")}
            alt="Meloa chocolate gift packaging with Raspberry Pistachio"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div id="about" className="self-center">
          <p className="eyebrow">{t.gift.eyebrow}</p>
          <h2 className="section-title mt-4">{t.gift.title}</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-cocoa/68">{t.gift.body}</p>

          <div className="mt-10 divide-y divide-cocoa/14 border-y border-cocoa/14">
            {t.gift.benefits.map(([number, title, text]) => (
              <div key={number} className="grid grid-cols-[3rem_1fr] gap-4 py-6 sm:grid-cols-[4rem_1fr]">
                <span className="font-serif text-2xl text-cocoa/45">{number}</span>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-1 max-w-md text-sm leading-6 text-cocoa/64">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-cocoa/12 bg-cream/55 p-5">
            <p className="text-sm font-semibold">{t.gift.noteTitle}</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-cocoa/62">{t.gift.noteBody}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
