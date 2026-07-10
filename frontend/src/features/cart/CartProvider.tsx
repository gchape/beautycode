import { useReducer, type ReactNode } from "react";
import type { CartAction, CartItem } from "src/types";
import { CartActionsContext, CartStateContext } from "./cartContext";

const cartReducer = (state: CartItem[], payload: CartAction): CartItem[] => {
  const { action, item } = payload;
  switch (action) {
    case "ADD": {
      const exists = state.find((i) => i.id === item.id);
      if (exists) {
        return state.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...state, { ...item, quantity: 1 }];
    }
    case "INCREASE":
      return state.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
      );
    case "DECREASE":
      return state.map((i) =>
        i.id === item.id && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : i,
      );
    case "REMOVE":
      return state.filter((i) => i.id !== item.id);
    default:
      return state;
  }
};

interface CartProviderProps {
  children: ReactNode;
}

const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartStateContext.Provider value={cart}>
      <CartActionsContext.Provider value={dispatch}>
        {children}
      </CartActionsContext.Provider>
    </CartStateContext.Provider>
  );
};

export default CartProvider;
