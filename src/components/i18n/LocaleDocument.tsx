"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "@/i18n/LocaleProvider";
import { translate } from "@/i18n/translate";
import { FEATURED_PROJECTS } from "@/data/projects";
import { PROFILE_DATA } from "@/data/profile";
import { SITE_CONFIG } from "@/lib/constants";

/** Existing URLs remain static English prerenders; client locale keeps document semantics aligned. */
export function LocaleDocument() {
  const { locale } = useLocale();
  const pathname = usePathname();
  useEffect(() => {
    const project = FEATURED_PROJECTS.find(item => pathname === `/projects/${item.slug}`);
    const baseTitle = pathname === "/projects" ? "Projects & Engineering Archive — M. Hanif Al Faiz"
      : pathname === "/journey" ? "Journey & Academic Milestones — M. Hanif Al Faiz" : SITE_CONFIG.title;
    document.title = project ? `${project.title} | ${PROFILE_DATA.name}` : translate(baseTitle, locale);
    const description = project ? translate(project.shortDescription, locale) : locale === "id"
      ? `Portofolio ${PROFILE_DATA.name}, mahasiswa Informatika yang mengeksplorasi kecerdasan buatan, teknologi Smart City, rekayasa perangkat lunak, riset, kompetisi, dan pengembangan rintisan.`
      : SITE_CONFIG.description;
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      document.querySelector(selector)?.setAttribute("content", description);
    }
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
      document.querySelector(selector)?.setAttribute("content", document.title);
    }
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", locale === "id" ? "id_ID" : "en_US");
  }, [locale, pathname]);
  return <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
    {translate("Portfolio language: English.", locale)}
  </p>;
}
