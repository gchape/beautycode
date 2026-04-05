import { Link } from "react-router";
import { ShoppingBagIcon } from "src/features/icon/ShoppingBagIcon";

export const EmptyCart = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-32 gap-6">
    <ShoppingBagIcon size={32} color="#5b4f4b" />
    <p className="font-headline text-2xl text-taupe-500">კალათა ცარიელია</p>
    <Link
      to="/products"
      className="font-label text-xs uppercase tracking-widest text-taupe-600 border-b border-taupe-400 hover:border-taupe-600 pb-0.5 transition-colors"
    >
      პროდუქტების ნახვა
    </Link>
  </div>
);
