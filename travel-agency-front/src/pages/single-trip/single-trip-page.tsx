import BreadCrumbs from "@/components/bread-crumbs";
import type { Trip } from "@/types/entities/trip";
import { useLoaderData } from "react-router-dom";
import SingleTrip from "./components/single-trip";
import i18n from "../../locales/i18n";
const SingleTripPage = () => {
  const { title } = useLoaderData() as Trip;
  const lang = i18n.language.startsWith("fr") ? "fr" : "en";

  const tripTitle = title[lang];
  return (
    <>
      <BreadCrumbs title={tripTitle}></BreadCrumbs>
      <SingleTrip></SingleTrip>
    </>
  );
};

export default SingleTripPage;
