import type { RouteObject } from "react-router-dom";
import {
  Landing,
  ResearchPage,
  SingleTripPage,
  AdvisorsPage,
  AdvisorsSinglePage,
  CheckoutPage,
  AgenciesPage,
  HotlinePage,
  ProfilePage,
} from "../pages";

export const layoutRoutes: RouteObject[] = [
  {
    index: true,
    element: <Landing />,
  },
  {
    path: "research",
    element: <ResearchPage />,
  },
  {
    path: "research/:id",
    element: <SingleTripPage />,
  },
  {
    path: "advisors",
    element: <AdvisorsPage />,
  },
  {
    path: "advisors/:id",
    element: <AdvisorsSinglePage />,
  },
  {
    path: "checkout",
    element: <CheckoutPage />,
  },
  {
    path: "agencies",
    element: <AgenciesPage />,
  },
  {
    path: "hotline",
    element: <HotlinePage />,
  },
  {
    path: "profile",
    element: <ProfilePage />,
  },
];
