
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
  isLoading: boolean;
  error: string | null;
}

const initialState: StatsState = {
  totalSales: "12 478€",
  salesGrowth: "+12.5%",
  newCustomers: "76",
  customerGrowth: "+5.2%",
  pendingOrders: "23",
  orderGrowth: "+8.9%",
  avgOrderValue: "124€",
  valueGrowth: "+3.7%",
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
  },
});

export const { setStats, setLoading, setError } = statsSlice.actions;
export default statsSlice.reducer;
