import type { RouteObject } from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
  CheckoutSuccessPage,
  ErrorPage,
} from "../pages";
import { registerAction } from "@/actions/auth/register.action";
import { loginAction } from "@/actions/auth/login.action";
import { store } from "@/store";

export const publicRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    action: loginAction(store),
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
    action: registerAction,
  },
  {
    path: "/checkout-success",
    element: <CheckoutSuccessPage />,
    errorElement: <ErrorPage />,
  },
];
