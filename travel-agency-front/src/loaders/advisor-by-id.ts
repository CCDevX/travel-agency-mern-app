import { axiosHelper } from "@/axios/axios-helper";
import type { Advisor } from "@/types/entities/advisor";
import type { LoaderFunction } from "react-router-dom";

export const advisorByIdLoader: LoaderFunction = async ({
  params,
}): Promise<Advisor | null> => {
  try {
    const response = await axiosHelper.get<Advisor>(`advisers/${params.id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
