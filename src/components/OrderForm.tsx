"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { availableProducts } from "@/data/products";

type Quantities = Record<string, number>;

const emptyQuantities = Object.fromEntries(availableProducts.map((product) => [product.id, 0])) as Quantities;
const ORDER_API_URL = process.env.NEXT_PUBLIC_ORDER_API_URL || "/api/order";

export function OrderForm() {
  const [quantities, setQuantities] = useState<Quantities>(emptyQuantities);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const handleAdd = (event: Event) => {
      const custom = event as CustomEvent<{ id: string }>;
      if (!custom.detail?.id) return;
      setQuantities((current) => ({
        ...current,
        [custom.detail.id]: Math.min((current[custom.detail.id] ?? 0) + 1, 20),
      }));
    };
    window.addEventListener("meloa:add-product", handleAdd);
    return () => window.removeEventListener("meloa:add-product", handleAdd);
  }, []);

  const summary = useMemo(() => {
    return availableProducts.reduce(
      (acc, product) => {
        const quantity = quantities[product.id] ?? 0;
        acc.count += quantity;
        acc.total += quantity * product.price;
        return acc;
      },
      { count: 0, total: 0 }
    );
  }, [quantities]);

  const setQuantity = (id: string, next: number) => {
    setQuantities((current) => ({ ...current, [id]: Math.max(0, Math.min(20, next)) }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    if (status === "loading" || !formElement.reportValidity()) return;
    setError("");

    if (summary.count < 1) {
      setError("Добавьте хотя бы одну плитку.");
      return;
    }

    setStatus("loading");
    const form = new FormData(formElement);

    const payload = {
      name: String(form.get("name") || ""),
      contact: String(form.get("contact") || ""),
      comment: String(form.get("comment") || ""),
      fulfillment: String(form.get("fulfillment") || ""),
      consent: form.get("consent") === "on",
      items: availableProducts
        .map((product) => ({
          id: product.id,
          name: product.name,
          quantity: quantities[product.id] ?? 0,
          unitPrice: product.price,
        }))
        .filter((item) => item.quantity > 0),
    };

    try {
      const response = await fetch(ORDER_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || "Не удалось отправить заказ.");
      formElement.reset();
      setQuantities(emptyQuantities);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Произошла ошибка. Попробуйте ещё раз.");
    }
  };

  if (status === "success") {
    return (
      <section id="order" className="section shell">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-cocoa/12 bg-cream p-8 text-center shadow-soft sm:p-12">
          <p className="eyebrow">THANK YOU</p>
          <h2 className="section-title mt-4">Заказ получен</h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-cocoa/65">
            Мы свяжемся с вами для подтверждения заказа, оплаты и времени получения.
          </p>
          <button type="button" className="button button-dark mt-8 min-h-12 focus-ring" onClick={() => setStatus("idle")}>
            Сделать ещё заказ
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="section shell scroll-mt-24">
      <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
        <div>
          <p className="eyebrow">ORDER</p>
          <h2 className="section-title mt-4">Заказать шоколад</h2>
          <p className="mt-5 max-w-md text-base leading-7 text-cocoa/65">
            Выберите количество и оставьте контакт. Мы лично подтвердим заказ и детали получения.
          </p>

          <div className="mt-8 rounded-[1.5rem] bg-pistachio/22 p-5">
            <p className="text-sm font-semibold">Как это работает</p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-cocoa/62">
              <p><span className="font-medium text-cocoa">Самовывоз:</span> Tallinn, точную точку и время подтверждаем после заказа.</p>
              <p><span className="font-medium text-cocoa">Доставка:</span> возможность и стоимость подтверждаем индивидуально.</p>
              <p><span className="font-medium text-cocoa">Оплата:</span> детали отправим вместе с подтверждением заказа.</p>
            </div>
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-cocoa/12 p-5">
            <p className="text-sm font-semibold">Итого</p>
            <div className="mt-2 flex items-end justify-between gap-4">
              <span className="text-sm text-cocoa/60">{summary.count} {summary.count === 1 ? "плитка" : "плиток"}</span>
              <span className="font-serif text-4xl">€{summary.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="rounded-[2rem] border border-cocoa/12 bg-cream p-5 shadow-soft sm:p-8" noValidate>
          <fieldset>
            <legend className="text-sm font-semibold">Количество</legend>
            <div className="mt-3 divide-y divide-cocoa/10 border-y border-cocoa/10">
              {availableProducts.map((product) => {
                const value = quantities[product.id] ?? 0;
                return (
                  <div key={product.id} className="flex items-center justify-between gap-4 py-4">
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="mt-1 text-xs text-cocoa/55">{product.weight} · €{product.price}</p>
                    </div>
                    <div className="flex items-center rounded-full border border-cocoa/16" aria-label={`Количество ${product.name}`}>
                      <button type="button" onClick={() => setQuantity(product.id, value - 1)} className="focus-ring min-h-11 min-w-11 rounded-l-full text-lg" aria-label={`Уменьшить количество ${product.name}`}>−</button>
                      <output className="min-w-8 text-center text-sm" aria-live="polite">{value}</output>
                      <button type="button" onClick={() => setQuantity(product.id, value + 1)} className="focus-ring min-h-11 min-w-11 rounded-r-full text-lg" aria-label={`Увеличить количество ${product.name}`}>+</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <label className="field">
              <span>Имя</span>
              <input name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder="Anna" />
            </label>
            <label className="field">
              <span>Telegram / телефон</span>
              <input name="contact" required minLength={3} maxLength={100} autoComplete="tel" placeholder="@anna или +372..." />
            </label>
          </div>

          <fieldset className="mt-7">
            <legend className="text-sm font-semibold">Получение</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="choice"><input type="radio" name="fulfillment" value="Самовывоз" defaultChecked /><span>Самовывоз</span></label>
              <label className="choice"><input type="radio" name="fulfillment" value="Доставка" /><span>Доставка</span></label>
            </div>
          </fieldset>

          <label className="field mt-7">
            <span>Комментарий</span>
            <textarea name="comment" maxLength={500} rows={3} placeholder="Например: подарок на день рождения" />
          </label>

          <label className="mt-6 flex gap-3 text-sm leading-5 text-cocoa/65">
            <input name="consent" type="checkbox" required className="mt-0.5 h-5 w-5 accent-cocoa" />
            <span>Я согласен(а) на обработку данных, необходимых для оформления и подтверждения заказа.</span>
          </label>

          {error && <p className="mt-5 rounded-xl bg-berry/10 px-4 py-3 text-sm text-berry" role="alert">{error}</p>}

          <button type="submit" disabled={status === "loading" || summary.count < 1} className="button button-dark mt-7 min-h-12 w-full focus-ring disabled:cursor-not-allowed disabled:opacity-45">
            {status === "loading" ? "Отправляем…" : summary.count > 0 ? `Отправить заказ · €${summary.total.toFixed(2)}` : "Сначала выберите количество"}
          </button>
        </form>
      </div>

      {summary.count > 0 && (
        <div className="fixed inset-x-3 bottom-3 z-40 md:hidden">
          <a href="#order" className="button button-dark min-h-14 w-full shadow-soft focus-ring">
            Заказать · {summary.count} {summary.count === 1 ? "плитка" : "плиток"} · €{summary.total.toFixed(2)}
          </a>
        </div>
      )}
    </section>
  );
}
