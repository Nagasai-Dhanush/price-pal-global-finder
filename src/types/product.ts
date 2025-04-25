
export interface Product {
  id: string;
  name: string;
  price: number;
  shipping: number;
  taxes: number;
  image: string;
  url: string;
  platform: string;
  category?: string;
  description?: string;
  rating?: number;
  reviews?: number;
}

export interface PriceHistory {
  date: string;
  price: number;
}

export interface PriceAlert {
  id: string;
  userId: string;
  productId: string;
  targetPrice: number;
  createdAt: string;
  isActive: boolean;
}

export interface SearchFilters {
  priceRange: [number, number];
  platforms: string[];
  sortBy: 'price-asc' | 'price-desc' | 'total-asc' | 'total-desc';
}
