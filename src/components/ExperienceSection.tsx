"use client";

import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { products } from "@/data/products";
import { assetPath } from "@/lib/asset";

const copy = {
  et: {
    eyebrow: "CURRENT DROP",
    title: "Üks maitse praegu. Rohkem on teel.",
    body: "Meloa töötab väikeste partiidena. Praegu on tellitav Raspberry Pistachio; järgmised maitsed lisame alles siis, kui retsept ja tooteinfo on valmis.",
    available: "Saadaval praegu",
    giftEyebrow: "BUILD A GIFT",
    giftTitle: "Vali kingituse suurus",
    giftBody: "Sama signature-tahvel, erinev kogus. Allahindlust me ei eelda — valid lihtsalt, mitu tahvlit soovid kinkida.",
    bars: ["1 tahvel", "2 tahvlit", "3 tahvlit"],
    selected: "Valitud",
    insideEyebrow: "INSIDE THE BOX",
    insideTitle: "Mis kingitusega kaasa tuleb",
    inside: [
      ["01", "Šokolaad", "Käsitsi viimistletud tahvel väikese partii tootmisest."],
      ["02", "Pakend", "Karbi kujundus on osa kingitusest — eraldi pakkimist pole vaja."],
      ["03", "Sõnum", "Tellimusele saad lisada lühikese kingisoovi või teksti."],
    ],
    unboxEyebrow: "UNBOXING",
    unboxTitle: "Kingitus kolmes hetkes",
    unbox: ["Suletud kingitus", "Avamise hetk", "Šokolaad lähedalt"],
    tastingEyebrow: "NEXT FORMAT",
    tastingTitle: "Tasting box",
    tastingBody: "Kolme väiksema maitsega proovikarp on järgmine formaat, mida tahame arendada. Praegu on see arenduses, mitte müügis.",
    tastingState: "Arenduses",
  },
  ru: {
    eyebrow: "CURRENT DROP",
    title: "Один вкус сейчас. Остальные — по мере готовности.",
    body: "Meloa работает небольшими партиями. Сейчас доступен Raspberry Pistachio; следующие вкусы появятся только после финальной рецептуры и продуктовой информации.",
    available: "Доступно сейчас",
    giftEyebrow: "BUILD A GIFT",
    giftTitle: "Выберите размер подарка",
    giftBody: "Та же signature-плитка, разное количество. Без искусственной скидки: просто выберите, сколько плиток хотите подарить.",
    bars: ["1 плитка", "2 плитки", "3 плитки"],
    selected: "Выбрано",
    insideEyebrow: "INSIDE THE BOX",
    insideTitle: "Что входит в подарок",
    inside: [
      ["01", "Шоколад", "Плитка ручной работы из небольшой партии."],
      ["02", "Упаковка", "Коробка — часть подарка, дополнительное оформление не требуется."],
      ["03", "Записка", "К заказу можно добавить короткое пожелание или текст."],
    ],
    unboxEyebrow: "UNBOXING",
    unboxTitle: "Подарок в трёх моментах",
    unbox: ["Закрытый подарок", "Момент открытия", "Шоколад крупным планом"],
    tastingEyebrow: "NEXT FORMAT",
    tastingTitle: "Tasting box",
    tastingBody: "Набор из трёх небольших вкусов — следующий формат, который мы хотим разработать. Сейчас это концепт, а не товар в продаже.",
    tastingState: "В разработке",
  },
  en: {
    eyebrow: "CURRENT DROP",
    title: "One flavour now. More when they are ready.",
    body: "Meloa works in small batches. Raspberry Pistachio is available now; new flavours only go live once the recipe and product information are final.",
    available: "Available now",
    giftEyebrow: "BUILD A GIFT",
    giftTitle: "Choose the gift size",
    giftBody: "The same signature bar, in a different quantity. No artificial bundle discount — simply choose how many bars you want to give.",
    bars: ["1 bar", "2 bars", "3 bars"],
    selected: "Selected",
    insideEyebrow: "INSIDE THE BOX",
    insideTitle: "What comes with the gift",
    inside: [
      ["01", "Chocolate", "A hand-finished bar made in a small batch."],
      ["02", "Packaging", "The box is part of the gift, so no extra wrapping is needed."],
      ["03", "Note", "You can add a short gift message to the order."],
    ],
    unboxEyebrow: "UNBOXING",
    unboxTitle: "The gift in three moments",
    unbox: ["Closed gift", "The opening moment", "Chocolate up close"],
    tastingEyebrow: "NEXT FORMAT",
    tastingTitle: "Tasting box",
    tastingBody: "A three-flavour tasting box is the next format we want to develop. It is a concept in development, not a product for sale yet.",
    tastingState: "In development",
  },
} as const;

