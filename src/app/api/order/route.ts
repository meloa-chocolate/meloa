import { NextResponse } from "next/server";
import { products } from "@/data/products";

export const runtime = "nodejs";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://meloa-chocolate.github.io",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const json = (body: unknown, init?: ResponseInit) =>
  NextResponse.json(body, {
    ...init,
    headers: { ...CORS_HEADERS, ...(init?.headers ?? {}) },
  });

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

type OrderItem = {
  id: string;
  quantity: number;
};

type RequestBody = Record<string, unknown>;

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

const formatDate = () =>
  new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Tallinn",
  }).format(new Date());

async function sendTelegram(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { ok: false as const, status: 503, error: "Сервис сообщений ещё не настроен." };
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
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

    if (!response.ok) {
      console.error("Telegram delivery failed with status", response.status);
      return { ok: false as const, status: 502, error: "Не удалось отправить. Попробуйте чуть позже." };
    }

    return { ok: true as const };
  } catch {
    console.error("Telegram delivery failed.");
    return { ok: false as const, status: 502, error: "Не удалось подтвердить отправку. Попробуйте позже." };
  }
}

export async function POST(request: Request) {
  let parsed: unknown;
  try {
    parsed = await request.json();
  } catch {
    return json({ error: "Некорректные данные." }, { status: 400 });
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return json({ error: "Некорректные данные." }, { status: 400 });
  }

  const body = parsed as RequestBody;
  const type = clean(body.type, 20) || "order";

  if (type === "vote") {
    const flavorId = clean(body.flavor, 80);
    const flavor = products.find((product) => product.id === flavorId && !product.available);
    const language = clean(body.language, 5) || "—";

    if (!flavor) return json({ error: "Выберите вкус." }, { status: 400 });

    const result = await sendTelegram([
      "🗳️ <b>Голос за следующий вкус</b>",
      "",
      `<b>Вкус:</b> ${escapeHtml(flavor.name)}`,
      `<b>Язык сайта:</b> ${escapeHtml(language)}`,
      `<b>Дата:</b> ${escapeHtml(formatDate())}`,
    ].join("\n"));

    return result.ok ? json({ ok: true }) : json({ error: result.error }, { status: result.status });
  }

  if (type === "waitlist") {
    const flavorId = clean(body.flavor, 80);
    const flavor = products.find((product) => product.id === flavorId && !product.available);
    const contact = clean(body.contact, 100);
    const language = clean(body.language, 5) || "—";

    if (!flavor) return json({ error: "Выберите вкус." }, { status: 400 });
    if (contact.length < 3) return json({ error: "Укажите контакт." }, { status: 400 });
    if (body.consent !== true) return json({ error: "Нужно согласие на обработку контакта." }, { status: 400 });

    const result = await sendTelegram([
      "🔔 <b>Waitlist нового вкуса</b>",
      "",
      `<b>Вкус:</b> ${escapeHtml(flavor.name)}`,
      `<b>Контакт:</b> ${escapeHtml(contact)}`,
      `<b>Язык сайта:</b> ${escapeHtml(language)}`,
      `<b>Дата:</b> ${escapeHtml(formatDate())}`,
    ].join("\n"));

    return result.ok ? json({ ok: true }) : json({ error: result.error }, { status: result.status });
  }

  if (type !== "order") {
    return json({ error: "Неизвестный тип запроса." }, { status: 400 });
  }

  const name = clean(body.name, 80);
  const contact = clean(body.contact, 100);
  const comment = clean(body.comment, 500);
  const fulfillmentRaw = clean(body.fulfillment, 30);
  const fulfillmentMap: Record<string, string> = {
    Pickup: "Самовывоз",
    Delivery: "Доставка",
    Самовывоз: "Самовывоз",
    Доставка: "Доставка",
    pickup: "Самовывоз",
    delivery: "Доставка",
  };
  const fulfillment = fulfillmentMap[fulfillmentRaw] ?? "";

  if (name.length < 2 || contact.length < 3) {
    return json({ error: "Проверьте имя и контакт." }, { status: 400 });
  }

  if (body.consent !== true) {
    return json({ error: "Нужно согласие на обработку данных для оформления заказа." }, { status: 400 });
  }

  if (!fulfillment) {
    return json({ error: "Выберите способ получения." }, { status: 400 });
  }

  if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > products.length) {
    return json({ error: "Добавьте хотя бы одну плитку." }, { status: 400 });
  }

  const items: { product: (typeof products)[number]; quantity: number }[] = [];
  const seen = new Set<string>();

  for (const rawItem of body.items) {
    if (!rawItem || typeof rawItem !== "object" || Array.isArray(rawItem)) {
      return json({ error: "Проверьте товары и количество." }, { status: 400 });
    }

    const item = rawItem as Partial<OrderItem>;
    const id = clean(item.id, 80);
    const quantity = item.quantity;
    const product = products.find((candidate) => candidate.id === id && candidate.available);

    if (!product || typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1 || quantity > 20 || seen.has(id)) {
      return json({ error: "Проверьте товары и количество." }, { status: 400 });
    }

    seen.add(id);
    items.push({ product, quantity });
  }

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  if (count > 50) {
    return json({ error: "Для большого заказа свяжитесь с нами напрямую." }, { status: 400 });
  }

  const itemLines = items.map(({ product, quantity }) => `${escapeHtml(product.name)} × ${quantity}`).join("\n");
  const result = await sendTelegram([
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
    `<b>Получение:</b> ${escapeHtml(fulfillment)}`,
    `<b>Комментарий:</b> ${escapeHtml(comment || "—")}`,
    `<b>Дата:</b> ${escapeHtml(formatDate())}`,
  ].join("\n"));

  return result.ok ? json({ ok: true }) : json({ error: result.error }, { status: result.status });
}
