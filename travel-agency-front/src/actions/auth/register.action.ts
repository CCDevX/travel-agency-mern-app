import { axiosHelper } from "@/axios/axios-helper";
import { type ActionFunction, redirect } from "react-router-dom";

export const registerAction: ActionFunction = async ({
  request,
}): Promise<Response | null> => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    await axiosHelper.post<string>("auth/register", data);
    return redirect("/login");
  } catch (error) {
    console.log(error);
    return null;
  }
};
