import Image from "next/image";

const steps = [
  ["01", "Ингредиенты", "/images/process-3.jpg", "Фисташки и декор рядом с шоколадом"],
  ["02", "Изготовление", "/images/process-1.jpg", "Шоколад ручной работы в форме"],
  ["03", "Заливка формы", "/images/process-2.jpg", "Плитка шоколада с малиной в форме"],
  ["04", "Декор", "/images/process-1.jpg", "Декор шоколада малиной и фисташкой"],
  ["05", "Упаковка", "/images/gift-box.jpg", "Готовые плитки шоколада в подарочных коробках"],
];

export function ProcessSection() {
  return (
    <section id="process" className="section shell">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">THE PROCESS</p>
          <h2 className="section-title mt-4">Made in small batches</h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-cocoa/62">Пять коротких этапов — от ингредиентов до упаковки.</p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map(([number, title, image, alt], index) => (
          <article key={`${number}-${title}`} className={index === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.35rem] bg-sand">
              <Image src={image} alt={alt} fill sizes="(max-width: 1024px) 50vw, 20vw" className="object-cover" />
            </div>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-xs tracking-[0.12em] text-cocoa/45">{number}</span>
              <h3 className="text-sm font-medium">{title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
