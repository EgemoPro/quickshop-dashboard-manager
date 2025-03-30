
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SalesDataPoint {
  name: string;
  ventes: number;
  revenus: number;
}

interface SalesState {
  salesData: SalesDataPoint[];
  period: "week" | "month" | "year";
  isLoading: boolean;
  error: string | null;
}

const generateSalesData = (period: "week" | "month" | "year") => {
  if (period === "week") {
    return [
      { name: "Lun", ventes: 1200, revenus: 2400 },
      { name: "Mar", ventes: 1800, revenus: 3600 },
      { name: "Mer", ventes: 1400, revenus: 2800 },
      { name: "Jeu", ventes: 2000, revenus: 4000 },
      { name: "Ven", ventes: 2200, revenus: 4400 },
      { name: "Sam", ventes: 1800, revenus: 3600 },
      { name: "Dim", ventes: 1200, revenus: 2400 },
    ];
  } else if (period === "month") {
    return Array.from({ length: 30 }, (_, i) => ({
      name: `${i + 1}`,
      ventes: Math.floor(Math.random() * 2000) + 500,
      revenus: Math.floor(Math.random() * 4000) + 1000,
    }));
  } else {
    return Array.from({ length: 12 }, (_, i) => {
      const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
      return {
        name: months[i],
        ventes: Math.floor(Math.random() * 20000) + 5000,
        revenus: Math.floor(Math.random() * 40000) + 10000,
      };
    });
  }
};

const initialState: SalesState = {
  salesData: generateSalesData("week"),
  period: "week",
  isLoading: false,
  error: null,
};

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setSalesData: (state, action: PayloadAction<SalesDataPoint[]>) => {
      state.salesData = action.payload;
    },
    setPeriod: (state, action: PayloadAction<"week" | "month" | "year">) => {
      state.period = action.payload;
      state.salesData = generateSalesData(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSalesData, setPeriod, setLoading, setError } = salesSlice.actions;
export default salesSlice.reducer;
