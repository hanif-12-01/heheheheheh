"use client";
import { useLocale } from "@/i18n/LocaleProvider";
import { useTranslations } from "@/i18n/useTranslations";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const { t } = useTranslations();
  return <div className="language-switcher" role="group" aria-label={t("Portfolio language")}>
    <button type="button" lang="id" aria-label={t("Switch to Indonesian")} aria-pressed={locale === "id"} onClick={() => setLocale("id")}>ID</button>
    <span aria-hidden="true">|</span>
    <button type="button" lang="en" aria-label={t("Switch to English")} aria-pressed={locale === "en"} onClick={() => setLocale("en")}>EN</button>
  </div>;
}
