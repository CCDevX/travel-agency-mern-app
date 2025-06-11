import type { RouteObject } from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
  CheckoutSuccessPage,
  ErrorPage,
} from "../pages";

export const publicRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/checkout-success",
    element: <CheckoutSuccessPage />,
    errorElement: <ErrorPage />,
  },
];
