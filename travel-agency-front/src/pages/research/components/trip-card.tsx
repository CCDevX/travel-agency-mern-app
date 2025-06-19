import { apiUrl } from "@/axios/axios-helper";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Trip } from "@/types/entities/trip";
import { getCategoryColor } from "@/types/utils/category-colors-data";
import { regionsCodes } from "@/utils/filters-data";
import { formatAsEuros } from "@/utils/format-as-euros";
import { formatDurationByLocale } from "@/utils/format-duration-by-locale";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import i18n from "../../../locales/i18n";
const TripCard = ({ trip }: { trip: Trip }) => {
  const {
    _id,
    title,
    region,
    town,
    category,
    images,
    duration,
    adultPrice,
    tags,
  } = trip;

  const lang = i18n.language.startsWith("fr") ? "fr" : "en";
  const apiImageUrl = `${apiUrl}/images/trips/${_id}/${images[0]}`;
  const regionName = regionsCodes.find((item) => item.code === region)?.name;
  const tripTitle = title[lang];
  const { t } = useTranslation();
  return (
    <Card className="p-0 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden bg-white max-h-[370px] cursor-pointer">
      <Link to={`/research/${_id}`} className="block h-full">
        {/* IMAGE */}
        <div className="h-36 w-full overflow-hidden">
          <img
            src={apiImageUrl}
            alt={tripTitle}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105 hover:brightness-105"
          />
        </div>

        {/* CONTENU */}
        <CardContent className="px-4 py-3">
          <p className="text-sm text-gray-500 mb-1">
            {regionName}
            {town ? ` – ${town}` : ""}
          </p>
          <h3 className="text-lg font-special text-blue-900 leading-snug mb-2">
            {tripTitle}
          </h3>
        </CardContent>

        {/* FOOTER */}
        <CardFooter className="flex flex-col items-start gap-2 px-4 pb-4 text-sm text-gray-700">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs capitalize"
              >
                {t(`filters.tagsListName.${tag}`)}
              </Badge>
            ))}
          </div>

          {/* Catégorie + durée */}
          <div className="flex items-center gap-2 text-sm">
            <Badge
              style={{ backgroundColor: getCategoryColor(category) }}
              className="text-white px-2 py-0.5 text-xs capitalize"
            >
              {t(`filters.categoriesName.${category}`)}
            </Badge>
            <span className="text-gray-600 italic">
              {formatDurationByLocale(duration)}
            </span>
          </div>

          {/* Prix */}
          <span className="font-semibold text-black">
            {formatAsEuros(adultPrice)} / {t(`single-trip.person`)}
          </span>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default TripCard;
