"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BRAND } from "@/lib/brand";
import { assetPath } from "@/lib/asset";
import { LANGUAGE_LABELS, Language } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";

const a11yCopy = {
  et: { skip: "Liigu põhisisu juurde", home: "Meloa avaleht", menu: "Põhinavigatsioon", mobile: "Mobiilinavigatsioon", open: "Ava menüü", close: "Sulge menüü", language: "Keel" },
  ru: { skip: "Перейти к основному содержанию", home: "Главная Meloa", menu: "Основная навигация", mobile: "Мобильная навигация", open: "Открыть меню", close: "Закрыть меню", language: "Язык" },
  en: { skip: "Skip to main content", home: "Meloa home", menu: "Main navigation", mobile: "Mobile navigation", open: "Open menu", close: "Close menu", language: "Language" },
} as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const a11y = a11yCopy[language];
  const links = [
    [t.nav.chocolate, "#chocolate"],
    [t.nav.gifts, "#gifts"],
    [t.nav.about, "#about"],
  ] as const;

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  const languagePicker = (
    <div className="flex items-center rounded-full border border-cocoa/12 bg-cream/80 p-1" aria-label={a11y.language}>
      {(Object.keys(LANGUAGE_LABELS) as Language[]).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLanguage(item)}
          className={`focus-ring min-h-9 min-w-10 rounded-full px-2 text-[11px] font-semibold tracking-[0.08em] transition ${language === item ? "bg-cocoa text-cream" : "text-cocoa/55 hover:text-cocoa"}`}
          aria-pressed={language === item}
        >
          {LANGUAGE_LABELS[item]}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <a href="#main-content" className="skip-link">{a11y.skip}</a>
      <header className="sticky top-0 z-50 border-b border-cocoa/8 bg-cream/88 backdrop-blur-xl">
        <div className="shell flex h-18 items-center justify-between gap-5">
          <a href="#top" className="focus-ring flex items-center gap-2 rounded-xl" aria-label={a11y.home}>
            <Image
              src={assetPath("/brand/emblem.webp")}
              alt=""
              width={56}
              height={52}
              priority
              className="h-11 w-auto object-contain"
            />
            <span className="font-serif text-2xl leading-none tracking-[-0.03em] text-cocoa">{BRAND.name}</span>
          </a>

          <nav className="hidden items-center gap-6 md:flex" aria-label={a11y.menu}>
            {links.map(([label, href]) => <a key={href} href={href} className="nav-link focus-ring">{label}</a>)}
            {languagePicker}
            <a href="#order" className="button button-dark min-h-11 px-5 focus-ring">{t.nav.order}</a>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            {languagePicker}
            <button
              type="button"
              className="focus-ring flex min-h-11 min-w-11 items-center justify-center rounded-full border border-cocoa/15"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? a11y.close : a11y.open}
            >
              <span className="text-xl leading-none" aria-hidden="true">{open ? "×" : "≡"}</span>
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-menu" className="border-t border-cocoa/10 bg-cream px-5 py-4 md:hidden" aria-label={a11y.mobile}>
            <div className="mx-auto flex max-w-7xl flex-col">
              {links.map(([label, href]) => (
                <a key={href} href={href} className="focus-ring border-b border-cocoa/10 py-4 text-base" onClick={() => setOpen(false)}>{label}</a>
              ))}
              <a href="#order" onClick={() => setOpen(false)} className="button button-dark mt-4 min-h-12 focus-ring">{t.nav.order}</a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
