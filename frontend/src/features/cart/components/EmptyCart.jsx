import { Link } from "react-router";

export const EmptyCart = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-32 gap-6">
    <span className="material-symbols-outlined text-6xl text-taupe-400">
      shopping_bag
    </span>
    <p className="font-headline text-2xl text-taupe-500">კალათა ცარიელია</p>
    <Link
      to="/products"
      className="font-label text-xs uppercase tracking-widest text-taupe-600 border-b border-taupe-400 hover:border-taupe-600 pb-0.5 transition-colors"
    >
      პროდუქტების ნახვა
    </Link>
  </div>
);
