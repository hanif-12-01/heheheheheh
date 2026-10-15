"use client";
import type { ReactNode } from "react";
import { useLocalize, useTranslations } from "./useTranslations";
/** A server page can keep metadata/SSG while localizing its native heading/action markup. */
export function Localize({ children }: { children: ReactNode }) {
  const localize = useLocalize();
  return <>{localize(children)}</>;
}

/** Explicit boundary for copy inside streamed server elements. */
export function LocaleText({ text }: { text: string }) {
  const { translate } = useTranslations();
  return <>{translate(text)}</>;
}
