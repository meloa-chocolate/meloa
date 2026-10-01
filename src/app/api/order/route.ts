import { NextResponse } from "next/server";
import { products } from "@/data/products";

export const runtime = "nodejs";

type OrderItem = {
  id: string;
  name?: string;
  quantity: number;
  unitPrice?: number;
};

type OrderPayload = {
  name: string;
  contact: string;
  comment?: string;
  fulfillment: "Самовывоз" | "Доставка" | string;
  consent: boolean;
  items: OrderItem[];
};

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[char] ?? char));

export async function POST(request: Request) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("Telegram environment variables are missing.");
      return NextResponse.json({ error: "Сервис заказов ещё не настроен. Свяжитесь с нами напрямую." }, { status: 503 });
    }

    let body: Partial<OrderPayload>;
    try {
      const parsed: unknown = await request.json();
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        return NextResponse.json({ error: "Некорректный заказ." }, { status: 400 });
      }
      body = parsed as Partial<OrderPayload>;
    } catch {
      return NextResponse.json({ error: "Некорректный заказ." }, { status: 400 });
    }
    const name = clean(body.name, 80);
    const contact = clean(body.contact, 100);
    const comment = clean(body.comment, 500);
    const fulfillment = clean(body.fulfillment, 30);

    if (name.length < 2 || contact.length < 3) {
      return NextResponse.json({ error: "Проверьте имя и контакт." }, { status: 400 });
    }

    if (body.consent !== true) {
      return NextResponse.json({ error: "Нужно согласие на обработку данных для оформления заказа." }, { status: 400 });
    }

    if (!["Самовывоз", "Доставка"].includes(fulfillment)) {
      return NextResponse.json({ error: "Выберите способ получения." }, { status: 400 });
    }

    if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > products.length) {
      return NextResponse.json({ error: "Добавьте хотя бы одну плитку." }, { status: 400 });
    }

    const items: { product: (typeof products)[number]; quantity: number }[] = [];
    const seen = new Set<string>();
    for (const item of body.items) {
      if (!item || typeof item !== "object") {
        return NextResponse.json({ error: "Проверьте товары и количество." }, { status: 400 });
      }
      const product = products.find((candidate) => candidate.id === item.id && candidate.available);
      const quantity = item.quantity;
      if (!product || typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1 || quantity > 20 || seen.has(item.id)) {
        return NextResponse.json({ error: "Проверьте товары и количество." }, { status: 400 });
      }
      seen.add(item.id);
      items.push({ product, quantity });
    }

    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

    if (count > 50) {
      return NextResponse.json({ error: "Для большого заказа свяжитесь с нами напрямую." }, { status: 400 });
    }

    const itemLines = items
      .map(({ product, quantity }) => `${escapeHtml(product.name)} × ${quantity}`)
      .join("\n");

    const message = [
      "🍫 <b>Новый заказ</b>",
      "",
      `<b>Имя:</b> ${escapeHtml(name)}`,
      `<b>Контакт:</b> ${escapeHtml(contact)}`,
      "",
      "<b>Заказ:</b>",
      itemLines,
      "",
      "<b>Итого:</b>",
      `${count} ${count === 1 ? "плитка" : "плиток"}`,
      `€${total.toFixed(2)}`,
      "",
      `<b>Получение:</b> ${escapeHtml(fulfillment || "Не указано")}`,
      "",
      `<b>Комментарий:</b> ${escapeHtml(comment || "—")}`,
      "",
      `<b>Дата:</b> ${escapeHtml(new Intl.DateTimeFormat("ru-RU", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Europe/Tallinn",
      }).format(new Date()))}`,
    ].join("\n");

    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });

    if (!telegramResponse.ok) {
      console.error("Telegram delivery failed with status", telegramResponse.status);
      return NextResponse.json({ error: "Не удалось отправить заказ. Попробуйте ещё раз чуть позже." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    // Never log the fetch error: it can contain the bot token in the request URL.
    console.error("Order delivery failed.");
    return NextResponse.json({ error: "Не удалось подтвердить отправку. Попробуйте позже." }, { status: 502 });
  }
}
