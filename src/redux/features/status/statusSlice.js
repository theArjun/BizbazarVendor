import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: [],
};

const orderStatusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    loadStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { loadStatus } = orderStatusSlice.actions;
export default orderStatusSlice.reducer;
