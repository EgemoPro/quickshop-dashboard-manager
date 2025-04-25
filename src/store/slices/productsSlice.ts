import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductImage {
  id: string;
  url: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  stock: number;
  category: string;
  price: string;
  images: ProductImage[];
  description?: string;
  availabilityZone: string;
}

export interface Category {
  id: string;
  name: string;
}

interface ProductsState {
  lowStockProducts: Product[];
  productPerformance: Array<{ name: string; value: number }>;
  categories: Category[];
  availabilityZones: Array<{ id: string; name: string }>;
  isLoading: boolean;
  error: string | null;
}

const generateLowStockProducts = (): Product[] => {
  const categories = ["Vêtements", "Électronique", "Maison", "Sports", "Beauté"];
  const products = [
    "T-shirt Premium", "Jean Classique", "Chaussures de Sport", "Montre Connectée", 
    "Enceinte Bluetooth", "Lampe de Bureau", "Tapis de Yoga", "Crème Hydratante"
  ];
  
  return Array.from({ length: 8 }, (_, i) => {
    const id = `PRD-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
    return {
      id,
      name: products[Math.floor(Math.random() * products.length)],
      stock: Math.floor(Math.random() * 20),
      category: categories[Math.floor(Math.random() * categories.length)],
      price: `${(Math.random() * 190 + 10).toFixed(2)}`,
      images: [],
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
    addProduct: (state, action: PayloadAction<Product>) => {
      state.lowStockProducts.push(action.payload);
    },
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
});

export const { 
  setLowStockProducts, 
  addProduct,
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
