"use client";

import { Children, cloneElement, isValidElement, useCallback, type ReactElement, type ReactNode } from "react";
import { useLocale } from "./LocaleProvider";
import { translate, t } from "./translate";

const COPY_PROPS = ["alt", "aria-label", "aria-description", "title", "subtitle", "badge", "label", "placeholder",
  "recruiterTitle", "recruiterSubtitle", "recruiterBadge", "statusBadge"] as const;

/** Translate React presentation nodes, never DOM mutation or canonical data mutation. */
export function useLocalize() {
  const { locale } = useLocale();
  return useCallback(function localize(node: ReactNode): ReactNode {
    if (typeof node === "string") return translate(node, locale);
    // React's traversal combines stable explicit keys and assigns identities to
    // static siblings. Plain Array.map + cloning loses JSX dev validation.
    if (Array.isArray(node)) return Children.map(node, localize);
    if (!isValidElement(node)) return node;
    const element = node as ReactElement<Record<string, unknown>>;
    const props: Record<string, unknown> = {};
    for (const name of COPY_PROPS) {
      if (typeof element.props[name] === "string") props[name] = translate(element.props[name] as string, locale);
    }
    if ("children" in element.props) props.children = localize(element.props.children as ReactNode);
    return cloneElement(element, props);
  }, [locale]);
}

export function useTranslations() {
  const { locale } = useLocale();
  return { locale, t: (key: Parameters<typeof t>[0]) => t(key, locale), translate: (text: string) => translate(text, locale) };
}
