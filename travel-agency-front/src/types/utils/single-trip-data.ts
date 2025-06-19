import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import i18n from "../../locales/i18n";

function getDateLocale() {
  return i18n.language.startsWith("fr") ? fr : enUS;
}

export const rangeDateFormatter = (
  date: DateRange
): { from: string; to: string } => {
  const locale = getDateLocale();
  const hashedDate = { from: "", to: "" };

  if (date.from) {
    hashedDate.from = format(date.from, "PPP", { locale });
  }
  if (date.to) {
    hashedDate.to = format(date.to, "PPP", { locale });
  }

  return hashedDate;
};

export const singleDateFormatter = (date: Date): string => {
  const locale = getDateLocale();
  return format(date, "PPP", { locale });
};
