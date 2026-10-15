"use client";

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { DEFAULT_LOCALE, isLocale, LOCALE_STORAGE_KEY, type Locale } from "./config";

type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void };
const LocaleContext = createContext<LocaleContextValue | null>(null);
let memoryLocale: Locale = DEFAULT_LOCALE;
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("hanif_locale_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("hanif_locale_change", callback);
  };
}
function snapshot(): Locale {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(stored) ? stored : memoryLocale;
  } catch { return memoryLocale; }
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, snapshot, () => DEFAULT_LOCALE);
  const pendingScroll = useRef<{ x: number; y: number } | null>(null);
  const setLocale = useCallback((next: Locale) => {
    if (!isLocale(next)) return;
    if (snapshot() === next) return;
    pendingScroll.current = { x: window.scrollX, y: window.scrollY };
    memoryLocale = next;
    try { localStorage.setItem(LOCALE_STORAGE_KEY, next); } catch { /* Session-only selection still works. */ }
    window.dispatchEvent(new Event("hanif_locale_change"));
  }, []);
  useLayoutEffect(() => {
    if (!pendingScroll.current) return;
    const { x, y } = pendingScroll.current;
    pendingScroll.current = null;
    window.scrollTo({ left: x, top: y, behavior: "instant" });
    const frame = requestAnimationFrame(() => window.scrollTo({ left: x, top: y, behavior: "instant" }));
    return () => cancelAnimationFrame(frame);
  }, [locale]);
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
  }, [locale]);
  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used within LocaleProvider");
  return value;
}
