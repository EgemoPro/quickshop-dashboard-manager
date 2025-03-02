
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
  role: "admin" | "vendor" | "customer";
  storeInfo?: {
    name: string;
    logo?: string;
    createdAt: string;
    verified: boolean;
  };
  preferences?: {
    darkMode: boolean;
    notifications: boolean;
    language: string;
  };
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: true, // Pour faciliter le développement, en production ce serait false
  user: {
    id: "v-12345",
    username: "quickshop_vendor",
    email: "vendor@quickshop.com",
    fullName: "Jean Dupont",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=quickshop",
    role: "vendor",
    storeInfo: {
      name: "Boutique QuickShop",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=QS",
      createdAt: "2023-04-15",
      verified: true,
    },
    preferences: {
      darkMode: false,
      notifications: true,
      language: "fr",
    },
  },
  token: "sample-jwt-token",
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: UserData; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    updateUserInfo: (state, action: PayloadAction<Partial<UserData>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    updateStoreInfo: (state, action: PayloadAction<Partial<UserData["storeInfo"]>>) => {
      if (state.user && state.user.storeInfo) {
        state.user.storeInfo = { ...state.user.storeInfo, ...action.payload };
      }
    },
    updatePreferences: (state, action: PayloadAction<Partial<UserData["preferences"]>>) => {
      if (state.user && state.user.preferences) {
        state.user.preferences = { ...state.user.preferences, ...action.payload };
      }
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      if (state.user && state.user.preferences) {
        state.user.preferences.darkMode = action.payload;
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUserInfo,
  updateStoreInfo,
  updatePreferences,
  setDarkMode,
} = authSlice.actions;

export default authSlice.reducer;
