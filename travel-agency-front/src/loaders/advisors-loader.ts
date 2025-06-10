import { axiosHelper } from "@/axios/axios-helper";
import type { Advisor } from "@/types/entities/advisor";
import type { LoaderFunction } from "react-router-dom";

export const advisorsLoader: LoaderFunction = async ({
  request,
}): Promise<Advisor[] | null> => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    console.log(params);
    const response = await axiosHelper.get<Advisor[]>("advisers", { params });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
