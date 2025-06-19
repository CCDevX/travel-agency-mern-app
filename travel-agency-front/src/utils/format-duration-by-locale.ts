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

export function formatTripDetailsByLocale(
  duration: number,
  adults: number,
  kids: number
): string {
  const locale = i18n.language;
  const nights = duration - 1;

  if (locale.startsWith("fr")) {
    const jours = duration > 1 ? "jours" : "jour";
    const nuits = nights > 1 ? "nuits" : "nuit";
    const adulteTxt = adults > 1 ? "adultes" : "adulte";
    const enfantTxt = kids > 1 ? "enfants" : "enfant";
    return `${duration} ${jours} / ${nights} ${nuits} avec ${adults} ${adulteTxt} et ${kids} ${enfantTxt}`;
  }

  // Default to English
  const dayTxt = duration > 1 ? "days" : "day";
  const nightTxt = nights > 1 ? "nights" : "night";
  const adultTxt = adults > 1 ? "adults" : "adult";
  const kidTxt = kids > 1 ? "kids" : "kid";
  return `${duration} ${dayTxt} / ${nights} ${nightTxt} with ${adults} ${adultTxt} and ${kids} ${kidTxt}`;
}

export function formatPeopleByLocale(adults: number, kids: number): string {
  const language = navigator.language || "en";
  const isFrench = language.startsWith("fr");

  if (isFrench) {
    const adulteTxt = adults > 1 ? "adultes" : "adulte";
    const enfantTxt = kids > 1 ? "enfants" : "enfant";
    return ` ${adults} ${adulteTxt} et ${kids} ${enfantTxt}`;
  }

  // Default to English
  const adultTxt = adults > 1 ? "adults" : "adult";
  const kidTxt = kids > 1 ? "kids" : "kid";
  return `${adults} ${adultTxt} and ${kids} ${kidTxt}`;
}
