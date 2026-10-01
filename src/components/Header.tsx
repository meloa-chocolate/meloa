"use client";

import { useEffect, useState } from "react";
import { BRAND } from "@/lib/brand";

const links = [
  ["Chocolate", "#chocolate"],
  ["About", "#about"],
  ["Gifts", "#gifts"],
  ["Order", "#order"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-cocoa/10 bg-cream/90 backdrop-blur-md">
      <div className="shell flex h-18 items-center justify-between gap-6">
        <a href="#top" className="brand-mark focus-ring" aria-label={`${BRAND.name}, на главную`}>
          {BRAND.name}
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Основная навигация">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="nav-link focus-ring">
              {label}
            </a>
          ))}
          <a href="#order" className="button button-dark min-h-11 px-5 focus-ring">
            Заказать
          </a>
        </nav>

        <button
          type="button"
          className="focus-ring flex min-h-11 min-w-11 items-center justify-center rounded-full border border-cocoa/15 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
        >
          <span className="text-xl leading-none">{open ? "×" : "≡"}</span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="border-t border-cocoa/10 bg-cream px-5 py-4 md:hidden"
          aria-label="Мобильная навигация"
        >
          <div className="mx-auto flex max-w-7xl flex-col">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="focus-ring border-b border-cocoa/10 py-4 text-base"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
            <a href="#order" onClick={() => setOpen(false)} className="button button-dark mt-4 min-h-12 focus-ring">
              Заказать
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
