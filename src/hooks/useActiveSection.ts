"use client";

import { useEffect, useState, useRef } from "react";
import { SECTION_PET_MAP } from "@/lib/constants";
import { usePixelPet } from "@/hooks/usePixelPet";
import { PetState } from "@/types/pet";

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || "hero");
  const currentActiveRef = useRef<string>(sectionIds[0] || "hero");
  const { setState } = usePixelPet();

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }
        });

        if (visibleSections.size === 0) return;

        // Determine dominant section based on highest intersection ratio
        let bestId = "";
        let bestRatio = -1;
        visibleSections.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        // Only trigger updates when the active section ID actually changes
        if (bestId && bestId !== currentActiveRef.current) {
          currentActiveRef.current = bestId;
          setActiveSection(bestId);
          if (bestId in SECTION_PET_MAP) {
            const targetState = SECTION_PET_MAP[bestId as keyof typeof SECTION_PET_MAP] as PetState;
            setState(targetState);
          }
        }
      },
      {
        rootMargin: "-20% 0px -35% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      visibleSections.clear();
      observer.disconnect();
    };
  }, [sectionIds, setState]);

  return activeSection;
}
