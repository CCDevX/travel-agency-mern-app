import { CustomInput } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Form, Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <section className="h-screen w-screen grid place-content-center">
      <Card className="w-[360px] bg-white shadow-md border rounded-xl">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-bold">Welcome back</h2>
          <p className="text-sm text-gray-500">Login to your account</p>
        </CardHeader>
        <CardContent>
          <Form method="POST">
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
              Login
            </Button>
            <p className="text-center text-sm text-gray-500">
              Not yet a member ?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default LoginPage;
