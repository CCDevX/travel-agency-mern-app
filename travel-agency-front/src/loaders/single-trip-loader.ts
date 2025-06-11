import { axiosHelper } from "@/axios/axios-helper";
import type { Trip } from "@/types/entities/trip";
import type { LoaderFunction } from "react-router-dom";

export const singleTripLoader: LoaderFunction = async ({
  params,
}): Promise<Trip | null> => {
  try {
    const response = await axiosHelper.get<Trip>(`trips/${params.id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
