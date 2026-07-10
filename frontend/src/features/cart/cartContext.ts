import { createContext, useContext, type Dispatch } from "react";
import type { CartAction, CartItem } from "src/types";

export const CartStateContext = createContext<CartItem[]>([]);

export const CartActionsContext = createContext<Dispatch<CartAction> | null>(
  null,
);

export const useCart = () => {
  const context = useContext(CartStateContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const useCartDispatch = () => {
  const context = useContext(CartActionsContext);
  if (!context)
    throw new Error("useCartDispatch must be used within CartProvider");
  return context;
};
