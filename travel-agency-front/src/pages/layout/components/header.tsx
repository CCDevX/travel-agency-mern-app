import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo-removebg.png";
import { MapPin, Phone, User, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  return (
    <header className="w-full bg-white text-[color:var(--color-primary)] border-b border-[color:var(--color-border)] py-4">
      <div className="align-center flex flex-col md:flex-row justify-between items-center">
        {/* Logo + Brand Name */}
        <Link to="/" className="flex items-center hover-btn gap-3 mb-4 md:mb-0">
          <div className="w-[72px] h-[72px]">
            <img
              src={logo}
              alt="Travel Agency logo"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="font-special text-4xl leading-tight">
            {t("header.brand")}
          </p>
        </Link>

        {/* Info Links */}
        <div className="flex gap-5 md:gap-6 text-center text-sm font-medium">
          <Link to="/agencies" className="icon-link">
            <MapPin size={40} className="bordered rounded-xl p-2" />
            <span className="text-sm md:text-base">{t("header.agencies")}</span>
          </Link>

          <Link to="/advisors" className="icon-link">
            <Users size={40} className="bordered rounded-xl p-2" />
            <span className="text-sm md:text-base">{t("header.advisors")}</span>
          </Link>

          <Link to="/hotline" className="icon-link">
            <Phone size={40} className="bordered rounded-xl p-2" />
            <span className="text-sm md:text-base"> {t("header.hotline")}</span>
          </Link>

          <Link to="/profile" className="icon-link">
            <User size={40} className="bordered rounded-xl p-2" />
            <span className="text-sm md:text-base">{t("header.account")}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
