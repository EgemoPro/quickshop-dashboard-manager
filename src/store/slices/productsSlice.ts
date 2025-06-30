
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../lib/axios";

export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductSize {
  name: string;
  dimensions?: string;
}

export interface Product {
  _id?: string;
  sku: string;
  title: string;
  description: string;
  brand?: string;
  price: number;
  stock: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  images: ProductImage[];
  category: string;
  tags: string[];
  available: boolean;
  colors: string[];
  sizes: ProductSize[];
  dimensions?: string;
  weight?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
}

interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  categories: Category[];
  availabilityZones: Array<{ id: string; name: string }>;
  isLoading: boolean;
  error: string | null;
}

// Async thunks for API calls
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/products/");
      return response.data as Product[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch products"
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data as Product;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch product"
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const response = await api.post("/products/new", productData);
      return response.data as Product;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to create product"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }: { id: string; productData: Partial<Product> }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/products/update/${id}`, productData);
      return response.data as Product;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to update product"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/products/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to delete product"
      );
    }
  }
);

const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  categories: [
    { id: '1', name: 'Vêtements' },
    { id: '2', name: 'Électronique' },
    { id: '3', name: 'Maison' },
    { id: '4', name: 'Sports' },
    { id: '5', name: 'Beauté' },
  ],
  availabilityZones: [
    { id: 'everywhere', name: 'Partout' },
    { id: 'europe', name: 'Europe' },
    { id: 'northamerica', name: 'Amérique du Nord' },
    { id: 'southamerica', name: 'Amérique du Sud' },
    { id: 'asia', name: 'Asie' },
    { id: 'africa', name: 'Afrique' },
    { id: 'oceania', name: 'Océanie' },
    { id: 'france', name: 'France uniquement' },
  ],
  isLoading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentProduct: (state, action: PayloadAction<Product | null>) => {
      state.currentProduct = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(cat => cat.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // Fetch all products
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

    // Fetch product by ID
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

    // Create product
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

    // Update product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        if (state.currentProduct?._id === action.payload._id) {
          state.currentProduct = action.payload;
        }
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

    // Delete product
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter(p => p._id !== action.payload);
        if (state.currentProduct?._id === action.payload) {
          state.currentProduct = null;
        }
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

// Selectors
export const selectLowStockProducts = (state: { products: ProductsState }) => 
  state.products.products.filter(product => product.stock <= 10);

export const selectProductPerformance = (state: { products: ProductsState }) => {
  // Mock data for now - in real app this would be calculated from sales data
  return [
    { name: 'Électronique', value: 40, color: '#8b5cf6' },
    { name: 'Mode', value: 25, color: '#3b82f6' },
    { name: 'Maison', value: 20, color: '#10b981' },
    { name: 'Sports', value: 15, color: '#f59e0b' },
  ];
};

export const { 
  clearError,
  setCurrentProduct,
  addCategory,
  removeCategory,
} = productsSlice.actions;

export default productsSlice.reducer;
