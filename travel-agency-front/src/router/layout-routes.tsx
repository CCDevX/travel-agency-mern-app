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
import { ErrorElement } from "@/components";
import { researchLoader } from "@/loaders/research-loader";
import { singleTripLoader } from "@/loaders/single-trip-loader";
import { profilePageLoader } from "@/loaders/profile-loader";
import { store } from "@/store";
import { ConfirmProvider } from "material-ui-confirm";
import { checkoutPageLoader } from "@/loaders/checkout-loader";
import { checkoutPageAction } from "@/actions/checkout/checkout.action";

export const layoutRoutes: RouteObject[] = [
  {
    index: true,
    element: <Landing />,
    loader: researchLoader,
    errorElement: <ErrorElement />,
  },
  {
    path: "research",
    element: <ResearchPage />,
    loader: researchLoader,
    errorElement: <ErrorElement />,
  },
  {
    path: "research/:id",
    element: <SingleTripPage />,
    loader: singleTripLoader,
    errorElement: <ErrorElement />,
  },
  {
    path: "advisors",
    element: <AdvisorsPage />,
    errorElement: <ErrorElement />,
    loader: advisorsLoader,
  },
  {
    path: "advisors/:id",
    element: <AdvisorsSinglePage />,
    errorElement: <ErrorElement />,
    loader: advisorByIdLoader,
  },
  {
    path: "checkout",
    element: <CheckoutPage />,
    errorElement: <ErrorElement />,
    loader: checkoutPageLoader(store),
    action: checkoutPageAction(store),
  },
  {
    path: "agencies",
    element: <AgenciesPage />,
    errorElement: <ErrorElement />,
    loader: agenciesLoader,
  },
  {
    path: "hotline",
    element: <HotlinePage />,
    errorElement: <ErrorElement />,
  },
  {
    path: "profile",
    element: (
      <ConfirmProvider>
        <ProfilePage />
      </ConfirmProvider>
    ),
    loader: profilePageLoader(store),
    errorElement: <ErrorElement />,
  },
];
