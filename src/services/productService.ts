
import api from "../lib/axios";
import { Product } from "../store/slices/productsSlice";

export const productService = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get("/products/");
    return response.data;
  },

  // Get product by ID
  getProductById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Create new product
  createProduct: async (productData: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    const response = await api.post("/products/new", productData);
    return response.data;
  },

  // Update product
  updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
    const response = await api.put(`/products/update/${id}`, productData);
    return response.data;
  },

  // Delete product
  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};

export default productService;
