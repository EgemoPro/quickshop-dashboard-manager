
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SocialMediaProfile {
  platform: string;
  url: string;
  connected: boolean;
  username?: string;
  followers?: number;
  engagement?: number;
  posts?: number;
  lastUpdated?: string;
}

export interface SEOSettings {
  socialMediaSharing: boolean;
  metaTitle: string;
  keywords: string[];
  metaDescription: string;
  sitemap: boolean;
  socialSharing: boolean;
  canonicalUrls: boolean;
  structuredData: boolean;
  openGraph?: {
    title?: string;
    description?: string;
    imageUrl?: string;
    twitterCards?: boolean;
  };
  analytics?: {
    googleAnalyticsId?: string;
    googleTagManagerId?: string;
    facebookPixelId?: string;
    heatmapEnabled?: boolean;
    conversionTracking?: boolean;
    customEvents?: Array<{name: string, trigger: string}>;
  };
  robotsTxt?: string;
  allowIndexing?: boolean;
  gzipCompression?: boolean;
  performanceMetrics?: {
    pagespeed?: number;
    loadTime?: number;
    mobileScore?: number;
    coreWebVitals?: {
      lcp?: number;  // Largest Contentful Paint
      fid?: number;  // First Input Delay
      cls?: number;  // Cumulative Layout Shift
    };
  };
  competitorAnalysis?: Array<{
    url: string;
    keywords?: string[];
    rank?: number;
    backlinks?: number;
  }>;
  contentStrategy?: {
    blogEnabled?: boolean;
    postFrequency?: string;
    topPerformingContent?: string[];
    contentCalendar?: boolean;
  };
  localSEO?: {
    enabled: boolean;
    googleMyBusiness?: string;
    localKeywords?: string[];
    locationPages?: boolean;
  };
}

export interface StoreStrategy {
  storeDescription?: string;
  storeObjectives?: string;
  targetAudience?: string;
  competitiveAdvantage?: string;
  marketPosition?: string;
  growthPlans?: string;
  socialProfiles: SocialMediaProfile[];
  seoSettings: SEOSettings;
  marketInsights?: {
    customerPersonas?: Array<{
      name: string;
      age: string;
      interests: string[];
      painPoints: string[];
      buyingBehavior: string;
    }>;
    seasonalTrends?: Array<{
      season: string;
      products: string[];
      expectedGrowth: string;
    }>;
    competitiveAnalysis?: Array<{
      competitor: string;
      strengths: string[];
      weaknesses: string[];
      marketShare: string;
    }>;
  };
  performanceIndicators?: {
    kpis?: Array<{
      name: string;
      target: number;
      current: number;
      unit: string;
    }>;
    conversionFunnels?: Array<{
      name: string;
      stages: Array<{
        name: string;
        conversionRate: number;
      }>;
    }>;
  };
}

interface StrategyState {
  storeStrategy: StoreStrategy;
  isLoading: boolean;
  error: string | null;
}

