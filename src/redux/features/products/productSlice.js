import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  advanceSearch: false,
  loading: false,
  products: null,
  categories: "",
};
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      // setting the state of loading
      state.loading = action.payload;
    },
    loadTableData: (state, action) => {
      // setting to the initial state
      if (action.payload) {
        let data = action.payload.map((item, index) => ({
          ...item,
          key: parseInt(item.product_id),
        }));
        state.products = data;
      }
    },
    handleAdvanceSearchModal: (state, action) => {
      switch (action.payload) {
        case "open":
          state.advanceSearch = true;
          break;
        case "close":
          state.advanceSearch = false;
          break;
      }
    },
    setSelectedProductId: (state, action) => {
      state.selectedProductId = action.payload;
    },
    saveCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

//Action Creators are generated for each case reducer function
export const {
  loadTableData,
  handleAdvanceSearchModal,
  setLoading,
  setSelectedProductId,
  saveCategories,
} = productSlice.actions;
export default productSlice.reducer;