const unboxingImages = ["/images/gift-box.webp", "/images/hero.webp", "/images/raspberry-pistachio.webp"];

export function ExperienceSection() {
  const { language } = useLanguage();
  const { quantities, setQuantity } = useCart();
  const t = copy[language];
  const signature = products.find((product) => product.id === "raspberry-pistachio")!;
  const quantity = quantities[signature.id] ?? 0;

  return (
    <>
      <section className="section bg-sand/45">
        <div className="shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h2 className="section-title mt-4 max-w-[11ch]">{t.title}</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-cocoa/65">{t.body}</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-cocoa/12 bg-cream px-4 py-2 text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-pistachio" />
              {t.available} · {signature.name} · €{signature.price}
            </div>
          </div>

          <div className="rounded-[2rem] border border-cocoa/12 bg-cream p-6 shadow-soft sm:p-8">
            <p className="eyebrow">{t.giftEyebrow}</p>
            <h3 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">{t.giftTitle}</h3>
            <p className="mt-4 max-w-xl text-sm leading-6 text-cocoa/60">{t.giftBody}</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[1, 2, 3].map((count, index) => {
                const active = quantity === count;
                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuantity(signature.id, count)}
                    className={`focus-ring min-h-24 rounded-[1.25rem] border p-4 text-left transition ${active ? "border-cocoa bg-cocoa text-cream" : "border-cocoa/14 bg-sand/30 hover:border-cocoa/30"}`}
                  >
                    <span className="block font-serif text-2xl">{t.bars[index]}</span>
                    <span className={`mt-2 block text-xs ${active ? "text-cream/65" : "text-cocoa/48"}`}>€{(signature.price * count).toFixed(2)}{active ? ` · ${t.selected}` : ""}</span>
                  </button>
                );
              })}
            </div>
            <a href="#order" className="button button-dark mt-5 min-h-12 w-full focus-ring">{quantity > 0 ? `${t.selected} · ${quantity} · €${(signature.price * quantity).toFixed(2)}` : t.giftTitle}</a>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">{t.insideEyebrow}</p>
            <h2 className="section-title mt-4 max-w-[10ch]">{t.insideTitle}</h2>
          </div>
          <div className="divide-y divide-cocoa/12 border-y border-cocoa/12">
            {t.inside.map(([number, title, text]) => (
              <div key={number} className="grid grid-cols-[3rem_1fr] gap-4 py-6 sm:grid-cols-[4rem_1fr]">
                <span className="font-serif text-2xl text-cocoa/40">{number}</span>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-1 max-w-lg text-sm leading-6 text-cocoa/60">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <p className="eyebrow">{t.unboxEyebrow}</p>
          <h2 className="section-title mt-4">{t.unboxTitle}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {unboxingImages.map((image, index) => (
              <figure key={image}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-sand">
                  <Image src={assetPath(image)} alt={t.unbox[index]} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                </div>
                <figcaption className="mt-3 border-t border-cocoa/10 pt-3 text-sm text-cocoa/58">{t.unbox[index]}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-[2rem] bg-burgundy p-7 text-cream sm:p-10 lg:flex lg:items-end lg:justify-between lg:gap-10">
          <div>
            <p className="eyebrow !text-cream/55">{t.tastingEyebrow}</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">{t.tastingTitle}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-cream/68">{t.tastingBody}</p>
          </div>
          <span className="mt-6 inline-flex rounded-full border border-cream/20 px-4 py-2 text-sm text-cream/75 lg:mt-0">{t.tastingState}</span>
        </div>
      </section>
    </>
  );
}
