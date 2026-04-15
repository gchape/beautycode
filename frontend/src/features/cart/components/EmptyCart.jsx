import { Link } from "react-router";
import { BagIcon } from "src/components/icons";

export const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center py-32 gap-6">
    <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center text-pink-400">
      <BagIcon size={36} />
    </div>
    <div className="text-center">
      <p className="font-headline text-2xl text-taupe-700 mb-1">
        კალათა ცარიელია
      </p>
      <p className="font-body text-sm text-taupe-400">
        დაამატეთ სასურველი პროდუქტები
      </p>
    </div>
    <Link
      to="/products"
      className="btn btn-accent btn-sm rounded-full font-label uppercase tracking-widest"
    >
      პროდუქტების ნახვა
    </Link>
  </div>
);
