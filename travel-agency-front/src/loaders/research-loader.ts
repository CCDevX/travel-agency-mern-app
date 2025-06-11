import { axiosHelper } from "@/axios/axios-helper";
import type { ResearchLoaderType } from "@/types/dtos/research-loader-type";
import type { Trip } from "@/types/entities/trip";
import type { LoaderFunction } from "react-router-dom";

export const researchLoader: LoaderFunction = async ({
  request,
}): Promise<ResearchLoaderType | null> => {
  try {
    let params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    if (Object.keys(params).length === 0) {
      params = {
        town: "",
        duration: "0",
        category: "0",
        price: "",
        region: "0",
        tags: "0",
      };
    }
    const response = await axiosHelper.get<Trip[]>("trips", { params });
    return {
      data: response.data,
      params: params,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
