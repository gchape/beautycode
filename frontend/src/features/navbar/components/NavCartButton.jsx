import { Link } from "react-router";
import { CartIcon } from "src/components/icons";
import { useCart } from "src/features/cart";

export const NavCartButton = () => {
  const count = useCart().length;

  return (
    <Link
      to="/cart"
      aria-label={`კალათა — ${count} პროდუქტი`}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-taupe-600 transition-colors duration-200 hover:bg-pink-100 hover:text-taupe-800"
    >
      {count > 0 && (
        <span className="absolute right-0 top-0 inline-flex h-5 min-w-[20px] translate-x-1/4 -translate-y-1/4 items-center justify-center rounded-full bg-pink-400 text-[10px] font-semibold leading-none text-pink-50 shadow-sm md:h-5.5 md:min-w-[22px] md:text-xs">
          {count > 99 ? "99+" : count}
        </span>
      )}

      <CartIcon size={24} />
    </Link>
  );
};
