import { createSlice } from "@reduxjs/toolkit";

// Getting user from localstorage
const user = JSON.parse(localStorage.getItem("authUser"));

const initialState = {
  user: user ? user : null,
  userAuthenticated: user ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.user = action.payload.user;
      state.userAuthenticated = action.payload.userAuthenticated;
    },
    setLogoutUser: (state) => initialState,
  },
});

export const { setActiveUser, setLogoutUser } = authSlice.actions;

// current selected user
export const selectedUser = (state) => state.auth;

export default authSlice.reducer;