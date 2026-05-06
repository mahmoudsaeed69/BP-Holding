import { createContext, useContext, useEffect, useCallback, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface LanguageContextType {
  language: string;
  direction: "ltr" | "rtl";
  toggleLanguage: () => void;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const language = i18n.language || "en";
  const direction: "ltr" | "rtl" = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const root = window.document.documentElement;
    root.dir = direction;
    root.lang = language;
  }, [language, direction]);

  const toggleLanguage = useCallback(() => {
    const newLang = language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  }, [language, i18n]);

  const setLanguage = useCallback(
    (lang: string) => {
      i18n.changeLanguage(lang);
    },
    [i18n]
  );

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
