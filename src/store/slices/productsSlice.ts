
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  name: string;
  stock: number;
  category: string;
  price: string;
}

interface ProductsState {
  lowStockProducts: Product[];
  productPerformance: Array<{ name: string; value: number }>;
  isLoading: boolean;
  error: string | null;
}

const generateLowStockProducts = (): Product[] => {
  const categories = ["Vêtements", "Électronique", "Maison", "Sports", "Beauté"];
  const products = [
    "T-shirt Premium", "Jean Classique", "Chaussures de Sport", "Montre Connectée", 
    "Enceinte Bluetooth", "Lampe de Bureau", "Tapis de Yoga", "Crème Hydratante"
  ];
  
  return Array.from({ length: 4 }, (_, i) => {
    const id = `PRD-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
    return {
      id,
      name: products[Math.floor(Math.random() * products.length)],
      stock: Math.floor(Math.random() * 10) + 1,
      category: categories[Math.floor(Math.random() * categories.length)],
      price: `${(Math.random() * 190 + 10).toFixed(2)}€`,
    };
  });
};

const generateProductPerformance = () => {
  const categories = ['Vêtements', 'Électronique', 'Maison', 'Sports', 'Beauté'];
  return categories.map(category => ({
    name: category,
    value: Math.floor(Math.random() * 90) + 10,
  }));
};

const initialState: ProductsState = {
  lowStockProducts: generateLowStockProducts(),
  productPerformance: generateProductPerformance(),
  isLoading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLowStockProducts: (state, action: PayloadAction<Product[]>) => {
      state.lowStockProducts = action.payload;
    },
    updateProductStock: (state, action: PayloadAction<{ id: string; stock: number }>) => {
      const { id, stock } = action.payload;
      const product = state.lowStockProducts.find(product => product.id === id);
      if (product) {
        product.stock = stock;
      }
    },
    setProductPerformance: (state, action: PayloadAction<Array<{ name: string; value: number }>>) => {
      state.productPerformance = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setLowStockProducts, updateProductStock, setProductPerformance, setLoading, setError } = productsSlice.actions;
export default productsSlice.reducer;
