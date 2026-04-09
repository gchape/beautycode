import { createContext, useContext } from "react";

export const CartStateContext = createContext([]);
export const CartActionsContext = createContext(() => {});

export const useCart = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartActionsContext);
