export interface Product {
  id: string;
  title: string;
  badge: string;
  category: string;
  imgUrl: string;
  newPrice: number;
  oldPrice?: number | null;
  features?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export type CartAction =
  | { action: "ADD"; item: Product }
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
