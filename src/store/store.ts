
import { configureStore } from "@reduxjs/toolkit";
import statsReducer from "./slices/statsSlice";
import salesReducer from "./slices/salesSlice";
import ordersReducer from "./slices/ordersSlice";
import productsReducer from "./slices/productsSlice";
import messagesReducer from "./slices/messagesSlice";

export const store = configureStore({
  reducer: {
    stats: statsReducer,
    sales: salesReducer,
    orders: ordersReducer,
    products: productsReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
