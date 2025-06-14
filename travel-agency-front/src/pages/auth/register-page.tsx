import { CustomInput } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <section className="h-screen w-screen grid place-content-center bg-gradient-to-b from-blue-100 to-white">
      <Card className="w-[360px] bg-white shadow-md border rounded-xl">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-bold">Create your account</h2>
          <p className="text-sm text-gray-500">
            Join us and start your journey
          </p>
        </CardHeader>
        <CardContent>
          <Form method="POST">
            <CustomInput
              label="Username"
              name="username"
              type="text"
              required
              classname="my-2 w-full"
            />
            <CustomInput
              label="Email"
              name="email"
              type="email"
              required
              classname="my-2 w-full"
            />
            <CustomInput
              label="Password"
              name="password"
              type="password"
              required
              classname="my-2 w-full"
            />
            <Button
              type="submit"
              className="my-4 w-full bg-blue-600 hover:bg-blue-700"
            >
              Register
            </Button>
            <p className="text-center text-sm text-gray-500">
              Already a member?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
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
