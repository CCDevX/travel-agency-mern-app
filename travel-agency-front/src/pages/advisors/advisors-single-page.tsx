import { apiUrl } from "@/axios/axios-helper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Advisor } from "@/types/entities/advisor";
import { useLoaderData, useNavigate } from "react-router-dom";
import i18n from "@/locales/i18n";
import { useTranslation } from "react-i18next";

const AdvisorsSinglePage = () => {
  const advisor = useLoaderData() as Advisor;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const lang = i18n.language.startsWith("fr") ? "fr" : "en";
  const desc = advisor.desc[lang];
  const getMembershipText = (count: number, lang: string): string => {
    const isFrench = lang.startsWith("fr");
    if (isFrench) {
      return count === 1
        ? `Conseiller depuis ${count} an`
        : `Conseiller depuis ${count} ans`;
    } else {
      return count === 1
        ? `Member for ${count} year`
        : `Member for ${count} years`;
    }
  };
  const yearCount = isNaN(parseInt(advisor.from, 10))
    ? 0
    : parseInt(advisor.from, 10);
  return (
    <section>
      {/* Back button */}
      <div className="align-center my-6 mt-8">
        <Button
          onClick={() => navigate(-1)}
          className="rounded-full bg-[color:var(--color-primary)] text-white hover:bg-[color:var(--color-primary-hover)]"
        >
          {t("single-advisor.back")}
        </Button>
      </div>

      {/* Advisor details */}
      <div className="align-center grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
        {/* Profile image */}
        <div className="w-[250px] h-[250px] mx-auto rounded-full overflow-hidden shadow-lg">
          <img
              loading="lazy"
            crossOrigin="anonymous"
            src={`${apiUrl}/images/advisers/${advisor._id}/${advisor.image}`}
            alt={advisor.name}
            className="h-full w-full object-cover transition-all mix-blend-luminosity hover:mix-blend-normal"
          />
        </div>

        {/* Info */}
        <div className="text-left">
          <h2 className="text-3xl font-bold text-[color:var(--color-primary)] capitalize mb-1">
            {advisor.name}
          </h2>
          <p className="text-sm text-[color:var(--color-muted-text)]">
            {t("single-advisor.agency")}
            <span className="capitalize">{advisor.present}</span>
          </p>
          <p className="text-sm text-[color:var(--color-muted-text)]">
            {getMembershipText(yearCount, i18n.language)}
          </p>

          <p className="mt-6 text-base leading-relaxed text-[color:var(--color-muted-text)]">
            {desc}
          </p>

          <div className="mt-6">
            <p className="font-semibold text-[color:var(--color-primary)] mb-1">
              {t("single-advisor.contact")}
            </p>
            <p className="text-[color:var(--color-muted-text)]">
              {advisor.phone}
            </p>
            <p className="text-[color:var(--color-muted-text)]">
              {advisor.email}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {advisor.tags.map((tag, index) => (
              <Badge
                key={index}
                className="capitalize px-3 py-1 text-xs rounded-full border border-[color:var(--color-primary)] text-[color:var(--color-primary)] bg-white"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvisorsSinglePage;
