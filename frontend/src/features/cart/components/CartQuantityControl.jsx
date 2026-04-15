import { useCartDispatch } from "../cartContext";

export const CartQuantityControl = ({ item }) => {
  const dispatch = useCartDispatch();

  return (
    <div className="join rounded-full bg-pink-100 border border-pink-200">
      <button
        onClick={() => dispatch({ item, action: "DECREASE" })}
        disabled={item.quantity === 1}
        aria-label="რაოდენობის შემცირება"
        className="join-item btn btn-ghost btn-sm w-9 rounded-full text-taupe-600
                   disabled:opacity-30 disabled:cursor-not-allowed hover:bg-pink-200
                   transition-colors duration-150"
      >
        −
      </button>
      <span
        className="join-item flex items-center justify-center w-10 text-center
                   font-bold text-sm text-taupe-700"
        aria-live="polite"
      >
        {item.quantity}
      </span>
      <button
        onClick={() => dispatch({ item, action: "INCREASE" })}
        aria-label="რაოდენობის გაზრდა"
        className="join-item btn btn-ghost btn-sm w-9 rounded-full text-taupe-600
                   hover:bg-pink-200 transition-colors duration-150"
      >
        +
      </button>
    </div>
  );
};
