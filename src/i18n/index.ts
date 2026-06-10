import { locale as es } from "./locale.es";
import { locale as en } from "./locale.en";

export const languages = {
  en: "English",
  es: "Español",
};

export const defaultLang = "en";


export const locales = {
  en: en,
  es: es,
} as const;

export type LocaleType = keyof typeof locales;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in (locales as typeof locales)) return lang as keyof typeof locales;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof locales) {
  // return function t<T extends keyof typeof ui[typeof defaultLang]>(key: T) {
  return function t<T extends string>(key: T) {
    const nestedKeys = key.split(".");
    let value: any = locales[lang];

    for (const nestedKey of nestedKeys) {
      value = value[nestedKey] as string;
      if (!value) {
        let fallback: any = locales[defaultLang];
        for (const k of nestedKeys) {
          fallback = fallback?.[k];
        }
        value = fallback;
        break;
      }
    }

    return value;
  };
}
