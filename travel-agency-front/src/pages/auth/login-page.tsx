import { CustomInput } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Form, Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <section className="h-screen w-screen bg-[var(--color-background)] grid place-content-center px-4">
      <Card className="w-[400px] bg-white shadow-lg border border-[var(--color-border)] rounded-2xl px-6 py-8">
        <CardHeader className="text-center mb-4">
          <h2 className="text-2xl font-logo text-[var(--color-primary)] font-semibold">
            Welcome back
          </h2>
          <p className="text-sm text-[var(--color-muted-text)]">
            Login to your account
          </p>
        </CardHeader>

        <CardContent>
          <Form method="POST" className="space-y-4">
            <CustomInput
              label="Email"
              name="email"
              type="email"
              required
              classname="w-full"
            />
            <CustomInput
              label="Password"
              name="password"
              type="password"
              required
              classname="w-full"
            />
            <Button
              type="submit"
              className="w-full rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition"
            >
              Login
            </Button>
          </Form>

          <p className="text-center text-sm text-[var(--color-muted-text)] mt-6">
            Not yet a member ?{" "}
            <Link
              to="/register"
              className="text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] font-medium"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default LoginPage;
