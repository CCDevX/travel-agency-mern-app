import { CustomInput } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Form, Link } from "react-router-dom";

const RegisterPage = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[var(--color-background)] to-white px-4">
      <Card className="w-full max-w-sm bg-white shadow-md border border-[var(--color-border)] rounded-xl">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">
            {t("register.title")}
          </h2>
          <p className="text-sm text-[var(--color-muted-text)]">
            {t("register.subtitle")}
          </p>
        </CardHeader>

        <CardContent>
          <Form method="POST" className="space-y-4">
            <CustomInput
              label={t("register.username")}
              name="username"
              type="text"
              required
              classname="w-full"
            />
            <CustomInput
              label={t("register.email")}
              name="email"
              type="email"
              required
              classname="w-full"
            />
            <CustomInput
              label={t("register.password")}
              name="password"
              type="password"
              required
              classname="w-full"
            />
            <Button
              type="submit"
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
            >
              {t("register.button")}
            </Button>
            <p className="text-center text-sm text-[var(--color-muted-text)]">
              {t("register.already")}{" "}
              <Link
                to="/login"
                className="text-[var(--color-secondary)] hover:underline font-medium"
              >
                {t("register.login")}
              </Link>
            </p>
            <p className="text-center text-sm text-[var(--color-muted-text)] mt-2">
              <Link
                to="/"
                className="text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] font-medium"
              >
                {t("register.backHome")}
              </Link>
            </p>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default RegisterPage;
