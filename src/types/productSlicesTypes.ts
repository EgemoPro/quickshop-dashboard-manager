
export interface ProductImage {
  id?: string;
  url: string;
  alt?: string;
}

export interface ProductSize {
  name: string;
  dimensions?: string;
}

export interface Product {
  id: string;
  storeId?:string;
  sku: string;
  name: string;
  description: string;
  brand?: string;
  price: number;
  stock: number;
  originalPrice?: number;
  reviews?: number;
  images: ProductImage[];
  category: string;
  tags: string[];
  available: boolean;
  colors: string[];
  sizes: ProductSize[];
  dimensions?: string;
  weight?: string;
  availabilityZone?: string;
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
