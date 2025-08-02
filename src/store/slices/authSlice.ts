import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../lib/axios";
import { AppDispatch } from "../store";

const JWT_TOKEN: string = "jwt"

export interface UserPreferences {
  darkMode: boolean;
  notifications: boolean;
  language: string;
}

export interface StoreInfo {
  address: string;
  website: string;
  contactEmail: string;
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
  bio?: string;
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
  user: null,
  token: localStorage.getItem(JWT_TOKEN),
  isAuthenticated: !!localStorage.getItem(JWT_TOKEN),
  isLoading: false,
  error: null,
};


// const initialState: AuthState = {
//   user: {
//     id: "user-001",
//     fullName: "Eliezer Denis Gaston",
//     email: "eliezerodjo@gmail.com",
//     phone: "0022788783406",
//     avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
//     bio: "Entrepreneur passionné par le commerce en ligne et les produits artisanaux de qualité.",
//     role: "vendor",
//     preferences: {
//       darkMode: false,
//       notifications: true,
//       language: "fr",
//     },
//     storeInfo: {
//       id: "store-001",
//       name: "NeoArt",
//       description: "Une boutique spécialisée dans les produits artisanaux de qualité.",
//       logo: "https://api.dicebear.com/7.x/initials/svg?seed=BD",
//       banner: "https://placehold.co/1200x300/e2e8f0/1e293b?text=Bannière+Neo+Art",
//       verified: true,
//       createdAt: "2022-03-15T10:30:00Z",
//     },
//   },
//   token: "fake-jwt-token",
//   isAuthenticated: true,
//   isLoading: false,
//   error: null,
// };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    authSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    authFailure: (state, action: PayloadAction<string>) => {
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
      localStorage.removeItem(JWT_TOKEN);
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
  authRequest,
  authSuccess,
  authFailure,
  logout,
  updateUser,
  updateStoreInfo,
  updatePreferences,
  clearError
} = authSlice.actions;

export default authSlice.reducer;

/**
 * **Actions asynchrones**
 */

// Login
interface authCredentials {
  email: string;
  password: string;
}

const utils = {
  preferences: {
    darkMode: false,
    notifications: true,
    language: "fr",
  },
  storeInfo: {
    id: "store-001",
    name: "NeoArt",
    description: "Une boutique spécialisée dans les produits artisanaux de qualité.",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=BD",
    banner: "https://placehold.co/1200x300/e2e8f0/1e293b?text=Bannière+Neo+Art",
    verified: false,
    createdAt: "2022-03-15T10:30:00Z",
  }
}
export const login = (credentials: authCredentials) => async (dispatch: AppDispatch) => {
  dispatch(authRequest());

  try {
    console.table(credentials)
    const response = await api.post("/auth/store/login", credentials);
    const { token, payload: {_id: id, fullname:fullName, ...user} } = response.data;

    dispatch(authSuccess({ user : {id, fullName, ...user, ...utils}, token }));
    localStorage.setItem(JWT_TOKEN, token);
    return true;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || "Erreur de connexion";
    dispatch(authFailure(errorMessage));
    return false;
  }
};

// Register
interface registerCredentials {
  fullname: string;
  username?: string;
  email: string;
  password: string;
  // role: string 
}
export const registerUser = (userData: registerCredentials) => async (dispatch: AppDispatch) => {
  dispatch(authRequest());
  try {
    const response = await api.post("/auth/store/register", userData);
    const { token, payload: {_id: id, fullname:fullName, ...user} } = response.data;

    console.log(token, {id, user})
    localStorage.setItem(JWT_TOKEN, token);
    dispatch(authSuccess({ user : {id, fullName, ...user, ...utils}, token }));
    return true;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || "Erreur de connexion";
    dispatch(authFailure(errorMessage));
    return false;
  }
};

// Vérification d'authentification
export const checkAuth = () => async (dispatch: AppDispatch) => {
  const token = localStorage.getItem(JWT_TOKEN);
  if (!token) {
    dispatch(logout());
    return false;
  }

  try {
    const response = await api.get("/auth/store/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const {
      token: newToken,
      payload :{
        _id: id, 
        fullname:fullName, 
        ...user
      }
    } = response.data

    dispatch(authSuccess({ user : {id, fullName, ...user, ...utils}, token: newToken }));
    localStorage.setItem(JWT_TOKEN, token);
    console.log("response data",response.data)
    return true;
  } catch (error) {
    localStorage.removeItem(JWT_TOKEN);
    const errorMessage = error.response?.data?.message || error.message || "Erreur de connexion";
    dispatch(authFailure(errorMessage));
    return false;
  }
};

// Mise à jour des informations utilisateur
export const updateUserInfo = (userData: Partial<User>) => async (dispatch: AppDispatch, getState: any) => {
  const { token } = getState().auth;
  if (!token) return false;

  try {
    const response = await api.put("/store/update", userData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(updateUser(response.data));
    return true;
  } catch (error: any) {
    dispatch(authFailure(error.response?.data?.message || "Erreur de mise à jour"));
    return false;
  }
};

// Mise à jour des informations de la boutique
export const updateStoreInformation = (storeData: Partial<StoreInfo>) => async (dispatch: AppDispatch, getState: any) => {
  const { token } = getState().auth;
  if (!token) return false;

  try {
    const response = await api.put("/store/update", storeData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(updateStoreInfo(response.data));
    return true;
  } catch (error: any) {
    dispatch(authFailure(error.response?.data?.message || "Erreur de mise à jour"));
    return false;
  }
};

// Mise à jour des préférences utilisateur
export const updateUserPreferences = (preferences: Partial<UserPreferences>) => async (dispatch: AppDispatch, getState: any) => {
  const { token } = getState().auth;
  if (!token) return false;

  try {
    const response = await api.put("/auth/preferences", preferences, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(updatePreferences(response.data));
    return true;
  } catch (error: any) {
    dispatch(authFailure(error.response?.data?.message || "Erreur de mise à jour"));
    return false;
  }
};
