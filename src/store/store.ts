
import { configureStore } from "@reduxjs/toolkit";
import statsReducer from "./slices/statsSlice";
import salesReducer from "./slices/salesSlice";
import ordersReducer from "./slices/ordersSlice";
import productsReducer from "./slices/productsSlice";
import messagesReducer from "./slices/messagesSlice";
import planningReducer from "./slices/planningSlice";
import settingsReducer from "./slices/settingsSlice";
import authReducer from "./slices/authSlice";
import marketingReducer from "./slices/marketingSlice";
import shippingReducer from "./slices/shippingSlice";
import paymentReducer from "./slices/paymentSlice";

export const store = configureStore({
  reducer: {
    stats: statsReducer,
    sales: salesReducer,
    orders: ordersReducer,
    products: productsReducer,
    messages: messagesReducer,
    planning: planningReducer,
    settings: settingsReducer,
    auth: authReducer,
    marketing: marketingReducer,
    shipping: shippingReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
