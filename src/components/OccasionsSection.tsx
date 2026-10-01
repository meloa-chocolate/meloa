const occasions = [
  ["День рождения", "Небольшой подарок, который выглядит продуманно."],
  ["Спасибо", "Тёплый способ сказать больше, чем одним сообщением."],
  ["Для любимого человека", "Без повода или к важной дате."],
  ["В гости", "То, что приятно поставить на стол и разделить."],
  ["Просто так", "Когда хочется сделать чей-то день немного лучше."],
  ["Corporate gifts", "Coming soon — мини-подарки для команд и клиентов."],
];

export function OccasionsSection() {
  return (
    <section className="section bg-burgundy text-cream">
      <div className="shell">
        <p className="eyebrow !text-cream/55">OCCASIONS</p>
        <h2 className="section-title mt-4 max-w-xl text-cream">Для маленьких и больших поводов</h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] bg-cream/15 sm:grid-cols-2 lg:grid-cols-3">
          {occasions.map(([title, text]) => (
            <article key={title} className="min-h-44 bg-burgundy p-6 sm:p-7">
              <h3 className="font-serif text-2xl">{title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-cream/65">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
