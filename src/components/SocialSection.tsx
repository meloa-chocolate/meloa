"use client";

import Image from "next/image";
import { BRAND } from "@/lib/brand";
import { assetPath } from "@/lib/asset";
import { useLanguage } from "@/components/LanguageProvider";

const copy = {
  et: {
    eyebrow: "FROM THE STUDIO",
    title: "Vaata, kuidas Meloa valmib",
    body: "Meloa sünnib Tallinnas väikeste partiidena. Sotsiaalmeedias näitame rohkem kaunistamist, pakendamist, uusi maitseid ja päris tööprotsessi.",
    instagram: "Vaata Instagramis",
    tiktok: "Vaata TikTokis",
    captions: ["Kaunistamine käsitsi", "Pakend kui osa kingitusest", "Väikesed partiid Tallinnas"],
  },
  ru: {
    eyebrow: "FROM THE STUDIO",
    title: "Посмотрите, как создаётся Meloa",
    body: "Meloa делается небольшими партиями в Tallinn. В соцсетях показываем больше декора, упаковки, новых вкусов и реального процесса работы.",
    instagram: "Смотреть в Instagram",
    tiktok: "Смотреть в TikTok",
    captions: ["Декор вручную", "Упаковка как часть подарка", "Небольшие партии в Tallinn"],
  },
  en: {
    eyebrow: "FROM THE STUDIO",
    title: "See how Meloa is made",
    body: "Meloa is made in small batches in Tallinn. On social media we share more of the decorating, packaging, new flavours and the real making process.",
    instagram: "See on Instagram",
    tiktok: "See on TikTok",
    captions: ["Finished by hand", "Packaging as part of the gift", "Small batches in Tallinn"],
  },
} as const;

const cards = [
  { image: "/images/process-1.jpg", network: "instagram" as const },
  { image: "/images/gift-box.jpg", network: "instagram" as const },
  { image: "/images/process-3.jpg", network: "tiktok" as const },
];

export function SocialSection() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="section shell" aria-labelledby="social-title">
      <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id="social-title" className="section-title mt-4 max-w-[10ch]">{t.title}</h2>
        </div>
        <div className="max-w-xl lg:justify-self-end">
          <p className="text-base leading-7 text-cocoa/65">{t.body}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="button button-outline min-h-11 focus-ring">{t.instagram}</a>
            <a href={BRAND.tiktok} target="_blank" rel="noreferrer" className="button button-ghost min-h-11 focus-ring">{t.tiktok}</a>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {cards.map((card, index) => {
          const href = card.network === "instagram" ? BRAND.instagram : BRAND.tiktok;
          return (
            <a key={card.image} href={href} target="_blank" rel="noreferrer" className="group block focus-ring" aria-label={t.captions[index]}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-sand">
                <Image
                  src={assetPath(card.image)}
                  alt={t.captions[index]}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1000ms] motion-safe:group-hover:scale-[1.015]"
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-4 border-t border-cocoa/10 pt-3 text-sm">
                <span>{t.captions[index]}</span>
                <span className="text-cocoa/45">↗</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
