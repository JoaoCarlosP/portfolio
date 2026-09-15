export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const localeNames: Record<Locale, string> = {
  pt: "Português",
  en: "English",
};

/** The other locale, for the header toggle. */
export function otherLocale(locale: Locale): Locale {
  return locale === "pt" ? "en" : "pt";
}
