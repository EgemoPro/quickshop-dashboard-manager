
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SEOSettings {
  keywords: string[];
  metaDescription: string;
  sitemap: boolean;
  socialSharing: boolean;
  canonicalUrls: boolean;
  structuredData: boolean;
}

export interface StoreStrategy {
  targetAudience: string;
  competitiveAdvantage: string;
  marketPosition: string;
  growthPlans: string;
  seoSettings: SEOSettings;
}

interface StrategyState {
  storeStrategy: StoreStrategy;
  isLoading: boolean;
  error: string | null;
}

const initialState: StrategyState = {
  storeStrategy: {
    targetAudience: "Particuliers intéressés par des produits artisanaux de qualité",
    competitiveAdvantage: "Produits faits main avec des matériaux durables",
    marketPosition: "Boutique premium avec des prix moyens à élevés",
    growthPlans: "Expansion vers le marché international dans les 2 prochaines années",
    seoSettings: {
      keywords: ["artisanal", "fait main", "écologique", "durable", "premium", "qualité"],
      metaDescription: "Boutique en ligne proposant des produits artisanaux de qualité, fabriqués à la main avec des matériaux durables et écologiques.",
      sitemap: true,
      socialSharing: true,
      canonicalUrls: true,
      structuredData: false
    }
  },
  isLoading: false,
  error: null
};

export const strategySlice = createSlice({
  name: "strategy",
  initialState,
  reducers: {
    updateStoreStrategy: (state, action: PayloadAction<Partial<StoreStrategy>>) => {
      state.storeStrategy = { ...state.storeStrategy, ...action.payload };
    },
    updateSEOSettings: (state, action: PayloadAction<Partial<SEOSettings>>) => {
      state.storeStrategy.seoSettings = { 
        ...state.storeStrategy.seoSettings, 
        ...action.payload 
      };
    },
    addKeyword: (state, action: PayloadAction<string>) => {
      if (!state.storeStrategy.seoSettings.keywords.includes(action.payload)) {
        state.storeStrategy.seoSettings.keywords.push(action.payload);
      }
    },
    removeKeyword: (state, action: PayloadAction<string>) => {
      state.storeStrategy.seoSettings.keywords = state.storeStrategy.seoSettings.keywords.filter(
        keyword => keyword !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { 
  updateStoreStrategy, 
  updateSEOSettings, 
  addKeyword, 
  removeKeyword,
  setLoading,
  setError
} = strategySlice.actions;

export default strategySlice.reducer;
