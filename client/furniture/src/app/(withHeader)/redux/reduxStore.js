import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./loginSlice";
import cartSlice from "./cartSlice";

export const store = configureStore({
  reducer: {
    login: userSlice,
    cartStore: cartSlice,
  },
});
