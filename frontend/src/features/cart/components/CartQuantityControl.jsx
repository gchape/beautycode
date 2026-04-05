import { useContext } from "react";
import { CartActionsContext } from "../../providers/cartContext";

export const CartQuantityControl = ({ item }) => {
  const dispatch = useContext(CartActionsContext);
  return (
    <div className="flex items-center bg-pink-100 text-taupe-500 rounded-full px-2 py-1">
      <button
        onClick={() => dispatch({ item, action: "DECREASE" })}
        aria-label="რაოდენობის შემცირება"
        className="w-10 h-10 flex items-center justify-center hover:opacity-80 rounded-full transition-opacity cursor-pointer"
      >
        <span aria-hidden="true">−</span>
      </button>
      <span className="w-12 text-center font-bold" aria-live="polite">
        {item.quantity}
      </span>
      <button
        onClick={() => dispatch({ item, action: "INCREASE" })}
        aria-label="რაოდენობის გაზრდა"
        className="w-10 h-10 flex items-center justify-center hover:opacity-80 rounded-full transition-opacity cursor-pointer"
      >
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
};
