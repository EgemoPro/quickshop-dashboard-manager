import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PromoCode {
  id: string;
  code: string;
  discountType: "percentage" | "fixed" | "freeShipping";
  discountValue: number;
  minPurchase: number;
  startDate: string;
  endDate: string;
  limitedUses: boolean;
  maxUses: number;
  usedCount: number;
  applicableProducts: "all" | string[];
  applicableCategories: "all" | string[];
  active: boolean;
}

interface Campaign {
  id: string;
  name: string;
  platform: "facebook" | "instagram" | "tiktok" | "google" | "email" | "sms";
  status: "draft" | "scheduled" | "active" | "completed" | "paused";
  budget: number;
  startDate: string;
  endDate: string;
  target: {
    demographics: string[];
    interests: string[];
    locations: string[];
  };
  performance: {
    impressions: number;
    clicks: number;
    conversions: number;
    cost: number;
    revenue: number;
    roi: number;
  };
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  lastEdited: string;
}

export interface MarketingState {
  promoCodes: PromoCode[];
  campaigns: Campaign[];
  emailTemplates: EmailTemplate[];
  activeCampaigns: number;
  promoCodesCount: number;
  emailSubscribers: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: MarketingState = {
  promoCodes: [
    {
      id: "promo-001",
      code: "BIENVENUE10",
      discountType: "percentage",
      discountValue: 10,
      minPurchase: 0,
      startDate: "2023-10-01",
      endDate: "2023-12-31",
      limitedUses: true,
      maxUses: 100,
      usedCount: 45,
      applicableProducts: "all",
      applicableCategories: "all",
      active: true,
    },
    {
      id: "promo-002",
      code: "FREESHIP50",
      discountType: "freeShipping",
      discountValue: 0,
      minPurchase: 50,
      startDate: "2023-11-01",
      endDate: "2023-12-15",
      limitedUses: false,
      maxUses: 0,
      usedCount: 26,
      applicableProducts: "all",
      applicableCategories: "all",
      active: true,
    }
  ],
  campaigns: [
    {
      id: "camp-001",
      name: "Promo Fêtes de Fin d'Année",
      platform: "facebook",
      status: "active",
      budget: 500,
      startDate: "2023-11-15",
      endDate: "2023-12-25",
      target: {
        demographics: ["18-35", "35-55"],
        interests: ["shopping", "technology", "gifts"],
        locations: ["Paris", "Lyon", "Marseille"],
      },
      performance: {
        impressions: 15600,
        clicks: 1250,
        conversions: 87,
        cost: 320,
        revenue: 2450,
        roi: 7.65,
      },
    }
  ],
  emailTemplates: [
    {
      id: "email-001",
      name: "Campagne de Bienvenue",
      subject: "Bienvenue chez QuickShop!",
      content: "<p>Bonjour {{prenom}},</p><p>Merci de vous être inscrit sur QuickShop! Voici un code promo pour votre première commande: <strong>BIENVENUE10</strong></p>",
      lastEdited: "2023-09-15",
    },
    {
      id: "email-002",
      name: "Notification Soldes d'Hiver",
      subject: "Les soldes d'hiver sont là!",
      content: "<p>Bonjour {{prenom}},</p><p>Les soldes d'hiver sont arrivées! Découvrez nos offres exclusives jusqu'à 70% de réduction.</p>",
      lastEdited: "2023-10-22",
    }
  ],
  activeCampaigns: 1,
  promoCodesCount: 2,
  emailSubscribers: 1248,
  isLoading: false,
  error: null,
};

export const marketingSlice = createSlice({
  name: "marketing",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    addPromoCode: (state, action: PayloadAction<Omit<PromoCode, "id" | "usedCount">>) => {
      const newId = `promo-${state.promoCodes.length + 1}`.padStart(7, '0');
      state.promoCodes.push({
        ...action.payload,
        id: newId,
        usedCount: 0,
      });
    },
    updatePromoCode: (state, action: PayloadAction<Partial<PromoCode> & { id: string }>) => {
      const index = state.promoCodes.findIndex(code => code.id === action.payload.id);
      if (index !== -1) {
        state.promoCodes[index] = {
          ...state.promoCodes[index],
          ...action.payload,
        };
      }
    },
    deletePromoCode: (state, action: PayloadAction<string>) => {
      state.promoCodes = state.promoCodes.filter(code => code.id !== action.payload);
    },
    togglePromoCodeStatus: (state, action: PayloadAction<string>) => {
      const index = state.promoCodes.findIndex(code => code.id === action.payload);
      if (index !== -1) {
        state.promoCodes[index].active = !state.promoCodes[index].active;
      }
    },
    
    addCampaign: (state, action: PayloadAction<Omit<Campaign, "id" | "performance">>) => {
      const newId = `camp-${state.campaigns.length + 1}`.padStart(7, '0');
      state.campaigns.push({
        ...action.payload,
        id: newId,
        performance: {
          impressions: 0,
          clicks: 0,
          conversions: 0,
          cost: 0,
          revenue: 0,
          roi: 0,
        },
      });
    },
    updateCampaign: (state, action: PayloadAction<Partial<Campaign> & { id: string }>) => {
      const index = state.campaigns.findIndex(campaign => campaign.id === action.payload.id);
      if (index !== -1) {
        state.campaigns[index] = {
          ...state.campaigns[index],
          ...action.payload,
        };
      }
    },
    deleteCampaign: (state, action: PayloadAction<string>) => {
      state.campaigns = state.campaigns.filter(campaign => campaign.id !== action.payload);
    },
    updateCampaignStatus: (state, action: PayloadAction<{ id: string; status: Campaign["status"] }>) => {
      const index = state.campaigns.findIndex(campaign => campaign.id === action.payload.id);
      if (index !== -1) {
        state.campaigns[index].status = action.payload.status;
      }
    },
    updateCampaignPerformance: (state, action: PayloadAction<{ id: string; performance: Partial<Campaign["performance"]> }>) => {
      const index = state.campaigns.findIndex(campaign => campaign.id === action.payload.id);
      if (index !== -1) {
        state.campaigns[index].performance = {
          ...state.campaigns[index].performance,
          ...action.payload.performance,
        };
      }
    },
    
    addEmailTemplate: (state, action: PayloadAction<Omit<EmailTemplate, "id" | "lastEdited">>) => {
      const newId = `email-${state.emailTemplates.length + 1}`.padStart(7, '0');
      state.emailTemplates.push({
        ...action.payload,
        id: newId,
        lastEdited: new Date().toISOString().split('T')[0],
      });
    },
    updateEmailTemplate: (state, action: PayloadAction<Partial<EmailTemplate> & { id: string }>) => {
      const index = state.emailTemplates.findIndex(template => template.id === action.payload.id);
      if (index !== -1) {
        state.emailTemplates[index] = {
          ...state.emailTemplates[index],
          ...action.payload,
          lastEdited: new Date().toISOString().split('T')[0],
        };
      }
    },
    deleteEmailTemplate: (state, action: PayloadAction<string>) => {
      state.emailTemplates = state.emailTemplates.filter(template => template.id !== action.payload);
    },
    
    setActiveCampaigns: (state, action: PayloadAction<number>) => {
      state.activeCampaigns = action.payload;
    },
    setPromoCodesCount: (state, action: PayloadAction<number>) => {
      state.promoCodesCount = action.payload;
    },
    setEmailSubscribers: (state, action: PayloadAction<number>) => {
      state.emailSubscribers = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  addPromoCode,
  updatePromoCode,
  deletePromoCode,
  togglePromoCodeStatus,
  addCampaign,
  updateCampaign,
  deleteCampaign,
  updateCampaignStatus,
  updateCampaignPerformance,
  addEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
  setActiveCampaigns,
  setPromoCodesCount,
  setEmailSubscribers,
} = marketingSlice.actions;

export default marketingSlice.reducer;
