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
  storeConfig: {
    name: string;
    description: string;
    logo: string;
    banner: string;
    socialLinks: {
      facebook: string;
      instagram: string;
      tiktok: string;
      twitter: string;
    };
  };
  employeeRoles: Array<{
    id: string;
    name: string;
    permissions: {
      products: boolean;
      orders: boolean;
      customers: boolean;
      marketing: boolean;
      analytics: boolean;
      settings: boolean;
    };
  }>;
  integrations: {
    crm: {
      enabled: boolean;
      provider: string;
      apiKey: string;
    };
    erp: {
      enabled: boolean;
      provider: string;
      apiKey: string;
    };
    marketingTools: {
      enabled: boolean;
      provider: string;
      apiKey: string;
    };
  };
}

const initialState: SettingsState = {
  currency: "XOF",
  currencySymbol: "FCFA",
  language: "fr",
  theme: "light",
  paymentMethods: {
    stripe: false,
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
  storeConfig: {
    name: "Boutique QuickShop",
    description: "Votre destination préférée pour les produits de qualité",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=QS",
    banner: "https://placehold.co/1200x300/e2e8f0/1e293b?text=Bannière+Boutique",
    socialLinks: {
      facebook: "https://facebook.com/quickshop",
      instagram: "https://instagram.com/quickshop",
      tiktok: "https://tiktok.com/@quickshop",
      twitter: "https://twitter.com/quickshop",
    },
  },
  employeeRoles: [
    {
      id: "role-001",
      name: "Administrateur",
      permissions: {
        products: true,
        orders: true,
        customers: true,
        marketing: true,
        analytics: true,
        settings: true,
      },
    },
    {
      id: "role-002",
      name: "Responsable des ventes",
      permissions: {
        products: true,
        orders: true,
        customers: true,
        marketing: false,
        analytics: true,
        settings: false,
      },
    },
    {
      id: "role-003",
      name: "Support client",
      permissions: {
        products: true,
        orders: true,
        customers: true,
        marketing: false,
        analytics: false,
        settings: false,
      },
    },
  ],
  integrations: {
    crm: {
      enabled: false,
      provider: "",
      apiKey: "",
    },
    erp: {
      enabled: false,
      provider: "",
      apiKey: "",
    },
    marketingTools: {
      enabled: false,
      provider: "",
      apiKey: "",
    },
  },
};

// Map of currency codes to symbols
const currencySymbols: Record<string, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  CAD: "C$",
  XOF: "FCFA",
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
    updateStoreConfig: (state, action: PayloadAction<Partial<SettingsState["storeConfig"]>>) => {
      state.storeConfig = { ...state.storeConfig, ...action.payload };
    },
    updateSocialLinks: (state, action: PayloadAction<Partial<SettingsState["storeConfig"]["socialLinks"]>>) => {
      state.storeConfig.socialLinks = { ...state.storeConfig.socialLinks, ...action.payload };
    },
    addEmployeeRole: (state, action: PayloadAction<{
      name: string;
      permissions: {
        products: boolean;
        orders: boolean;
        customers: boolean;
        marketing: boolean;
        analytics: boolean;
        settings: boolean;
      };
    }>) => {
      const newRoleId = `role-${state.employeeRoles.length + 1}`.padStart(7, '0');
      state.employeeRoles.push({
        id: newRoleId,
        name: action.payload.name,
        permissions: action.payload.permissions,
      });
    },
    updateEmployeeRole: (state, action: PayloadAction<{
      id: string;
      name?: string;
      permissions?: Partial<{
        products: boolean;
        orders: boolean;
        customers: boolean;
        marketing: boolean;
        analytics: boolean;
        settings: boolean;
      }>;
    }>) => {
      const roleIndex = state.employeeRoles.findIndex(role => role.id === action.payload.id);
      if (roleIndex !== -1) {
        if (action.payload.name) {
          state.employeeRoles[roleIndex].name = action.payload.name;
        }
        if (action.payload.permissions) {
          state.employeeRoles[roleIndex].permissions = {
            ...state.employeeRoles[roleIndex].permissions,
            ...action.payload.permissions,
          };
        }
      }
    },
    deleteEmployeeRole: (state, action: PayloadAction<string>) => {
      state.employeeRoles = state.employeeRoles.filter(role => role.id !== action.payload);
    },
    updateIntegration: (state, action: PayloadAction<{
      type: keyof SettingsState["integrations"];
      data: Partial<{
        enabled: boolean;
        provider: string;
        apiKey: string;
      }>;
    }>) => {
      const { type, data } = action.payload;
      state.integrations[type] = {
        ...state.integrations[type],
        ...data,
      };
    },
  },
});

export const { 
  setCurrency, 
  setLanguage, 
  setTheme, 
  updateSettings, 
  togglePaymentMethod, 
  updateEmailTemplate,
  updateStoreConfig,
  updateSocialLinks,
  addEmployeeRole,
  updateEmployeeRole,
  deleteEmployeeRole,
  updateIntegration
} = settingsSlice.actions;

export default settingsSlice.reducer;
