import Title from "@/components/title";
import { textBlocks } from "@/utils/why-us-text-data";
import { useTranslation } from "react-i18next";
const WhyUsText = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 px-4 md:px-8 bg-[color:var(--color-background)]">
      <div className="w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-white p-8">
        <Title text={t("whyUsText.sectionTitle")} level={2} />

        <div className="grid lg:grid-cols-3 gap-10 mt-10">
          {textBlocks.map((block, index) => (
            <div key={`block-${index}`}>
              <h3 className="text-[color:var(--color-primary)] font-semibold text-xl mb-4 leading-snug">
                {t(block.titleKey)}
              </h3>
              {block.contentKeys.map((line, idx) => (
                <p
                  key={`sentence-${idx}`}
                  className="text-[#555] mb-3 leading-relaxed text-sm"
                >
                  {t(line)}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsText;
