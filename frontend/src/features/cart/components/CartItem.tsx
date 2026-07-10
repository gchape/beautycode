import { Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "src/types";
import { useCartDispatch } from "../cartContext";
import { CartQuantityControl } from "./CartQuantityControl";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useCartDispatch();
  const lineTotal = item.newPrice * item.quantity;

  return (
    <div className="flex gap-4 py-4 border-b border-taupe-100 last:border-0">
      <figure className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-pink-50 border border-pink-100">
        <img
          src={item.imgUrl}
          alt={item.title}
          className="w-full h-full object-contain p-2"
        />
      </figure>

      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0">
            <span className="font-label text-[10px] uppercase tracking-widest text-pink-400 block">
              {item.badge}
            </span>
            <h3 className="font-headline text-sm md:text-base text-taupe-800 leading-snug truncate">
              {item.title}
            </h3>
          </div>
          <button
            onClick={() => dispatch({ item, action: "REMOVE" })}
            aria-label={`${item.title} კალათიდან წაშლა`}
            className="btn btn-ghost btn-xs btn-circle text-taupe-300 hover:text-error hover:bg-error/10 shrink-0"
          >
            <Trash2 size={15} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <CartQuantityControl item={item} />
          <div className="text-right">
            <span className="font-headline text-sm md:text-base font-semibold text-taupe-700">
              {lineTotal.toFixed(0)} ₾
            </span>
            {item.oldPrice != null && (
              <span className="block font-label text-xs text-taupe-400 line-through">
                {(item.oldPrice * item.quantity).toFixed(0)} ₾
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
