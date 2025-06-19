import { axiosHelper } from "@/axios/axios-helper";
import { loginUser } from "@/features/users/users-slice";
import type { ReduxStore } from "@/store";
import type { ErrorResponse } from "@/types/response/error-response";
import type { AxiosError } from "axios";
import { redirect, type ActionFunction } from "react-router-dom";

export const loginAction =
  (store: ReduxStore): ActionFunction =>
  async ({ request }): Promise<Response | ErrorResponse> => {
    try {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      const response = await axiosHelper.post("auth/login", data);
      // treat response with the state manager :
      store.dispatch(loginUser(response.data));
      return redirect("/");
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
