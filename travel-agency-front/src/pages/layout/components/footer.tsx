import { icons } from "../../../utils/footer-data";
import logo from "../../../assets/images/logo-removebg-white.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const colData = [
    t("footer.col2", { returnObjects: true }) as string[],
    t("footer.col1", { returnObjects: true }) as string[],
    t("footer.col3", { returnObjects: true }) as string[],
    t("footer.col4", { returnObjects: true }) as string[],
  ];

  return (
    <footer className="min-h-[30vh] pb-12 bg-[color:var(--color-primary)] text-[color:var(--color-white)] border-t border-white/10">
      <div className="align-center pt-6 grid grid-cols-1 lg:grid-cols-5 gap-6 place-items-center">
        <div className="w-[150px] h-[150px]">
          <img
              loading="lazy"
            src={logo}
            alt="Travel Agency logo"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full h-full lg:col-span-4 text-[color:var(--color-white)] text-sm">
          {t("footer.description")}
        </div>

        <div className="w-full h-full flex flex-col md:flex-row lg:flex-col justify-between items-start gap-7">
          <div className="flex flex-col items-start">
            <p className="font-semibold">{t("footer.payments.safe")}</p>
            <img loading="lazy" src={icons.stripe} alt="stripe-logo" className="h-[40px]" />
          </div>
          <div className="flex flex-col items-start">
            <p className="font-semibold">{t("footer.payments.accepted")}</p>
            <div className="flex justify-start gap-x-4 flex-wrap">
              <img loading="lazy" src={icons.visa} alt="visa-logo" className="h-[40px]" />
              <img loading="lazy" src={icons.master} alt="master-logo" className="h-[40px]" />
              <img
                  loading="lazy"
                src={icons.bitcoin}
                alt="bitcoin-logo"
                className="h-[40px]"
              />
              <img loading="lazy" src={icons.amex} alt="amex-logo" className="h-[40px]" />
            </div>
          </div>
          <div className="flex flex-col items-start">
            <p className="font-semibold">{t("footer.payments.partners")}</p>
            <img loading="lazy" src={icons.iata} alt="iata-logo" className="h-[40px]" />
          </div>
        </div>

        <div className="w-full h-full flex flex-col md:flex-row lg:col-span-4 justify-between gap-2 mt-8">
          {colData.map((col, i) => (
            <div className="leading-8" key={i}>
              <div className="font-bold underline text-sm mb-1">
                {t(`footer.columns.${i}`)}
              </div>
              {col.map((content, index) => (
                <div
                  key={index}
                  className="text-sm hover:text-[color:var(--color-accent-hover)] cursor-pointer transition-colors"
                >
                  {content}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 align-center text-center capitalize text-xl border-t border-white/10 pt-6">
        <p>CCDevX – {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};
export default Footer;
