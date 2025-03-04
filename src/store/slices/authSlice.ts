
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserPreferences {
  darkMode: boolean;
  notifications: boolean;
  language: string;
}

export interface StoreInfo {
  id: string;
  name: string;
  description?: string;
  logo: string;
  banner?: string;
  verified: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatar: string;
  role: "admin" | "vendor" | "customer";
  preferences?: UserPreferences;
  storeInfo?: StoreInfo;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: {
    id: "user-001",
    fullName: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "+33123456789",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    role: "vendor",
    preferences: {
      darkMode: false,
      notifications: true,
      language: "fr",
    },
    storeInfo: {
      id: "store-001",
      name: "Boutique de Jean",
      description: "Une boutique spécialisée dans les produits artisanaux de qualité.",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=BD",
      banner: "https://placehold.co/1200x300/e2e8f0/1e293b?text=Bannière+Boutique+de+Jean",
      verified: true,
      createdAt: "2022-03-15T10:30:00Z",
    },
  },
  token: "fake-jwt-token",
  isAuthenticated: true,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    updateStoreInfo: (state, action: PayloadAction<Partial<StoreInfo>>) => {
      if (state.user && state.user.storeInfo) {
        state.user.storeInfo = { ...state.user.storeInfo, ...action.payload };
      }
    },
    updatePreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      if (state.user) {
        state.user.preferences = { 
          ...state.user.preferences as UserPreferences,
          ...action.payload 
        };
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { 
  loginRequest, 
  loginSuccess, 
  loginFailure, 
  logout, 
  updateUser,
  updateStoreInfo,
  updatePreferences,
  clearError 
} = authSlice.actions;

export default authSlice.reducer;
