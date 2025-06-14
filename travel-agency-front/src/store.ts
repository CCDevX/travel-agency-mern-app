import { configureStore } from "@reduxjs/toolkit";
import checkoutReducer from "./features/checkout/checkout-slice";
import usersReducer from "./features/users/users-slice";

export const store = configureStore({
  reducer: {
    checkoutSlice: checkoutReducer,
    usersSlice: usersReducer,
  },
});

// Standard types for redux with typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Thunks types for redux with typescript
export type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: { error: string };
};

// Loaders and actions types for redux with typescript
export type ReduxStore = {
  getState: () => RootState;
  dispatch: AppDispatch;
};
