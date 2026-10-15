"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { usePixelPet } from "@/hooks/usePixelPet";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { PetSpeechBubble } from "./PetSpeechBubble";
import { useLocalize } from "@/i18n/useTranslations";

export function PixelHanifPet() {
  const localize = useLocalize();
  const { state, isVisible, clickCount, triggerClick, dialogue, clearDialogue } = usePixelPet();
  const { mode } = usePortfolioMode();
  const pathname = usePathname();
  const [dock, setDock] = useState<HTMLElement | null>(null);

  // Reposition this single companion; its existing context remains the state source.
  useEffect(() => {
    const hero = document.getElementById("hero");
    const anchor = document.getElementById("hero-companion-anchor");
    if (!hero || !anchor) {
      const frame = requestAnimationFrame(() => setDock(null));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => {
      setDock(entry.isIntersecting && entry.intersectionRatio >= .25 ? anchor : null);
    }, { threshold: .25 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname, mode]);

  if (!isVisible || mode === "recruiter") return null;

  const companion = localize(<aside aria-label="Pixel Hanif Companion"
    className={`world-companion${dock ? " world-companion--docked" : ""}`}>
    {dialogue && <PetSpeechBubble message={dialogue} onDismiss={clearDialogue} className="world-companion-dialogue" />}
    <button type="button" className="world-companion-button" onClick={triggerClick}
      aria-label={`Pixel Hanif companion, current action: ${state}. Click for dialogue.`}
      title={`Talk to Pixel Hanif (${state}, ${clickCount} clicks)`}>
      <Image src={`/pet/optimized/${state}.webp`} alt="" width={96} height={144} unoptimized
        aria-hidden="true" loading={state === "idle" || state === "wave" ? "eager" : "lazy"} />
      <span className="world-companion-hint" aria-hidden="true">Talk to Hanif</span>
    </button>
  </aside>);
  return dock ? createPortal(companion, dock) : companion;
}
