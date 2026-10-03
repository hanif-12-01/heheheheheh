"use client";

import { useEffect, useState } from "react";
import { SECTION_PET_MAP } from "@/lib/constants";
import { usePixelPet } from "@/hooks/usePixelPet";
import { PetState } from "@/types/pet";

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || "hero");
  const { setState } = usePixelPet();

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
            if (id in SECTION_PET_MAP) {
              const targetState = SECTION_PET_MAP[id as keyof typeof SECTION_PET_MAP] as PetState;
              setState(targetState);
            }
          }
        });
      },
      {
        rootMargin: "-25% 0px -40% 0px",
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds, setState]);

  return activeSection;
}
