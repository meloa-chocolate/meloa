export function OccasionsSection() {
  return (
    <section className="section bg-burgundy text-cream">
      <div className="shell grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <div>
          <p className="eyebrow !text-cream/55">OCCASIONS</p>
          <h2 className="section-title mt-4 max-w-xl text-cream">Подарок без лишнего повода</h2>
        </div>
        <div>
          <p className="font-serif text-3xl leading-tight text-cream/95 sm:text-4xl">
            День рождения · Спасибо · В гости · Для любимого человека · Просто так
          </p>
          <p className="mt-6 max-w-xl text-sm leading-6 text-cream/60">
            Corporate gifts — coming soon. Мини-подарки для команд и клиентов появятся отдельным форматом.
          </p>
        </div>
      </div>
    </section>
  );
}
