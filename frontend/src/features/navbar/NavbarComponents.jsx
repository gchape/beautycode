import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { NAV_ITEMS } from "../data";
import { CartStateContext } from "../state/store";

export const Menu = ({ onClick }) => (
  <div className="px-4 pb-4 flex flex-col gap-1 border-t border-t-taupe-200">
    {NAV_ITEMS.map((item, index) => (
      <NavLink key={item.label} to={item.to}>
        {({ isActive }) => (
          <div
            onClick={onClick}
            className={`flex items-center gap-3 text-sm uppercase tracking-[0.08em] px-4 py-3 rounded-2xl mt-1 transition-all duration-300
                ${
                  isActive
                    ? "bg-pink-100 text-taupe-700 border-l-2 border-taupe-400 pl-3"
                    : "text-taupe-500 hover:bg-pink-50 hover:text-taupe-600"
                }`}
          >
            <span className="text-xs opacity-50 font-label">0{index + 1}</span>
            <span className="font-bold">{item.label}</span>
          </div>
        )}
      </NavLink>
    ))}
  </div>
);

export const ShoppingCart = () => {
  const count = useContext(CartStateContext).length;

  return (
    <Link
      to="/cart"
      aria-label={`კალათა — ${count} პროდუქტი`}
      className="relative flex p-2.5 rounded-full hover:bg-pink-100 transition-all duration-300 text-taupe-600"
    >
      <span className="material-symbols-outlined text-lg">shopping_cart</span>
      {count > 0 && (
        <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-taupe-600 text-white text-xs font-bold flex items-center justify-center leading-none animate-bounce">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
};

export const Burger = ({ isOpen, onClick }) => (
  <button
    aria-label={isOpen ? "მენიუს დახურვა" : "მენიუს გახსნა"}
    aria-expanded={isOpen}
    className="flex p-2.5 rounded-full hover:bg-pink-100 transition-all duration-300 cursor-pointer"
    onClick={onClick}
  >
    <span className="material-symbols-outlined text-lg">
      {isOpen ? "close" : "menu"}
    </span>
  </button>
);

export const BrandLogo = () => (
  <Link className="text-2xl md:text-3xl tracking-tight font-script" to="/">
    BeautyCode
  </Link>
);
