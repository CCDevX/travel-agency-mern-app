import { axiosHelper } from "@/axios/axios-helper";
import type { ReduxStore } from "@/store";
import type { Trip } from "@/types/entities/trip";
import type { LoaderFunction } from "react-router-dom";

export const checkoutPageLoader =
  (store: ReduxStore): LoaderFunction =>
  async (): Promise<Trip | null> => {
    try {
      const checkout = store.getState().checkoutSlice;
      let { trip } = checkout;
      if (!trip) {
        const localStorageData = JSON.parse(
          localStorage.getItem("selection") || ""
        );
        trip = localStorageData.trip;
      }
      const response = await axiosHelper.get<Trip>(`/trips/${trip}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
