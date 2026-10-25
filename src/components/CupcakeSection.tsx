"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { assetPath } from "@/lib/asset";

const copy = {
  et: {
    eyebrow: "CUPCAKES",
    title: "Vaarikas · pistaatsia",
    intro: "Kaks sama maitsekombinatsiooni formaati: klassikaline tassikook ja mini-versioon.",
    new: "Uus",
    classic: {
      label: "CLASSIC",
      title: "Raspberry Pistachio Cupcake",
      body: "Täissuuruses tassikook vaarika ja pistaatsiapähkliga.",
      alt: "Klassikalised vaarika-pistaatsia tassikoogid",
    },
    mini: {
      label: "MINI",
      title: "Raspberry Pistachio Mini",
      body: "Väiksem formaat sama vaarika ja pistaatsiapähkli kombinatsiooniga.",
      alt: "Mini vaarika-pistaatsia tassikook",
    },
  },
  ru: {
    eyebrow: "CUPCAKES",
    title: "Малина · фисташка",
    intro: "Два формата одного сочетания: классические капкейки и мини-версия.",
    new: "Новинка",
    classic: {
      label: "CLASSIC",
      title: "Raspberry Pistachio Cupcake",
      body: "Полноразмерный капкейк с малиной и фисташкой.",
      alt: "Классические капкейки с малиной и фисташками",
    },
    mini: {
      label: "MINI",
      title: "Raspberry Pistachio Mini",
      body: "Небольшой формат с тем же сочетанием малины и фисташки.",
      alt: "Мини-капкейк с малиной и фисташками",
    },
  },
  en: {
    eyebrow: "CUPCAKES",
    title: "Raspberry · pistachio",
    intro: "Two formats of the same pairing: a classic cupcake and a mini version.",
    new: "New",
    classic: {
      label: "CLASSIC",
      title: "Raspberry Pistachio Cupcake",
      body: "A full-size cupcake with raspberry and pistachio.",
      alt: "Classic raspberry pistachio cupcakes",
    },
    mini: {
      label: "MINI",
      title: "Raspberry Pistachio Mini",
      body: "A smaller format with the same raspberry and pistachio pairing.",
      alt: "Mini raspberry pistachio cupcake",
    },
  },
} as const;

const cards = [
  { key: "classic", image: "/images/cupcakes-classic.svg" },
  { key: "mini", image: "/images/cupcakes-mini.svg" },
] as const;

export function CupcakeSection() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section id="cupcakes" className="section shell scroll-mt-24">
      <div className="grid gap-5 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="section-title mt-4">{t.title}</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-cocoa/55 lg:justify-self-end">
          {t.intro}
        </p>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {cards.map((card) => {
          const item = t[card.key];

          return (
            <article key={card.key} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-sand">
                <Image
                  src={assetPath(card.image)}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1000ms] motion-safe:group-hover:scale-[1.012]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-cream/92 px-3 py-1.5 text-xs font-semibold uppercase tracking-[.08em] text-cocoa backdrop-blur-sm">
                  {t.new}
                </span>
              </div>

              <div className="mt-4 border-t border-cocoa/10 pt-4">
                <p className="text-xs font-semibold uppercase tracking-[.12em] text-cocoa/45">
                  {item.label}
                </p>
                <h3 className="mt-2 font-serif text-3xl leading-tight">{item.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-cocoa/58">{item.body}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
