export type PetState =
  | "idle"
  | "walk"
  | "reading"
  | "coding"
  | "trophy"
  | "microphone"
  | "rocket"
  | "sleep"
  | "wave";

export interface PetDialogue {
  id: string;
  text: string;
  triggerSection?: string;
  reactionState?: PetState;
}

export interface PetContextType {
  state: PetState;
  setState: (state: PetState) => void;
  isVisible: boolean;
  toggleVisibility: () => void;
  clickCount: number;
  triggerClick: () => void;
  dialogue: string | null;
  clearDialogue: () => void;
  setDialogue: (text: string | null) => void;
}
