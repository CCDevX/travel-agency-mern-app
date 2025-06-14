import { axiosHelper } from "@/axios/axios-helper";
import { loginUser } from "@/features/users/users-slice";
import type { ReduxStore } from "@/store";
import { redirect, type ActionFunction } from "react-router-dom";

export const loginAction =
  (store: ReduxStore): ActionFunction =>
  async ({ request }): Promise<Response | null> => {
    try {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      const response = await axiosHelper.post("auth/login", data);
      // treat response with the state manager :
      store.dispatch(loginUser(response.data));
      return redirect("/");
    } catch (error) {
      console.log(error);
      return null;
    }
  };
