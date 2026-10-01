import { BRAND } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="border-t border-cocoa/12 bg-sand/55">
      <div className="shell py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="brand-mark">{BRAND.name}</p>
            <p className="mt-3 text-sm leading-6 text-cocoa/60">Handmade chocolate<br />{BRAND.city}</p>
          </div>
          <div>
            <p className="footer-title">Social</p>
            <div className="footer-links">
              <a href={BRAND.instagram}>Instagram</a>
              <a href={BRAND.tiktok}>TikTok</a>
              <a href={BRAND.telegram}>Telegram</a>
            </div>
          </div>
          <div>
            <p className="footer-title">Shop</p>
            <div className="footer-links">
              <a href="#order">Order</a>
              <a href={`mailto:${BRAND.contact}`}>Contact</a>
            </div>
          </div>
          <div>
            <p className="footer-title">Legal</p>
            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms</a>
              <a href="#allergens">Allergens</a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-cocoa/10 pt-5 text-xs text-cocoa/45">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
