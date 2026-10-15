import { ID, type TranslationKey } from "./id";
/** English keys are the existing approved source copy: no duplicate portfolio database. */
export const EN = Object.fromEntries(Object.keys(ID).map(key => [key, key])) as Record<TranslationKey, string>;
