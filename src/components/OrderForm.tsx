"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { availableProducts } from "@/data/products";
import { useCart } from "@/components/CartProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { assetPath } from "@/lib/asset";

const ORDER_API_URL = process.env.NEXT_PUBLIC_ORDER_API_URL || "/api/order";

const localCopy = {
  et: { decrease: "Vähenda kogust", increase: "Suurenda kogust", privacy: "Selle vormi saatmine ei võta makset. Makse ja kättesaamise kinnitame eraldi." },
  ru: { decrease: "Уменьшить количество", increase: "Увеличить количество", privacy: "Отправка формы не списывает оплату. Оплату и получение мы подтвердим отдельно." },
  en: { decrease: "Decrease quantity", increase: "Increase quantity", privacy: "Submitting this form does not take payment. Payment and collection are confirmed separately." },
} as const;

export function OrderForm() {
  const { quantities, setQuantity, count, total, reset } = useCart();
  const { language, t } = useLanguage();
  const ui = localCopy[language];
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    if (status === "loading" || !formElement.reportValidity()) return;
    setError("");

    if (count < 1) {
      setError(t.order.errorEmpty);
      return;
    }

    setStatus("loading");
    const form = new FormData(formElement);
    const payload = {
      type: "order",
      language,
      name: String(form.get("name") || ""),
      contact: String(form.get("contact") || ""),
      comment: String(form.get("comment") || ""),
      fulfillment: String(form.get("fulfillment") || ""),
      consent: form.get("consent") === "on",
      items: availableProducts
        .map((product) => ({ id: product.id, quantity: quantities[product.id] ?? 0 }))
        .filter((item) => item.quantity > 0),
    };

    try {
      const response = await fetch(ORDER_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(t.order.genericError);
      formElement.reset();
      reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setError(t.order.genericError);
    }
  };

  if (status === "success") {
    return (
      <section id="order" className="section shell scroll-mt-24">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-cocoa/12 bg-cream p-8 text-center shadow-soft sm:p-12">
          <Image src={assetPath("/brand/emblem.webp")} alt="" width={88} height={82} className="mx-auto h-20 w-auto object-contain" />
          <p className="eyebrow mt-5">{t.order.successEyebrow}</p>
          <h2 className="section-title mt-4">{t.order.successTitle}</h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-cocoa/65">{t.order.successBody}</p>
          <button type="button" className="button button-dark mt-8 min-h-12 focus-ring" onClick={() => setStatus("idle")}>{t.order.again}</button>
        </div>
      </section>
    );
  }

  const barLabel = count === 1 ? t.order.barOne : t.order.barMany;

  return (
    <section id="order" className="section shell scroll-mt-24">
      <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
        <div>
          <p className="eyebrow">{t.order.eyebrow}</p>
          <h2 className="section-title mt-4">{t.order.title}</h2>
          <p className="mt-5 max-w-md text-base leading-7 text-cocoa/65">{t.order.intro}</p>

          <div className="mt-8 grid gap-3 text-sm leading-6 text-cocoa/62">
            <div className="border-t border-cocoa/12 pt-4"><span className="font-semibold text-cocoa">{t.order.pickupTitle}.</span> {t.order.pickup}</div>
            <div className="border-t border-cocoa/12 pt-4"><span className="font-semibold text-cocoa">{t.order.deliveryTitle}.</span> {t.order.delivery}</div>
            <div className="border-t border-cocoa/12 pt-4"><span className="font-semibold text-cocoa">{t.order.paymentTitle}.</span> {t.order.payment}</div>
          </div>
        </div>

        <form onSubmit={submit} className="rounded-[2rem] border border-cocoa/12 bg-cream p-5 shadow-soft sm:p-8" noValidate>
          <div className="flex flex-col gap-5 border-b border-cocoa/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.12em] text-cocoa/45">{t.order.total}</p>
              <p className="mt-1 font-serif text-4xl">€{total.toFixed(2)}</p>
              <p className="mt-1 text-sm text-cocoa/55">{count} {barLabel}</p>
            </div>
            {availableProducts.map((product) => {
              const value = quantities[product.id] ?? 0;
              return (
                <div key={product.id} className="flex items-center gap-3 sm:gap-4">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-sand">
                    <Image src={assetPath(product.image)} alt="" fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="mt-1 text-xs text-cocoa/50">{product.weight} · €{product.price}</p>
                  </div>
                  <div className="flex items-center rounded-full border border-cocoa/16">
                    <button type="button" onClick={() => setQuantity(product.id, value - 1)} className="focus-ring min-h-11 min-w-11 rounded-l-full text-lg" aria-label={ui.decrease}>−</button>
                    <output className="min-w-8 text-center text-sm" aria-live="polite">{value}</output>
                    <button type="button" onClick={() => setQuantity(product.id, value + 1)} className="focus-ring min-h-11 min-w-11 rounded-r-full text-lg" aria-label={ui.increase}>+</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <label className="field">
              <span>{t.order.name}</span>
              <input name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder="Anna" />
            </label>
            <label className="field">
              <span>{t.order.contact}</span>
              <input name="contact" required minLength={3} maxLength={100} autoComplete="tel" placeholder="@anna / +372…" />
            </label>
          </div>

          <fieldset className="mt-7">
            <legend className="text-sm font-semibold">{t.order.fulfillment}</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="choice"><input type="radio" name="fulfillment" value="Pickup" defaultChecked /><span>{t.order.pickupChoice}</span></label>
              <label className="choice"><input type="radio" name="fulfillment" value="Delivery" /><span>{t.order.deliveryChoice}</span></label>
            </div>
          </fieldset>

          <label className="field mt-7">
            <span>{t.order.note}</span>
            <textarea name="comment" maxLength={500} rows={3} placeholder={t.order.notePlaceholder} />
          </label>

          <label className="mt-6 flex gap-3 text-sm leading-5 text-cocoa/65">
            <input name="consent" type="checkbox" required className="mt-0.5 h-5 w-5 accent-cocoa" />
            <span>{t.order.consent}</span>
          </label>

          {error && <p className="mt-5 rounded-xl bg-berry/10 px-4 py-3 text-sm text-berry" role="alert">{error}</p>}

          <button type="submit" disabled={status === "loading" || count < 1} className="button button-dark mt-7 min-h-12 w-full focus-ring disabled:cursor-not-allowed disabled:opacity-45">
            {status === "loading" ? t.order.sending : count > 0 ? `${t.order.submit} · €${total.toFixed(2)}` : t.order.empty}
          </button>
          <p className="mt-3 text-center text-xs leading-5 text-cocoa/45">{ui.privacy}</p>
        </form>
      </div>

      {count > 0 && (
        <div className="fixed inset-x-3 bottom-3 z-40 md:hidden">
          <a href="#order" className="button button-dark min-h-14 w-full shadow-soft focus-ring">{t.nav.order} · {count} {barLabel} · €${total.toFixed(2)}</a>
        </div>
      )}
    </section>
  );
}
