import { createContext, useContext } from "react";

export const CartStateContext = createContext({
  items: [],
  total: 0,
  itemCount: 0,
});

export const CartActionsContext = createContext(null);

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
