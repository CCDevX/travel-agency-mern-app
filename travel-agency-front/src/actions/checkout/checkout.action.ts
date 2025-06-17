import { axiosHelper } from "@/axios/axios-helper";
import type { ReduxStore } from "@/store";
import { redirect, type ActionFunction } from "react-router-dom";

export const checkoutPageAction =
  (store: ReduxStore): ActionFunction =>
  async ({ request }): Promise<Response | null> => {
    try {
      const formData = await request.formData();
      const clientData = Object.fromEntries(formData);
      const purchaseData = store.getState().checkoutSlice;
      const token = store.getState().usersSlice.token;
      const emailFromStore = store.getState().usersSlice.user.email;
      if (!clientData.email) {
        clientData.email = emailFromStore;
      }
      const response = await axiosHelper.post("/create-checkout-session", {
        items: [
          {
            id: purchaseData.trip,
            quantity: 1,
            kids: purchaseData.kids,
            adults: purchaseData.adults,
          },
        ],
        order: {
          trip: purchaseData.trip,
          quantity: 1,
          kids: purchaseData.kids,
          adults: purchaseData.adults,
          ...clientData,
        },
        token: token,
      });
      return redirect(`${response.data.url}`);
    } catch (error) {
      console.log(error);
      return null;
    }
  };
