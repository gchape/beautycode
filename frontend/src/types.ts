export interface ProductCard {
  id: string;
  title: string;
  badge: string;
  category: string;
  imgUrl: string;
  newPrice: number;
  oldPrice?: number | null;
  discount: number;
}

export interface Product extends ProductCard {
  description?: string;
}

export interface ProductDetail extends ProductCard {
  features?: string[];
}

export interface CartItem extends ProductCard {
  quantity: number;
}

export type CartAction =
  | { action: "ADD"; item: ProductCard }
  | { action: "INCREASE"; item: CartItem }
  | { action: "DECREASE"; item: CartItem }
  | { action: "REMOVE"; item: CartItem };

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Order {
  id: string;
  summary: string;
  date: string;
}
