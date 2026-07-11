import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import type { ProductCard } from "src/entities/product";

export interface CartItem extends ProductCard {
  quantity: number;
}

export type CartAction =
  | { action: "ADD"; item: ProductCard }
  | { action: "INCREASE"; item: CartItem }
  | { action: "DECREASE"; item: CartItem }
  | { action: "REMOVE"; item: CartItem };

const STORAGE_KEY = "cart_items";

const readInitialCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    // Corrupted or inaccessible storage shouldn't crash the app —
    // just start with an empty cart.
    return [];
  }
};

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

const CartStateContext = createContext<CartItem[]>([]);
const CartActionsContext = createContext<Dispatch<CartAction> | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, undefined, readInitialCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Storage can throw (quota exceeded, private-browsing restrictions,
      // etc.) — losing persistence silently is better than crashing the cart.
    }
  }, [cart]);

  return (
    <CartStateContext.Provider value={cart}>
      <CartActionsContext.Provider value={dispatch}>
        {children}
      </CartActionsContext.Provider>
    </CartStateContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);

export const useCartDispatch = () => {
  const context = useContext(CartActionsContext);
  if (!context)
    throw new Error("useCartDispatch must be used within CartProvider");
  return context;
};
