import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/products/productSlice";
import orderSlice from "./features/orders/orderSlice";
import orderStatusSlice from "./features/status/statusSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    order: orderSlice,
    orderStatus: orderStatusSlice,
  },
});