const initialState: StrategyState = {
  storeStrategy: {
    socialProfiles: [
      {
        platform: "Facebook",
        url: "https://facebook.com/neo-art",
        connected: false,
        engagement: 0,
        posts: 0,
        lastUpdated: ""
      },
      {
        platform: "Instagram",
        url: "https://instagram.com/neo-art",
        connected: false,
        engagement: 0,
        posts: 0,
        lastUpdated: ""
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/neo-art",
        connected: false,
        engagement: 0,
        posts: 0,
        lastUpdated: ""
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/company/neo-art",
        connected: false,
        engagement: 0,
        posts: 0,
        lastUpdated: ""
      },
      {
        platform: "Site Web",
        url: "https://shadow.com/shop/@neo-art",
        connected: true,
        followers: 0,
        engagement: 0,
        posts: 0,
        lastUpdated: new Date().toISOString().split('T')[0]
      }
    ],
    seoSettings: {
      metaTitle: "Shadow Shop - Artisanat Premium",
      socialMediaSharing: true,
      keywords: ["artisanal", "fait main", "écologique", "durable", "premium", "qualité"],
      metaDescription: "Boutique en ligne proposant des produits artisanaux de qualité, fabriqués à la main avec des matériaux durables et écologiques.",
      sitemap: true,
      socialSharing: true,
      canonicalUrls: true,
      structuredData: false,
      openGraph: {
        title: "",
        description: "",
        imageUrl: "",
        twitterCards: false
      },
      analytics: {
        googleAnalyticsId: "",
        googleTagManagerId: "",
        facebookPixelId: "",
        heatmapEnabled: false,
        conversionTracking: false,
        customEvents: []
      },
      robotsTxt: "User-agent: *\nAllow: /\nDisallow: /admin/",
      allowIndexing: true,
      gzipCompression: false,
      performanceMetrics: {
        pagespeed: 85,
        loadTime: 2.3,
        mobileScore: 78,
        coreWebVitals: {
          lcp: 2.5,
          fid: 100,
          cls: 0.1
        }
      },
      competitorAnalysis: [
        {
          url: "https://competitor1.com",
          keywords: ["artisanal", "fait main", "boutique"],
          rank: 12,
          backlinks: 450
        }
      ],
      contentStrategy: {
        blogEnabled: false,
        postFrequency: "hebdomadaire",
        topPerformingContent: [],
        contentCalendar: false
      },
      localSEO: {
        enabled: true,
        googleMyBusiness: "",
        localKeywords: ["artisanat paris", "boutique artisanale locale"],
        locationPages: false
      },
      socialMediaSharing: false,
      metaTitle: ""
    },
    marketInsights: {
      customerPersonas: [
        {
          name: "Marie",
          age: "30-45",
          interests: ["écologie", "artisanat", "décoration"],
          painPoints: ["difficulté à trouver des produits durables", "prix élevés"],
          buyingBehavior: "Achète régulièrement, recherche de qualité"
        }
      ],
      seasonalTrends: [
        {
          season: "Hiver",
          products: ["décorations de noël", "cadeaux artisanaux"],
          expectedGrowth: "+25%"
        }
      ],
      competitiveAnalysis: [
        {
          competitor: "ArtisanatPremium",
          strengths: ["forte présence en ligne", "large gamme de produits"],
          weaknesses: ["moins de personnalisation", "délais de livraison plus longs"],
          marketShare: "15%"
        }
      ]
    },
    performanceIndicators: {
      kpis: [
        {
          name: "Taux de conversion",
          target: 3.5,
          current: 2.7,
          unit: "%"
        },
        {
          name: "Panier moyen",
          target: 120,
          current: 98,
          unit: "€"
        }
      ],
      conversionFunnels: [
        {
          name: "Parcours d'achat principal",
          stages: [
            { name: "Visite", conversionRate: 100 },
            { name: "Consultation produit", conversionRate: 45 },
            { name: "Ajout au panier", conversionRate: 15 },
            { name: "Achat", conversionRate: 6 }
          ]
        }
      ]
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
    updateSocialProfiles: (state, action: PayloadAction<SocialMediaProfile[]>) => {
      state.storeStrategy.socialProfiles = action.payload;
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
    updateMarketInsights: (state, action: PayloadAction<Partial<StoreStrategy['marketInsights']>>) => {
      state.storeStrategy.marketInsights = { 
        ...state.storeStrategy.marketInsights, 
        ...action.payload 
      };
    },
    updatePerformanceIndicators: (state, action: PayloadAction<Partial<StoreStrategy['performanceIndicators']>>) => {
      state.storeStrategy.performanceIndicators = { 
        ...state.storeStrategy.performanceIndicators, 
        ...action.payload 
      };
    },
    addCompetitor: (state, action: PayloadAction<SEOSettings['competitorAnalysis'][0]>) => {
      if (!state.storeStrategy.seoSettings.competitorAnalysis) {
        state.storeStrategy.seoSettings.competitorAnalysis = [];
      }
      state.storeStrategy.seoSettings.competitorAnalysis.push(action.payload);
    },
    removeCompetitor: (state, action: PayloadAction<string>) => {
      if (state.storeStrategy.seoSettings.competitorAnalysis) {
        state.storeStrategy.seoSettings.competitorAnalysis = state.storeStrategy.seoSettings.competitorAnalysis.filter(
          comp => comp.url !== action.payload
        );
      }
    },
    addKPI: (state, action: PayloadAction<StoreStrategy['performanceIndicators']['kpis'][0]>) => {
      if (!state.storeStrategy.performanceIndicators) {
        state.storeStrategy.performanceIndicators = { kpis: [] };
      }
      if (!state.storeStrategy.performanceIndicators.kpis) {
        state.storeStrategy.performanceIndicators.kpis = [];
      }
      state.storeStrategy.performanceIndicators.kpis.push(action.payload);
    },
    updateKPI: (state, action: PayloadAction<{name: string, data: Partial<StoreStrategy['performanceIndicators']['kpis'][0]>}>) => {
      if (state.storeStrategy.performanceIndicators?.kpis) {
        const index = state.storeStrategy.performanceIndicators.kpis.findIndex(
          kpi => kpi.name === action.payload.name
        );
        if (index !== -1) {
          state.storeStrategy.performanceIndicators.kpis[index] = {
            ...state.storeStrategy.performanceIndicators.kpis[index],
            ...action.payload.data
          };
        }
      }
    },
    removeKPI: (state, action: PayloadAction<string>) => {
      if (state.storeStrategy.performanceIndicators?.kpis) {
        state.storeStrategy.performanceIndicators.kpis = state.storeStrategy.performanceIndicators.kpis.filter(
          kpi => kpi.name !== action.payload
        );
      }
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
  updateSocialProfiles,
  addKeyword, 
  removeKeyword,
  updateMarketInsights,
  updatePerformanceIndicators,
  addCompetitor,
  removeCompetitor,
  addKPI,
  updateKPI,
  removeKPI,
  setLoading,
  setError
} = strategySlice.actions;

export default strategySlice.reducer;
