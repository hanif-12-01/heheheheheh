import { ROOT_ID } from "./root-id";
import { ATELIER_ID } from "./atelier-id";
import { UI_ID } from "./ui-id";
import { CONTENT_ID } from "./content-id";

/** Translation-only overlays. Identity, numbers, URLs and technology arrays remain canonical. */
export const ID = { ...CONTENT_ID, ...UI_ID, ...ROOT_ID, ...ATELIER_ID } as const;
export type TranslationKey = keyof typeof ID;
