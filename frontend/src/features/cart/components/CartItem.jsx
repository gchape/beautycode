import { TrashIcon } from "src/components/icons";
import { useCartDispatch } from "../cartContext";
import { CartItemPrice } from "./CartItemPrice";
import { CartQuantityControl } from "./CartQuantityControl";

export const CartItem = ({ item }) => {
  const dispatch = useCartDispatch();

  return (
    <div
      className="rounded-xl bg-base-200 transition-colors duration-200
                    shadow-sm p-4 md:p-6 flex flex-col sm:flex-row gap-4 md:gap-6"
    >
      <figure
        className="w-full xs:w-24 xs:h-24 md:w-28 md:h-28 h-32 shrink-0 rounded-xl overflow-hidden
                         bg-pink-50 border border-pink-200"
      >
        <img
          src={item.imgUrl}
          alt={item.title}
          className="w-full h-full object-contain p-3"
        />
      </figure>

      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
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

        <div className="flex flex-col xs:flex-row xs:flex-wrap xs:justify-between xs:items-end gap-3 mt-auto">
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
