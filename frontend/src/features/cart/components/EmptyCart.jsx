import { Link } from "react-router";
import { BagIcon } from "src/components/icons";

export const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center py-32 gap-6 text-taupe-400">
    <BagIcon />
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
