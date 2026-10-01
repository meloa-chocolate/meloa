"use client";

import Image from "next/image";
import { BRAND } from "@/lib/brand";
import { assetPath } from "@/lib/asset";
import { useLanguage } from "@/components/LanguageProvider";

const localCopy = {
  et: { info: "Info", home: "Meloa avaleht" },
  ru: { info: "Информация", home: "Главная Meloa" },
  en: { info: "Info", home: "Meloa home" },
} as const;

export function Footer() {
  const { language, t } = useLanguage();
  const ui = localCopy[language];
  const socialLinks = [
    ["Instagram", BRAND.instagram],
    ["TikTok", BRAND.tiktok],
    ["Telegram", BRAND.telegram],
  ].filter(([, href]) => href && href !== "#");
  const contact = String(BRAND.contact);
  const hasContact = contact.length > 0 && !contact.includes("example.com");

  return (
    <footer className="border-t border-cocoa/12 bg-sand/55">
      <div className="shell py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#top" className="focus-ring inline-block rounded-2xl" aria-label={ui.home}>
              <Image
                src={assetPath("/brand/logo.webp")}
                alt="Meloa — Handmade Chocolate · Tallinn"
                width={700}
                height={438}
                className="h-auto w-44 object-contain"
              />
            </a>
            <p className="mt-3 text-sm leading-6 text-cocoa/60">{t.footer.tagline}</p>
          </div>

          <div>
            <p className="footer-title">{t.footer.social}</p>
            <div className="footer-links">
              {socialLinks.length > 0 ? socialLinks.map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer">{label} ↗</a>
              )) : <span className="text-cocoa/38">—</span>}
            </div>
          </div>

          <div>
            <p className="footer-title">{t.footer.order}</p>
            <div className="footer-links">
              <a href="#order">{t.footer.order}</a>
              {hasContact && <a href={`mailto:${contact}`}>{t.footer.contact}</a>}
            </div>
          </div>

          <div>
            <p className="footer-title">{ui.info}</p>
            <p className="mt-3 max-w-xs text-sm leading-6 text-cocoa/55">{t.footer.note}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-cocoa/10 pt-5 text-xs text-cocoa/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {BRAND.name}. {t.footer.rights}</span>
          <span>{BRAND.city}</span>
        </div>
      </div>
    </footer>
  );
}
