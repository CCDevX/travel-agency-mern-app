import i18n from "./i18n";
import { enUS, fr } from "date-fns/locale";

export function getCalendarLocale() {
  const lang = i18n.language;

  if (lang.startsWith("fr")) return fr;
  return enUS; // default
}
