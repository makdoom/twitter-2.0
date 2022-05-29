import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  userEmail: null,
  userImage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userImage = action.payload.userImage;
    },
    setLogoutUser: (state) => initialState,
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
