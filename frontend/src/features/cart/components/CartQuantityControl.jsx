import { useCartDispatch } from "../cartContext";

export const CartQuantityControl = ({ item }) => {
  const dispatch = useCartDispatch();

  return (
    <div className="flex items-center bg-pink-100 text-taupe-500 rounded-full px-2 py-1">
      <button
        onClick={() => dispatch({ item, action: "DECREASE" })}
        disabled={item.quantity === 1}
        aria-label="რაოდენობის შემცირება"
        className="w-10 h-10 flex items-center justify-center rounded-full transition-opacity
                   hover:opacity-80 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <span aria-hidden="true">−</span>
      </button>
      <span className="w-12 text-center font-bold" aria-live="polite">
        {item.quantity}
      </span>
      <button
        onClick={() => dispatch({ item, action: "INCREASE" })}
        aria-label="რაოდენობის გაზრდა"
        className="w-10 h-10 flex items-center justify-center rounded-full transition-opacity
                   hover:opacity-80 cursor-pointer"
      >
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
};
