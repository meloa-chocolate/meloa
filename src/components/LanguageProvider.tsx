"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { copy, Language } from "@/lib/i18n";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (typeof copy)[Language];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("et");

  useEffect(() => {
    const saved = window.localStorage.getItem("meloa-language");
    if (saved === "et" || saved === "ru" || saved === "en") {
      setLanguageState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem("meloa-language", next);
  };

  const value = useMemo(() => ({ language, setLanguage, t: copy[language] }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
