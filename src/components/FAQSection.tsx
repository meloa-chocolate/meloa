"use client";

import { useLanguage } from "@/components/LanguageProvider";

export function FAQSection() {
  const { t } = useLanguage();

  return (
    <section className="section shell">
      <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
        <div>
          <p className="eyebrow">{t.faq.eyebrow}</p>
          <h2 className="section-title mt-4">{t.faq.title}</h2>
        </div>
        <div className="divide-y divide-cocoa/12 border-y border-cocoa/12">
          {t.faq.items.map(([question, answer]) => (
            <details key={question} className="group py-5">
              <summary className="focus-ring flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 rounded-lg text-base font-semibold">
                <span>{question}</span>
                <span className="text-xl font-normal text-cocoa/45 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-2xl pb-2 pt-3 text-sm leading-6 text-cocoa/62">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
