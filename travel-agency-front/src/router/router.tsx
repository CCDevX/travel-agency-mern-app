import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, Layout } from "../pages";
import { layoutRoutes } from "./layout-routes";
import { publicRoutes } from "./public-routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: layoutRoutes,
    errorElement: <ErrorPage />,
  },
  ...publicRoutes,
]);
