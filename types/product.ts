export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  images: string[];
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}