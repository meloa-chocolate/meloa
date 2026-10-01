import Image from "next/image";

export function Hero() {
  return (
    <section id="top" className="shell grid min-h-[calc(100svh-72px)] items-center gap-10 py-10 lg:grid-cols-[0.86fr_1.14fr] lg:py-16">
      <div className="order-2 max-w-2xl lg:order-1">
        <p className="eyebrow">HANDMADE CHOCOLATE · TALLINN</p>
        <h1 className="display mt-5 max-w-[10ch]">Шоколад, который хочется подарить</h1>
        <p className="mt-6 max-w-xl text-balance text-base leading-7 text-cocoa/72 sm:text-lg">
          Авторский шоколад ручной работы из качественных ингредиентов. Небольшие партии,
          необычные сочетания и упаковка, которая уже выглядит как подарок.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#chocolate" className="button button-dark min-h-12 focus-ring">
            Выбрать шоколад
          </a>
          <a href="#process" className="button button-ghost min-h-12 focus-ring">
            Как мы его делаем
          </a>
        </div>
        <p className="mt-7 text-sm tracking-[0.08em] text-cocoa/55">Handmade · Small batch · Gift ready</p>
      </div>

      <div className="order-1 lg:order-2">
        <div className="image-frame relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand shadow-soft sm:aspect-[5/6] lg:aspect-[4/5]">
          <Image
            src="/images/hero.jpg"
            alt="Шоколад ручной работы в подарочной коробке среди цветов"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 56vw"
            className="object-cover object-center transition-transform duration-700 motion-safe:hover:scale-[1.02]"
          />
          <div className="absolute inset-x-5 bottom-5 rounded-[1.35rem] bg-cream/92 p-4 backdrop-blur-sm sm:inset-x-auto sm:left-5 sm:max-w-xs">
            <p className="text-sm font-medium">Готово к подарку</p>
            <p className="mt-1 text-sm leading-5 text-cocoa/65">Аккуратная упаковка входит в каждую плитку.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
