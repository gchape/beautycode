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
