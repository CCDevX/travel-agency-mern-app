import { Form, Link } from "react-router-dom";
import { Button } from "./ui/button";
import CustomInput from "./input/custom-input";
import { RotateCcw } from "lucide-react";
import { useState } from "react";
import Title from "./title";
import { useTranslation } from "react-i18next";

const FilterAdvisors = () => {
  const [trigger, setTrigger] = useState(0);
  const { t } = useTranslation();

  const handleReset = () => {
    setTrigger((oldState) => oldState + 1);
  };
  return (
    <section className="py-12 bg-[color:var(--color-background)]">
      <div className="align-center flex flex-col gap-6">
        <Title text={t("filters.advisors.title")} />

        <p className="text-center text-[color:var(--color-muted-text)] text-lg">
          {t("filters.advisors.subtitle")}
        </p>

        <Form
          action="/advisors"
          className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-4 w-full"
        >
          <CustomInput
            label={t("filters.advisors.townLabel")}
            name="town"
            type="search"
            required
            classname="w-full max-w-xl"
            placeholder={t("filters.advisors.placeholder")}
            nolabel
            key={trigger}
          />
          <Button
            type="submit"
            size="lg"
            className="text-lg font-semibold bg-[color:var(--color-primary)] text-white hover:bg-[color:var(--color-primary-hover)] transition"
          >
            {t("filters.search")}
          </Button>

          <Link to="/advisors">
            <Button
              variant="ghost"
              onClick={handleReset}
              className="flex gap-2 text-[color:var(--color-muted-text)] hover:text-[color:var(--color-accent)] transition"
            >
              <RotateCcw className="w-5 h-5" />
              <span className="text-base">{t("filters.reset")}</span>
            </Button>
          </Link>
        </Form>
      </div>
    </section>
  );
};

export default FilterAdvisors;
