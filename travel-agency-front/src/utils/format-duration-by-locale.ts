import i18n from "@/locales/i18n";

export function formatDurationByLocale(duration: number): string {
  const locale = i18n.language;
  const nights = duration - 1;

  if (locale.startsWith("fr")) {
    const jours = duration > 1 ? "jours" : "jour";
    const nuits = nights > 1 ? "nuits" : "nuit";
    return `${duration} ${jours} / ${nights} ${nuits}`;
  }

  // Default to English
  const days = duration > 1 ? "days" : "day";
  const ns = nights > 1 ? "nights" : "night";
  return `${duration} ${days}, ${nights} ${ns}`;
}
