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
  availabilityZone?: string;
  sku ?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface ProductsState {
  lowStockProducts: Product[];
  productPerformance: Array<{ name: string; value: number }>;
  categories: Category[];
  availabilityZones: Array<{ id: string; name: string }>;
  isLoading: boolean;
  error: string | null;
}

export interface productsApiRequestHandlerType{
    limit?: number;
    page?: number;
  }
