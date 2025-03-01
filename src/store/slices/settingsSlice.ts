
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  currency: string;
  currencySymbol: string;
  language: string;
  theme: string;
}

const initialState: SettingsState = {
  currency: "EUR",
  currencySymbol: "€",
  language: "fr",
  theme: "light",
};

// Map of currency codes to symbols
const currencySymbols: Record<string, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  CAD: "C$",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
      state.currencySymbol = currencySymbols[action.payload] || action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    updateSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setCurrency, setLanguage, setTheme, updateSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
