import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

var loginToken = Cookies.get("user_login");

// const initialState = {
//   userLogin: loginToken ?? 0,
// };

// export const userSlice = createSlice({
//   name: "login",
//   initialState,
//   reducers: {
//     Login_register: (state, action) => {
//       state.userLogin = action.payload;
//     },
//     logout: (state) => {
//       state.userLogin = 0;
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { Login_register, logout } = userSlice.actions;

// export default userSlice.reducer;

const loginSlice = createSlice({
  name: "login",

  initialState: {
    userLogin: 0,
  },

  reducers: {
    Login_register: (state, action) => {
      state.userLogin = action.payload;
    },

    logout: (state) => {
      state.userLogin = 0;
    },
  },
});

export const { Login_register, logout } = loginSlice.actions;

export default loginSlice.reducer;