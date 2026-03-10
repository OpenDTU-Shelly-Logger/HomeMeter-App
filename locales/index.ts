import en from "./en";
import de from "./de";
import { useSettings } from "@/contexts/settingsContext";

export type { Translations } from "./en";
export { en, de };

/** Reactive hook — returns the translation object matching the current language setting. */
export function useTranslations() {
  const { language } = useSettings();
  return language === "de" ? de : en;
}
