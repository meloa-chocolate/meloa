"use client";

import { FormEvent, useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { products } from "@/data/products";

const API_URL = process.env.NEXT_PUBLIC_ORDER_API_URL || "/api/order";

const copy = {
  et: {
    eyebrow: "YOU CHOOSE NEXT",
    title: "Milline maitse peaks tulema järgmisena?",
    body: "Hääletus aitab meil mõista, millist maitset oodatakse kõige rohkem. Hääle saatmisel ei küsita sinu isikuandmeid.",
    vote: "Saada hääl",
    sending: "Saadame…",
    success: "Hääl saadetud. Aitäh.",
    error: "Häält ei õnnestunud saata. Proovi uuesti.",
    choose: "Vali maitse",
    waitEyebrow: "WAITLIST",
    waitTitle: "Anna teada, kui see maitse ilmub",
    waitBody: "Jäta Telegrami kasutajanimi või telefon. Kasutame kontakti ainult selle maitse saadavusest teatamiseks.",
    contact: "Telegram / telefon",
    consent: "Nõustun, et Meloa kasutab seda kontakti valitud maitse saadavusest teatamiseks.",
    join: "Liitu waitlistiga",
    joined: "Lisatud waitlisti.",
  },
  ru: {
    eyebrow: "YOU CHOOSE NEXT",
    title: "Какой вкус выпустить следующим?",
    body: "Опрос помогает понять, какой вкус ждут сильнее всего. Для отправки голоса личные данные не нужны.",
    vote: "Отправить голос",
    sending: "Отправляем…",
    success: "Голос отправлен. Спасибо.",
    error: "Не удалось отправить голос. Попробуйте ещё раз.",
    choose: "Выберите вкус",
    waitEyebrow: "WAITLIST",
    waitTitle: "Узнать, когда вкус появится",
    waitBody: "Оставьте Telegram или телефон. Контакт используется только для уведомления о выбранном вкусе.",
    contact: "Telegram / телефон",
    consent: "Я согласен(а), чтобы Meloa использовала этот контакт для уведомления о доступности выбранного вкуса.",
    join: "Добавить в waitlist",
    joined: "Добавлено в waitlist.",
  },
  en: {
    eyebrow: "YOU CHOOSE NEXT",
    title: "Which flavour should come next?",
    body: "Your vote helps us see which flavour people want most. Voting does not require any personal data.",
    vote: "Send vote",
    sending: "Sending…",
    success: "Vote sent. Thank you.",
    error: "We could not send your vote. Please try again.",
    choose: "Choose a flavour",
    waitEyebrow: "WAITLIST",
    waitTitle: "Know when this flavour drops",
    waitBody: "Leave a Telegram handle or phone number. We will use it only to notify you about the selected flavour.",
    contact: "Telegram / phone",
    consent: "I agree that Meloa may use this contact to notify me when the selected flavour becomes available.",
    join: "Join waitlist",
    joined: "Added to the waitlist.",
  },
} as const;

export function FlavorVoteSection() {
  const { language } = useLanguage();
  const t = copy[language];
  const options = useMemo(() => products.filter((product) => !product.available), []);
  const [flavor, setFlavor] = useState(options[0]?.id ?? "");
  const [voteState, setVoteState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [voteError, setVoteError] = useState("");
  const [waitState, setWaitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [waitError, setWaitError] = useState("");

  const selected = options.find((product) => product.id === flavor);

  const submitVote = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!flavor || voteState === "loading") return;
    setVoteState("loading");
    setVoteError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "vote", flavor, language }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || t.error);
      window.localStorage.setItem("meloa-flavor-vote", flavor);
      setVoteState("success");
    } catch (error) {
      setVoteState("error");
      setVoteError(error instanceof Error ? error.message : t.error);
    }
  };

  const submitWaitlist = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!flavor || waitState === "loading") return;
    const form = new FormData(event.currentTarget);
    const contact = String(form.get("contact") || "").trim();
    const consent = form.get("consent") === "on";
    if (contact.length < 3 || !consent) {
      setWaitState("error");
      setWaitError(language === "ru" ? "Укажите контакт и согласие." : language === "et" ? "Lisa kontakt ja nõusolek." : "Add a contact and consent.");
      return;
    }

    setWaitState("loading");
    setWaitError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "waitlist", flavor, contact, consent: true, language }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || t.error);
      event.currentTarget.reset();
      setWaitState("success");
    } catch (error) {
      setWaitState("error");
      setWaitError(error instanceof Error ? error.message : t.error);
    }
  };

  return (
    <section id="vote" className="section bg-pistachio/18 scroll-mt-24">
      <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="section-title mt-4 max-w-[12ch]">{t.title}</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-cocoa/65">{t.body}</p>

          <form onSubmit={submitVote} className="mt-8 rounded-[2rem] border border-cocoa/12 bg-cream p-5 shadow-soft sm:p-7">
            <fieldset>
              <legend className="text-sm font-semibold">{t.choose}</legend>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {options.map((option) => {
                  const active = flavor === option.id;
                  return (
                    <label key={option.id} className={`cursor-pointer rounded-[1.2rem] border p-4 transition ${active ? "border-cocoa bg-cocoa text-cream" : "border-cocoa/12 hover:border-cocoa/30"}`}>
                      <input type="radio" name="flavor" value={option.id} checked={active} onChange={() => { setFlavor(option.id); setVoteState("idle"); setWaitState("idle"); }} className="sr-only" />
                      <span className="font-serif text-2xl">{option.name}</span>
                      <span className={`mt-1 block text-xs ${active ? "text-cream/65" : "text-cocoa/48"}`}>{option.subtitle}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {voteState === "success" && <p className="mt-4 text-sm text-cocoa/65" role="status">{t.success}</p>}
            {voteState === "error" && <p className="mt-4 text-sm text-berry" role="alert">{voteError || t.error}</p>}
            <button type="submit" disabled={!flavor || voteState === "loading"} className="button button-dark mt-5 min-h-12 w-full focus-ring disabled:opacity-50">
              {voteState === "loading" ? t.sending : t.vote}
            </button>
          </form>
        </div>

        <div className="self-end rounded-[2rem] bg-burgundy p-6 text-cream sm:p-8">
          <p className="eyebrow !text-cream/55">{t.waitEyebrow}</p>
          <h3 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">{t.waitTitle}</h3>
          <p className="mt-4 max-w-lg text-sm leading-6 text-cream/68">{t.waitBody}</p>
          {selected && <p className="mt-5 inline-flex rounded-full border border-cream/20 px-3 py-1.5 text-xs uppercase tracking-[.08em] text-cream/75">{selected.name}</p>}

          <form onSubmit={submitWaitlist} className="mt-7">
            <label className="block text-sm">
              <span className="text-cream/75">{t.contact}</span>
              <input name="contact" required minLength={3} maxLength={100} placeholder="@name / +372…" className="mt-2 min-h-12 w-full rounded-xl border border-cream/20 bg-cream/10 px-4 text-cream placeholder:text-cream/35 focus:outline-none focus:ring-2 focus:ring-cream/40" />
            </label>
            <label className="mt-4 flex gap-3 text-xs leading-5 text-cream/60">
              <input name="consent" type="checkbox" required className="mt-0.5 h-5 w-5 accent-cream" />
              <span>{t.consent}</span>
            </label>
            {waitState === "success" && <p className="mt-4 text-sm text-cream/75" role="status">{t.joined}</p>}
            {waitState === "error" && <p className="mt-4 text-sm text-cream" role="alert">{waitError}</p>}
            <button type="submit" disabled={!flavor || waitState === "loading"} className="mt-5 min-h-12 w-full rounded-full bg-cream px-5 text-sm font-semibold text-cocoa transition hover:bg-cream/90 disabled:opacity-50">
              {waitState === "loading" ? t.sending : t.join}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
