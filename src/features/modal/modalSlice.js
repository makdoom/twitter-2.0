import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postId: null,
  isModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.postId = action.payload;
      state.isModalOpen = true;
    },
    setModalClose: (state) => initialState,
  },
});

export const { setModalClose, setModalOpen } = modalSlice.actions;

export const selectedModal = (state) => state.modal;

export default modalSlice.reducer;
