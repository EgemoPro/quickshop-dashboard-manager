
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
import dashboardLayoutReducer from "./slices/dashboardLayoutSlice";
import strategyReducer from "./slices/strategySlice";
import followersReducer from "./slices/followersSlice";

// Custom serializer for Date objects
const dateAwareSerializer = {
  serialize: (value: any) => {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value;
  },
  deserialize: (value: any) => {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
      return new Date(value);
    }
    return value;
  }
};

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
    dashboardLayout: dashboardLayoutReducer,
    strategy: strategyReducer,
    followers: followersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ['planning/addEvent', 'planning/updateEvent', 'planning/setEvents'],
        // Ignore these field paths in the state
        ignoredActionsPaths: ['payload.start', 'payload.end'],
        ignoredPaths: ['planning.events.start', 'planning.events.end'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
