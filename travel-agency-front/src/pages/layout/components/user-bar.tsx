import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { logoutUser } from "@/features/users/users-slice";
import { Button } from "@/components/ui/button";
import { Trans, useTranslation } from "react-i18next";

const UserBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.usersSlice.user);
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "fr" ? "en" : "fr";
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="userbar-wrapper">
      <div className="userbar-inner flex justify-between items-center">
        {/* Lang switch */}
        <button
          onClick={toggleLanguage}
          className="text-xs text-[var(--color-primary)] border border-[var(--color-border)] px-3 py-1 rounded-full hover:bg-[var(--color-primary)] hover:text-white transition"
        >
          {i18n.language === "fr" ? "FR" : "EN"}
        </button>

        {/* Auth area */}
        {userData?.username ? (
          <div className="flex items-center gap-4">
            <p className="user-greeting text-sm text-gray-700">
              <Trans
                i18nKey="welcome"
                values={{ name: userData.username }}
                components={{
                  strong: (
                    <span className="capitalize font-semibold text-[var(--color-primary)]" />
                  ),
                }}
              />
            </p>
            <Button
              onClick={handleLogout}
              className="text-sm text-[var(--color-primary)] border border-[var(--color-border)] bg-white rounded-md px-4 py-1 hover:bg-[var(--color-primary)] hover:text-white transition-colors"
            >
              {t("logout")}
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="link-secondary text-sm">
              {t("signin")}
            </Link>
            <Link to="/register" className="link-accent text-sm">
              {t("register-icon")}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
export default UserBar;
