"use client";

import { createContext, useContext, useCallback, type ReactNode } from "react";
import { useUser } from "@/components/providers/UserProvider";
import translations, { type TranslationKey } from "@/lib/i18n";

interface LanguageContextType {
  t: Record<TranslationKey, string>;
  lang: "id" | "en";
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation must be used within LanguageProvider");
  return ctx;
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const { language } = useUser();

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ t, lang: language }}>
      {children}
    </LanguageContext.Provider>
  );
}
