import { TrashIcon } from "src/components/icons";
import { useCartDispatch } from "../cartContext";
import { CartItemPrice } from "./CartItemPrice";
import { CartQuantityControl } from "./CartQuantityControl";

export const CartItem = ({ item }) => {
  const dispatch = useCartDispatch();

  return (
    <div
      className="card card-side rounded-xl bg-base-200 transition-colors duration-200
                    shadow-sm p-4 md:p-6 gap-4 md:gap-6 cursor-pointer"
    >
      <figure
        className="w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-xl overflow-hidden
                         bg-pink-50 border border-pink-200"
      >
        <img
          src={item.imgUrl}
          alt={item.title}
          className="w-full h-full object-contain p-3"
        />
      </figure>

      <div className="card-body p-0 gap-2">
        <div className="flex justify-between items-start gap-2">
          <div>
            <span className="font-label text-[10px] uppercase tracking-widest text-pink-400 block mb-1">
              {item.badge}
            </span>
            <h3 className="font-headline text-base md:text-lg text-taupe-800 leading-snug">
              {item.title}
            </h3>
          </div>
          <button
            onClick={() => dispatch({ item, action: "REMOVE" })}
            aria-label={`${item.title} კალათიდან წაშლა`}
            className="btn btn-ghost btn-sm btn-circle text-taupe-400 hover:text-error
                       hover:bg-error/10 transition-colors duration-200 shrink-0"
          >
            <TrashIcon size={17} />
          </button>
        </div>

        <div className="flex flex-wrap justify-between items-end gap-3 mt-auto">
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
