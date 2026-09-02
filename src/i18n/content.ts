import es from "../data/content.es.json";
import en from "../data/content.en.json";

export const languages = {
  es: "Español",
  en: "English",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "es";

const dictionary = { es, en };

export function getContent(lang: Lang) {
  return dictionary[lang] ?? dictionary[defaultLang];
}

export const langPaths: Record<Lang, string> = {
  es: "/",
  en: "/en/",
};
