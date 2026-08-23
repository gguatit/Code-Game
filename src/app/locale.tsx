import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import ko, { type Dict } from "@/lib/i18n/ko";
import en from "@/lib/i18n/en";
import ja from "@/lib/i18n/ja";

export const LOCALES = ["ko", "en", "ja"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
};

const DICTS: Record<Locale, Dict> = { ko, en, ja };
const TITLES: Record<Locale, string> = {
  ko: DICTS.ko["doc.title"],
  en: DICTS.en["doc.title"],
  ja: DICTS.ja["doc.title"],
};

function detect(): Locale {
  const saved = localStorage.getItem("locale");
  if (saved && LOCALES.includes(saved as Locale)) return saved as Locale;
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("ko")) return "ko";
  if (lang.startsWith("ja")) return "ja";
  return "en";
}

interface LocaleCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: keyof Dict, params?: Record<string, string | number>) => string;
}

const Ctx = createContext<LocaleCtx | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detect);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = TITLES[locale];
  }, [locale]);

  const value = useMemo<LocaleCtx>(
    () => ({
      locale,
      setLocale: (l) => {
        setLocaleState(l);
        localStorage.setItem("locale", l);
      },
      t: (key, params) => {
        let s: string = DICTS[locale][key] ?? ko[key];
        if (params) for (const [k, v] of Object.entries(params)) s = s.replaceAll(`{${k}}`, String(v));
        return s;
      },
    }),
    [locale]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useT() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useT must be used within LocaleProvider");
  return ctx;
}
