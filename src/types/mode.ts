export type PortfolioMode = "pixel" | "recruiter";

export interface PortfolioModeContextType {
  mode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;
  toggleMode: () => void;
}
