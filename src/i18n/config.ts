export const LOCALES = ["en", "id"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "hanif_portfolio_locale";
export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "id";
}
