import { axiosHelper } from "@/axios/axios-helper";
import type { ErrorResponse } from "@/types/response/error-response";
import type { AxiosError } from "axios";
import { type ActionFunction, redirect } from "react-router-dom";

export const registerAction: ActionFunction = async ({
  request,
}): Promise<Response | ErrorResponse> => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    await axiosHelper.post<string>("auth/register", data);
    return redirect("/login");
  } catch (error) {
    const err = error as AxiosError;
    const message = err?.response?.data || "An unexpected error occurred.";
    const status = err?.response?.status || 500;
    return {
      message: message.toString(),
      statusCode: status,
    };
  }
};
