import { cleanCheckout } from "@/features/checkout/checkout-slice";
import { useAppDispatch } from "@/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
const CheckoutSuccessPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(cleanCheckout());
    setTimeout(() => navigate("/"), 5000);
  }, [dispatch, navigate]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4">
      <div className="max-w-xl w-full text-center bg-white p-10 rounded-2xl shadow-lg">
        <FaRegCheckCircle
          className="text-[var(--color-primary)] mx-auto mb-4"
          size={64}
        />
        <h1 className="text-3xl font-semibold text-[var(--color-primary)] mb-2">
          {t("checkout-success.title")}
        </h1>
        <p className="text-gray-600">
          {t("checkout-success.emailConfirmation")}
        </p>
        <p className="text-gray-600 mb-6">{t("checkout-success.enjoy")}</p>
        <p className="text-sm text-gray-500 mt-6">
          {t("checkout-success.redirect")}
        </p>
      </div>
    </section>
  );
};

export default CheckoutSuccessPage;
