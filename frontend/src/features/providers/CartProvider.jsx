import { useReducer } from "react";
import { CartActionsContext, CartStateContext } from "./cartContext";

const cartReducer = (prev, payload) => {
  switch (payload.action) {
    case "ADD": {
      const exists = prev.find((item) => item.id === payload.item.id);
      if (exists) {
        return prev.map((item) =>
          item.id === payload.item.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...payload.item, quantity: 1 }];
    }
    case "INCREASE":
      return prev.map((item) =>
        item.id === payload.item.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    case "DECREASE":
      return prev.map((item) =>
        item.id === payload.item.id && item.quantity !== 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    case "REMOVE":
      return prev.filter((item) => item.id !== payload.item.id);
    default:
      return prev;
  }
};

const CartProvider = ({ children }) => {
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
