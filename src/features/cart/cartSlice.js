import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const cartSlice = createSlice({
  name: "cartArr",
  initialState,
  reducers: {
    updateArrOfItems: (state, action) => {
      let {item} = action.payload;
      let indexOfItem = state?.value?.findIndex((elem) => elem.id == item.id);
      if (indexOfItem > -1 && item.count == 0) {
        state?.value.splice(indexOfItem, 1);
      } else if (indexOfItem == -1) {
        state?.value.push(item);
      } else {
        state?.value.splice(indexOfItem, 1, item);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateArrOfItems } = cartSlice.actions;

export default cartSlice.reducer;
