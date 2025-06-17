import { CustomInput } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[var(--color-background)] to-white px-4">
      <Card className="w-full max-w-sm bg-white shadow-md border border-[var(--color-border)] rounded-xl">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">
            Create your account
          </h2>
          <p className="text-sm text-[var(--color-muted-text)]">
            Join us and start your journey
          </p>
        </CardHeader>

        <CardContent>
          <Form method="POST" className="space-y-4">
            <CustomInput
              label="Username"
              name="username"
              type="text"
              required
              classname="w-full"
            />
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
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
            >
              Register
            </Button>
            <p className="text-center text-sm text-[var(--color-muted-text)]">
              Already a member?{" "}
              <Link
                to="/login"
                className="text-[var(--color-secondary)] hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default RegisterPage;
