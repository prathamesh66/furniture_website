import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const loginToken = Cookies.get("user_login");

const loginSlice = createSlice({
  name: "login",

  initialState: {
    userLogin: loginToken ? 1 : 0,
  },

  reducers: {
    Login_register: (state, action) => {
      state.userLogin = action.payload;
    },

    logout: (state) => {
      state.userLogin = 0;
      Cookies.remove("user_login");
    },
  },
});

export const { Login_register, logout } = loginSlice.actions;

export default loginSlice.reducer;
