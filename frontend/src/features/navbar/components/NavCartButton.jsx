import { Link } from "react-router";
import { useCart } from "src/features/cart";
import { CartIcon } from "src/features/icon";

export const NavCartButton = () => {
  const count = useCart().length;

  return (
    <Link
      to="/cart"
      aria-label={`კალათა — ${count} პროდუქტი`}
      className="relative flex p-2.5 rounded-full hover:bg-pink-100 transition-all duration-300 text-taupe-600"
    >
      <CartIcon size={26} />
      {count > 0 && (
        <span
          className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full
                         bg-taupe-600 text-white text-xs font-bold flex items-center
                         justify-center leading-none animate-bounce"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
};
