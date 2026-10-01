import Image from "next/image";

const benefits = [
  ["01", "Handmade", "Каждая партия делается вручную небольшим тиражом."],
  ["02", "Gift ready", "Красивая упаковка — не нужно дополнительно оформлять подарок."],
  ["03", "Quality ingredients", "Качественный шоколад, орехи, ягоды и тщательно подобранные сочетания."],
];

export function GiftSection() {
  return (
    <section id="gifts" className="section bg-pistachio/22">
      <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] sm:min-h-[620px]">
          <Image
            src="/images/gift-box.jpg"
            alt="Несколько плиток шоколада в подарочной упаковке"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div id="about" className="self-center">
          <p className="eyebrow">GIFT READY</p>
          <h2 className="section-title mt-4">Не просто шоколад</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-cocoa/68">
            Мы относимся к каждой плитке как к маленькому подарку: важны и вкус, и фактура,
            и момент, когда человек открывает упаковку.
          </p>
          <div className="mt-10 divide-y divide-cocoa/14 border-y border-cocoa/14">
            {benefits.map(([number, title, text]) => (
              <div key={number} className="grid grid-cols-[3rem_1fr] gap-4 py-6 sm:grid-cols-[4rem_1fr]">
                <span className="font-serif text-2xl text-cocoa/45">{number}</span>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-1 max-w-md text-sm leading-6 text-cocoa/64">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
