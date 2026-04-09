import { Link } from "react-router";
import {
  ArrowForwardIcon,
  DeleteIcon,
  ShoppingBagIcon,
  VerifiedIcon,
} from "src/features/icon/SimpleIcons";
import { useCartDispatch } from "src/features/providers/cartContext";

export const CartHeader = () => (
  <header className="mb-12">
    <h2 className="text-4xl font-headline font-bold text-taupe-600 tracking-tight mb-2">
      კალათა
    </h2>
    <p className="font-label text-sm uppercase tracking-widest text-taupe-500">
      თქვენი შერჩეული პროდუქცია
    </p>
  </header>
);

export const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center py-32 gap-6 text-taupe-400">
    <ShoppingBagIcon />
    <p className="text-lg tracking-wide">კალათა ცარიელია</p>
    <Link
      to="/products"
      className="font-label text-xs uppercase tracking-widest text-taupe-600
                 border-b border-taupe-400 hover:border-taupe-600 pb-0.5 transition-colors"
    >
      პროდუქტების ნახვა
    </Link>
  </div>
);

export const CartItemPrice = ({ newPrice, oldPrice, quantity }) => (
  <div className="text-right">
    <span className="block font-label text-xs text-taupe-600 uppercase tracking-widest mb-1">
      ფასი
    </span>
    <span className="text-xl md:text-2xl font-headline font-bold text-taupe-700">
      {(newPrice * quantity).toFixed(0)} ₾
    </span>
    {oldPrice != null && (
      <span className="block font-label text-sm text-taupe-400 line-through">
        {(oldPrice * quantity).toFixed(0)} ₾
      </span>
    )}
  </div>
);

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
              <DeleteIcon />
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

const CartSummaryRow = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="font-label uppercase tracking-widest">{label}</span>
    <span>{value}</span>
  </div>
);

export const CartSummary = ({ total }) => (
  <div className="sticky top-32 bg-pink-100 p-8 rounded-xl shadow-sm">
    <h3 className="text-xl md:text-2xl font-bold text-taupe-600 mb-8">
      შეკვეთის დეტალები
    </h3>
    <div className="space-y-6 text-taupe-500">
      <CartSummaryRow label="ჯამი" value={`${total} ₾`} />
      <CartSummaryRow label="მიწოდება" value="უფასო" />
      <div className="pt-6 mt-6 text-taupe-600">
        <div className="flex justify-between items-end mb-8">
          <span className="font-headline text-lg md:text-xl font-bold">
            სულ:
          </span>
          <span className="text-xl md:text-2xl font-headline font-bold tracking-tight">
            {total} ₾
          </span>
        </div>
        <button
          className="w-full py-3 text-sm md:text-md border border-stone-400 rounded-full
                           font-label font-bold uppercase tracking-[0.15em] transition-shadow
                           duration-300 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          გადახდა
          <ArrowForwardIcon />
        </button>
      </div>
    </div>
    <div className="mt-8 flex items-center gap-4 p-4">
      <VerifiedIcon size={24} />
      <p className="text-[11px] font-label text-taupe-500 uppercase tracking-tighter leading-relaxed">
        უსაფრთხო გადახდა გარანტირებულია პარტნიორი ბანკების მიერ
      </p>
    </div>
  </div>
);
