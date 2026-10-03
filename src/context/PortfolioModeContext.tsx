"use client";

import React, { createContext, useContext, useSyncExternalStore, useCallback, useEffect } from "react";
import { PortfolioMode, PortfolioModeContextType } from "@/types/mode";

const PortfolioModeContext = createContext<PortfolioModeContextType | undefined>(undefined);

const STORAGE_KEY = "hanif_portfolio_mode";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("hanif_mode_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("hanif_mode_change", callback);
  };
}

function getSnapshot(): PortfolioMode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as PortfolioMode | null;
    return saved === "recruiter" ? "recruiter" : "pixel";
  } catch {
    return "pixel";
  }
}

function getServerSnapshot(): PortfolioMode {
  return "pixel";
}

export function PortfolioModeProvider({ children }: { children: React.ReactNode }) {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
  }, [mode]);

  const setMode = useCallback((newMode: PortfolioMode) => {
    try {
      localStorage.setItem(STORAGE_KEY, newMode);
      window.dispatchEvent(new Event("hanif_mode_change"));
    } catch {
      // ignore
    }
  }, []);

  const toggleMode = useCallback(() => {
    const next = mode === "pixel" ? "recruiter" : "pixel";
    setMode(next);
  }, [mode, setMode]);

  return (
    <PortfolioModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </PortfolioModeContext.Provider>
  );
}

export function usePortfolioMode(): PortfolioModeContextType {
  const context = useContext(PortfolioModeContext);
  if (!context) {
    throw new Error("usePortfolioMode must be used within a PortfolioModeProvider");
  }
  return context;
}
