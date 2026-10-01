export interface Product {
  id: string;
  title: string;
  brand: string;
  category: 'Clothing' | 'Toys' | 'Books' | 'Baby Essentials' | 'Footwear' | 'Accessories' | 'Kids Care' | 'Nursery';
  ageGroup: '0 - 2 Years' | '3 - 5 Years' | '6 - 8 Years' | '9 - 12 Years' | '13 - 16 Years';
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: 'New' | 'Sale' | 'Bestseller';
  colors?: string[];
  sizes?: string[];
  description: string;
  inStock: boolean;
  isFastDelivery?: boolean;
}

export interface Category {
  id: string;
  name: 'Clothing' | 'Toys' | 'Books' | 'Baby Essentials' | 'Footwear' | 'Accessories' | 'Kids Care' | 'Nursery';
  image: string;
  bgColor: string;
  borderColor: string;
  itemCount: number;
}

export interface AgeGroup {
  id: string;
  label: '0 - 2 Years' | '3 - 5 Years' | '6 - 8 Years' | '9 - 12 Years' | '13 - 16 Years';
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface FilterState {
  searchQuery: string;
  selectedCategories: string[];
  selectedAgeGroups: string[];
  selectedBrands: string[];
  priceRange: [number, number];
  selectedSizes: string[];
  selectedColors: string[];
  onlyInStock: boolean;
  onlyFastDelivery: boolean;
  sortBy: 'relevant' | 'price-low' | 'price-high' | 'rating' | 'newest';
}
