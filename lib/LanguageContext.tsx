"use client";

import { createContext, useContext, useState, useCallback } from "react";
import translations from "./i18n";

type Locale = "id" | "en";

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: "id",
  setLocale: () => {},
  t: (key) => key,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("id");

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const lang = translations[locale] as Record<string, string>;
      const fallback = translations.en as Record<string, string>;
      let text = lang[key] || fallback[key] || key;
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, String(v));
        });
      }
      return text;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
