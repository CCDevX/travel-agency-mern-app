import { CustomInput } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { mapLoginErrorMessage } from "@/types/mapper/error-mapper";
import type { ErrorResponse } from "@/types/response/error-response";
import { useTranslation } from "react-i18next";

import { Form, Link, useActionData } from "react-router-dom";

const LoginPage = () => {
  const { t } = useTranslation();
  const actionData = useActionData() as ErrorResponse;

  const errorKey = actionData ? mapLoginErrorMessage(actionData.message) : null;

  return (
    <section className="h-screen w-screen bg-[var(--color-background)] grid place-content-center px-4">
      <Card className="w-full min-w-[325px] bg-white shadow-lg border border-[var(--color-border)] rounded-2xl px-6 py-8">
        <CardHeader className="text-center mb-4">
          <h2 className="text-2xl font-logo text-[var(--color-primary)] font-semibold">
            {t("login.title")}
          </h2>
          <p className="text-sm text-[var(--color-muted-text)]">
            {t("login.subtitle")}
          </p>
        </CardHeader>

        <CardContent>
          <Form method="POST" className="space-y-4">
            <CustomInput
              label={t("login.email")}
              name="email"
              type="email"
              required
              classname="w-full"
            />
            <CustomInput
              label={t("login.password")}
              name="password"
              type="password"
              required
              classname="w-full"
            />
            <Button
              type="submit"
              className="w-full rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition"
            >
              {t("login.button")}
            </Button>
          </Form>

          <p className="text-center text-sm text-[var(--color-muted-text)] mt-6">
            {t("login.noAccount")}{" "}
            <Link
              to="/register"
              className="text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] font-medium"
            >
              {t("login.register")}
            </Link>
          </p>
          <p className="text-center text-sm text-[var(--color-muted-text)] mt-2">
            <Link
              to="/"
              className="text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] font-medium"
            >
              {t("login.backHome")}
            </Link>
          </p>
        </CardContent>
        {errorKey && (
          <p className="text-red-500 text-sm text-center mb-4">
            {t(`login.errors.${errorKey}`)}
          </p>
        )}
      </Card>
    </section>
  );
};

export default LoginPage;
