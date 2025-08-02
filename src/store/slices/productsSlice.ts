import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../lib/axios";
import {
  type Product,
  type Category,
  type ProductImage,
  type ProductsState,
  productsApiRequestHandlerType
} from "../../types/productSlicesTypes"
import { handleRequest } from "@/utils/handleRequest";



export const productsApiRequestHandler = createAsyncThunk(
  "products/productsApiRequestHandler",
  async ({ limit = 10, page = 1 }: productsApiRequestHandlerType,
    { rejectWithValue }) => {
    try {
      const response = await handleRequest(() =>
        api.get("/products", {
          params: { page, limit },
        })
      );

      const { products } = response.data.payload;

      return products.map(p => {
        const { title: name, _id: id, price, ...reste } = p;
        return {
          name,
          id,
          price: JSON.stringify(price),
          ...reste
        }
      }) as Product[];
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);
//Partial<FormDataEntryValue>
// Ajouter un produit
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct:any , { rejectWithValue }) => {
    const {
      name: title,
      id,
      ...reste
    } = newProduct;
    try {
      // sku: `id-${Math.ceil(Math.random()*1000).toString().padStart(4,'0')}`,
      // const data = {}
      const response = await handleRequest(() =>
        api.post("/products/new", {
          title,
          ...reste
        })
      );
      return response.data
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Échec ajout produit");
    }
  }
);


export const deleteProductAsync = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await handleRequest(() =>
        api.delete(`/products/${productId}`)
      );
      // On suppose que la réponse contient l'id supprimé dans payload._id
      const { _id: id } = response.data.payload;
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Échec suppression produit");
    }
  }
);


const generateProductPerformance = () => {
  const categories = ['Vêtements', 'Électronique', 'Maison', 'Sports', 'Beauté'];
  return categories.map(category => ({
    name: category,
    value: Math.floor(Math.random() * 90) + 10,
  }));
};

const initialState: ProductsState = {
  lowStockProducts: [], //generateLowStockProducts(),
  productPerformance: generateProductPerformance(),
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
    setLowStockProducts: (state, action: PayloadAction<Product[]>) => {
      state.lowStockProducts = action.payload;
    },
    // addProduct: (state, action: PayloadAction<Product>) => {
    //   state.lowStockProducts.push(action.payload);
    // },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.lowStockProducts.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.lowStockProducts[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.lowStockProducts = state.lowStockProducts.filter(p => p.id !== action.payload);
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
    addProductImage: (state, action: PayloadAction<{ productId: string; image: ProductImage }>) => {
      const { productId, image } = action.payload;
      const product = state.lowStockProducts.find(p => p.id === productId);
      if (product) {
        product.images.push(image);
      }
    },
    removeProductImage: (state, action: PayloadAction<{ productId: string; imageId: string }>) => {
      const { productId, imageId } = action.payload;
      const product = state.lowStockProducts.find(p => p.id === productId);
      if (product) {
        product.images = product.images.filter(img => img.id !== imageId);
      }
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(cat => cat.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productsApiRequestHandler.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(productsApiRequestHandler.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lowStockProducts = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(productsApiRequestHandler.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || "Échec de la récupération des produits";
      })
      // Add case for addProductAsync
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.lowStockProducts.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add case for deleteProductAsync
      .addCase(deleteProductAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lowStockProducts = state.lowStockProducts.filter(p => p.id !== action.payload);
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  },
});

export const {
  setLowStockProducts,
  updateProduct,
  deleteProduct,
  updateProductStock,
  setProductPerformance,
  addProductImage,
  removeProductImage,
  addCategory,
  removeCategory,
  setLoading,
  setError
} = productsSlice.actions;

export default productsSlice.reducer;
