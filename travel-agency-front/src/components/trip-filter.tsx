import { CustomInput, CustomRange, CustomSelect } from "@/components";
import { Button } from "@/components/ui/button";
import type { ResearchLoaderType } from "@/types/dtos/research-loader-type";
import {
  regionsCodes,
  categories,
  durations,
  tags,
} from "@/utils/filters-data";
import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Link, useLoaderData } from "react-router-dom";

const TripFilter = () => {
  const { t } = useTranslation();
  const { params } = useLoaderData() as ResearchLoaderType;
  const [trigger, setTrigger] = useState(0);

  const {
    region: urlRegion,
    town: urlTown,
    category: urlCategory,
    duration: urlDuration,
    price: urlPrice,
    tags: urlTags,
  } = params;

  useEffect(() => {
    setTrigger((oldState) => oldState + 1);
  }, [urlRegion, urlTown, urlCategory, urlDuration, urlPrice, urlTags]);

  // Convert name via i18n before passing to CustomSelect
  const translateOptions = (
    original: { name: string; code: number }[],
    baseKey: string
  ) =>
    original.map((item) => ({
      ...item,
      name: t(`${baseKey}.${item.code}`, item.name),
    }));

  return (
    <section key={trigger} className="filter-section">
      <div className="mb-10 text-center px-4">
        <h2 className="text-4xl lg:text-5xl font-special text-[color:var(--color-primary)]">
          {t("filters.title")}
        </h2>
      </div>

      <Form method="get" action="/research" className="filter-grid">
        <CustomSelect
          label={t("filters.region")}
          name="region"
          options={translateOptions(regionsCodes, "filters.regions")}
          defaultValue={urlRegion || "0"}
        />

        <CustomInput
          label={t("filters.town")}
          name="town"
          type="search"
          defaultValue={urlTown}
        />

        <CustomSelect
          label={t("filters.type")}
          name="category"
          options={translateOptions(categories, "filters.categories")}
          defaultValue={urlCategory || "0"}
        />

        <CustomSelect
          label={t("filters.duration")}
          name="duration"
          options={translateOptions(durations, "filters.durations")}
          defaultValue={urlDuration || "0"}
        />

        <CustomSelect
          label={t("filters.tags")}
          name="tags"
          options={translateOptions(tags, "filters.tagsList")}
          defaultValue={urlTags || "0"}
        />

        {/* Slider */}
        <div className="slider-wrapper">
          <CustomRange name="price" defaultValue={urlPrice} />
        </div>

        {/* Buttons */}
        <div className="filter-buttons">
          <Button
            type="submit"
            size="lg"
            className="text-base font-medium bg-[color:var(--color-primary)] text-white px-6 py-3 rounded-xl shadow hover:brightness-110 transition"
          >
            {t("filters.search")}
          </Button>

          <Link to="/research">
            <Button
              variant="ghost"
              aria-label={t("filters.reset")}
              className="text-[color:var(--color-secondary)] hover:text-[color:var(--color-accent)] flex items-center gap-2 text-base"
            >
              <RotateCcw className="w-5 h-5" />
              <span>{t("filters.reset")}</span>
            </Button>
          </Link>
        </div>
      </Form>
    </section>
  );
};

export default TripFilter;
