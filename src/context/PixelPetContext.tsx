"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useSyncExternalStore } from "react";
import { PetContextType, PetState } from "@/types/pet";

const PixelPetContext = createContext<PetContextType | undefined>(undefined);

const PET_VISIBLE_STORAGE_KEY = "hanif_pet_visible";

const EASTER_EGG_MESSAGES = [
  "Hi! I'm Pixel Hanif.",
  "Ready to explore the journey?",
  "Hey! 😭",
  "You're still clicking me?",
  "I have projects you can look at, you know.",
  "Okay, back to coding! 🚀",
];

function subscribePetVisibility(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("hanif_pet_visibility_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("hanif_pet_visibility_change", callback);
  };
}

function getPetVisibilitySnapshot(): boolean {
  try {
    const saved = localStorage.getItem(PET_VISIBLE_STORAGE_KEY);
    return saved !== null ? saved === "true" : true;
  } catch {
    return true;
  }
}

function getServerPetVisibilitySnapshot(): boolean {
  return true;
}

export function PixelPetProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PetState>("idle");
  const isVisible = useSyncExternalStore(
    subscribePetVisibility,
    getPetVisibilitySnapshot,
    getServerPetVisibilitySnapshot
  );
  const [clickCount, setClickCount] = useState<number>(0);
  const [dialogue, setDialogue] = useState<string | null>(null);

  const toggleVisibility = useCallback(() => {
    const current = getPetVisibilitySnapshot();
    const next = !current;
    try {
      localStorage.setItem(PET_VISIBLE_STORAGE_KEY, String(next));
      window.dispatchEvent(new Event("hanif_pet_visibility_change"));
    } catch {
      // ignore
    }
  }, []);

  const triggerClick = useCallback(() => {
    setClickCount((prev) => {
      const next = prev + 1;
      const messageIndex = (next - 1) % EASTER_EGG_MESSAGES.length;
      setDialogue(EASTER_EGG_MESSAGES[messageIndex]);
      return next;
    });
  }, []);

  const clearDialogue = useCallback(() => {
    setDialogue(null);
  }, []);

  // Automatically clear dialogue after 4 seconds
  useEffect(() => {
    if (!dialogue) return;
    const timer = setTimeout(() => {
      setDialogue(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [dialogue]);

  return (
    <PixelPetContext.Provider
      value={{
        state,
        setState,
        isVisible,
        toggleVisibility,
        clickCount,
        triggerClick,
        dialogue,
        clearDialogue,
        setDialogue,
      }}
    >
      {children}
    </PixelPetContext.Provider>
  );
}

export function usePixelPet(): PetContextType {
  const context = useContext(PixelPetContext);
  if (!context) {
    throw new Error("usePixelPet must be used within a PixelPetProvider");
  }
  return context;
}
