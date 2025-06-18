import Title from "@/components/title";
import { blocksIcons, footerIcon } from "../../../utils/why-us-data";
import { useTranslation } from "react-i18next";

const WhyUs = () => {
  const { t } = useTranslation();
  const FooterIcon = footerIcon;

  return (
    <section className="py-12 px-4 md:px-8 bg-[color:var(--color-background)]">
      <div className="w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-white p-8">
        <Title text={t("whyUs.header")} level={2} />

        <div className="grid md:grid-cols-3 gap-10 mt-10">
          {blocksIcons.map((icon, index) => {
            const Icon = icon;
            return (
              <div key={index} className="flex gap-4 items-start">
                <Icon className="w-8 h-8 text-[color:var(--color-primary)] flex-shrink-0 mt-1" />
                <p className="text-[color:var(--color-primary)] font-medium">
                  {t(`whyUs.blocks.${index}`)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center items-center gap-3 mt-10 text-[color:var(--color-primary)]">
          <FooterIcon className="w-5 h-5" />
          <p className="font-medium">{t("whyUs.footer")}</p>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
