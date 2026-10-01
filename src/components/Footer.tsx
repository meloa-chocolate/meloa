"use client";

import { BRAND } from "@/lib/brand";
import { useLanguage } from "@/components/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();
  const socialLinks = [
    ["Instagram", BRAND.instagram],
    ["TikTok", BRAND.tiktok],
    ["Telegram", BRAND.telegram],
  ].filter(([, href]) => href && href !== "#");
  const hasContact = BRAND.contact && !BRAND.contact.includes("example.com");

  return (
    <footer className="border-t border-cocoa/12 bg-sand/55">
      <div className="shell py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="brand-mark">{BRAND.name}</p>
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
              {hasContact && <a href={`mailto:${BRAND.contact}`}>{t.footer.contact}</a>}
            </div>
          </div>

          <div>
            <p className="footer-title">Info</p>
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
