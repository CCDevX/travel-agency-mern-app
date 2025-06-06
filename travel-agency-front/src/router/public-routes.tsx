import type { RouteObject } from "react-router-dom";
import { LoginPage, RegisterPage, CheckoutSuccessPage } from "../pages";

export const publicRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/checkout-success",
    element: <CheckoutSuccessPage />,
  },
];
