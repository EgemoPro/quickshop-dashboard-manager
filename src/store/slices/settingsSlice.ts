
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  currency: string;
  currencySymbol: string;
  language: string;
  theme: string;
  paymentMethods: {
    stripe: boolean;
    paypal: boolean;
    creditCard: boolean;
    bankTransfer: boolean;
    cashOnDelivery: boolean;
  };
  emailTemplates: {
    invoice: string;
    orderConfirmation: string;
    shipping: string;
  };
}

const initialState: SettingsState = {
  currency: "EUR",
  currencySymbol: "€",
  language: "fr",
  theme: "light",
  paymentMethods: {
    stripe: true,
    paypal: true,
    creditCard: true,
    bankTransfer: false,
    cashOnDelivery: false,
  },
  emailTemplates: {
    invoice: "<p>Facture par défaut</p><p>Merci pour votre achat chez {'{{storeName}}'}.</p><p>Numéro de commande: {'{{orderNumber}}'}</p><p>Montant total: {'{{totalAmount}}'} {'{{currency}}'}</p>",
    orderConfirmation: "<p>Confirmation de commande par défaut</p><p>Votre commande a été confirmée.</p>",
    shipping: "<p>Notification d'expédition par défaut</p><p>Votre commande a été expédiée.</p>",
  },
};

// Map of currency codes to symbols
const currencySymbols: Record<string, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  CAD: "C$",
  XOF: "CFA",
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
    togglePaymentMethod: (state, action: PayloadAction<keyof SettingsState["paymentMethods"]>) => {
      state.paymentMethods[action.payload] = !state.paymentMethods[action.payload];
    },
    updateEmailTemplate: (state, action: PayloadAction<{ template: keyof SettingsState["emailTemplates"], content: string }>) => {
      state.emailTemplates[action.payload.template] = action.payload.content;
    },
  },
});

export const { 
  setCurrency, 
  setLanguage, 
  setTheme, 
  updateSettings, 
  togglePaymentMethod, 
  updateEmailTemplate 
} = settingsSlice.actions;

export default settingsSlice.reducer;
