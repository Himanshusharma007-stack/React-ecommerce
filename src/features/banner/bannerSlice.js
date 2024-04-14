import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    toggleBanner: (state) => {
      state.value = true;
      setTimeout(() => {
        state.value = false;
      }, 100);
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleBanner } = bannerSlice.actions;

export default bannerSlice.reducer;
