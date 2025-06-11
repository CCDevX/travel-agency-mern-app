import BreadCrumbs from "@/components/bread-crumbs";
import type { Trip } from "@/types/entities/trip";
import { useLoaderData } from "react-router-dom";
import SingleTrip from "./components/single-trip";

const SingleTripPage = () => {
  const { title } = useLoaderData() as Trip;
  return (
    <>
      <BreadCrumbs title={title}></BreadCrumbs>
      <SingleTrip></SingleTrip>
    </>
  );
};

export default SingleTripPage;
