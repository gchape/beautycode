import { TrashIcon } from "src/components/icons";
import { useCartDispatch } from "../cartContext";
import { CartItemPrice } from "./CartItemPrice";
import { CartQuantityControl } from "./CartQuantityControl";

export const CartItem = ({ item }) => {
  const dispatch = useCartDispatch();

  return (
    <div className="bg-pink-50 p-6 rounded-xl flex flex-col md:flex-row gap-8 items-center md:items-start">
      <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden shrink-0 border border-stone-200">
        <img
          src={item.imgUrl}
          alt={item.title}
          className="w-full h-full object-contain p-4"
        />
      </div>
      <div className="grow flex flex-col justify-between h-full py-2">
        <div className="space-y-3">
          <div className="flex justify-between place-items-center">
            <h3 className="text-lg md:text-xl font-headline font-bold text-taupe-800 leading-tight max-w-md">
              {item.title}
            </h3>
            <button
              onClick={() => dispatch({ item, action: "REMOVE" })}
              aria-label={`${item.title} კალათიდან წაშლა`}
              className="text-taupe-400 hover:text-red-500 transition-colors p-2 cursor-pointer"
            >
              <TrashIcon />
            </button>
          </div>
          <p className="font-label text-xs text-taupe-500 uppercase tracking-wider">
            {item.badge}
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-between items-end gap-6">
          <CartQuantityControl item={item} />
          <CartItemPrice
            newPrice={item.newPrice}
            oldPrice={item.oldPrice}
            quantity={item.quantity}
          />
        </div>
      </div>
    </div>
  );
};
