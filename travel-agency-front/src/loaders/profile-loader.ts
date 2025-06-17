import { axiosHelper } from "@/axios/axios-helper";
import type { ReduxStore } from "@/store";
import type { ProfilePageLoaderType } from "@/types/dtos/profile-page-loader-type";
import type { Order } from "@/types/entities/order";
import type { Profile } from "@/types/entities/profile";
import { redirect, type LoaderFunction } from "react-router-dom";

export const profilePageLoader =
  (store: ReduxStore): LoaderFunction =>
  async (): Promise<Response | ProfilePageLoaderType | null> => {
    const user = store.getState().usersSlice.user;
    if (!user?.username) {
      return redirect("/login");
    }
    try {
      const responseProfile = await axiosHelper.get<Profile>("/profile");
      const responseOrders = await axiosHelper.get<Order[]>("/orders");
      return { ...responseProfile.data, orders: responseOrders.data };
    } catch (error) {
      console.log(error);
      return null;
    }
  };
