
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StatsState {
  totalSales: string;
  salesGrowth: string;
  newCustomers: string;
  customerGrowth: string;
  pendingOrders: string;
  orderGrowth: string;
  avgOrderValue: string;
  valueGrowth: string;
  // New metrics for enhanced reporting
  topSellingProducts: Array<{id: string, name: string, sales: number}>;
  customerRetentionRate: string;
  marketingROI: string;
  conversionRate: string;
  channelPerformance: Array<{channel: string, sales: number, growth: string}>;
  isLoading: boolean;
  error: string | null;
}

const initialState: StatsState = {
  totalSales: "12478",
  salesGrowth: "+12.5%",
  newCustomers: "76",
  customerGrowth: "+5.2%",
  pendingOrders: "23",
  orderGrowth: "+8.9%",
  avgOrderValue: "124",
  valueGrowth: "+3.7%",
  // Initial values for new metrics
  topSellingProducts: [
    {id: "prod-001", name: "Smartphone Premium", sales: 124},
    {id: "prod-002", name: "Écouteurs sans fil", sales: 97},
    {id: "prod-003", name: "Montre connectée", sales: 85}
  ],
  customerRetentionRate: "67.8%",
  marketingROI: "3.2x",
  conversionRate: "2.7%",
  channelPerformance: [
    {channel: "Site Web", sales: 7845, growth: "+8.3%"},
    {channel: "Facebook", sales: 2356, growth: "+15.7%"},
    {channel: "Instagram", sales: 1892, growth: "+21.2%"},
    {channel: "TikTok", sales: 385, growth: "+47.8%"}
  ],
  isLoading: false,
  error: null,
};

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setStats: (state, action: PayloadAction<Partial<StatsState>>) => {
      return { ...state, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateTopSellingProducts: (state, action: PayloadAction<Array<{id: string, name: string, sales: number}>>) => {
      state.topSellingProducts = action.payload;
    },
    updateChannelPerformance: (state, action: PayloadAction<Array<{channel: string, sales: number, growth: string}>>) => {
      state.channelPerformance = action.payload;
    }
  },
});

export const { 
  setStats, 
  setLoading, 
  setError, 
  updateTopSellingProducts, 
  updateChannelPerformance 
} = statsSlice.actions;

export default statsSlice.reducer;
