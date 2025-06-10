import { axiosHelper } from "@/axios/axios-helper";
import type { Agency } from "@/types/entities/agency";
import type { LoaderFunction } from "react-router-dom";

export const agenciesLoader: LoaderFunction = async (): Promise<
  Agency[] | null
> => {
  try {
    const response = await axiosHelper.get<Agency[]>("agencies");
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
