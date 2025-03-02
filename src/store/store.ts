
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import statsReducer from "./slices/statsSlice";
import salesReducer from "./slices/salesSlice";
import settingsReducer from "./slices/settingsSlice";
import ordersReducer from "./slices/ordersSlice";
import messagesReducer from "./slices/messagesSlice";
import authReducer from "./slices/authSlice";
import planningReducer from "./slices/planningSlice";
import marketingReducer from "./slices/marketingSlice";
import paymentReducer from "./slices/paymentSlice";
import shippingReducer from "./slices/shippingSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    stats: statsReducer,
    sales: salesReducer,
    settings: settingsReducer,
    orders: ordersReducer,
    messages: messagesReducer,
    auth: authReducer,
    planning: planningReducer,
    marketing: marketingReducer,
    payment: paymentReducer,
    shipping: shippingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
