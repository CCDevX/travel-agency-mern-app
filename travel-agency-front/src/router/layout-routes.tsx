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
import { agenciesLoader } from "@/loaders/agencies-loader";
import { advisorsLoader } from "@/loaders/advisors-loader";
import { advisorByIdLoader } from "@/loaders/advisor-by-id";

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
    loader: advisorsLoader,
  },
  {
    path: "advisors/:id",
    element: <AdvisorsSinglePage />,
    loader: advisorByIdLoader,
  },
  {
    path: "checkout",
    element: <CheckoutPage />,
  },
  {
    path: "agencies",
    element: <AgenciesPage />,
    loader: agenciesLoader,
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
