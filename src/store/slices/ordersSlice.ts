
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Order {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: "Livrée" | "En cours" | "En attente" | "Annulée";
  products: number;
}

interface OrdersState {
  recentOrders: Order[];
  isLoading: boolean;
  error: string | null;
}

const generateRandomOrders = (): Order[] => {
  return Array.from({ length: 6 }, (_, i) => {
    const id = `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    const names = ["Jean Dupont", "Marie Martin", "Pierre Durand", "Sophie Dubois", "Thomas Bernard", "Julie Petit"];
    const statuses: Array<"Livrée" | "En cours" | "En attente" | "Annulée"> = ["Livrée", "En cours", "En attente", "Annulée"];
    
    // Generate a random date within the past 5 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 5));
    
    return {
      id,
      customer: names[Math.floor(Math.random() * names.length)],
      date: date.toLocaleDateString(),
      amount: `${(Math.random() * 450 + 50).toFixed(2)}€`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      products: Math.floor(Math.random() * 5) + 1,
    };
  });
};

const initialState: OrdersState = {
  recentOrders: generateRandomOrders(),
  isLoading: false,
  error: null,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.recentOrders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.recentOrders.unshift(action.payload);
      state.recentOrders = state.recentOrders.slice(0, 6); // Keep only 6 most recent
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: "Livrée" | "En cours" | "En attente" | "Annulée" }>) => {
      const { id, status } = action.payload;
      const order = state.recentOrders.find(order => order.id === id);
      if (order) {
        order.status = status;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setOrders, addOrder, updateOrderStatus, setLoading, setError } = ordersSlice.actions;
export default ordersSlice.reducer;
