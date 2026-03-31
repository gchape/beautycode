import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { NAV_ITEMS } from "../data";
import { CartStateContext } from "../state/store";

export const Menu = ({ onClick }) => {
  const navigate = useNavigate();

  return (
    <div className="px-4 pb-4 flex flex-col gap-1 border-t border-t-taupe-200">
      {NAV_ITEMS.map((item, index) => (
        <NavLink key={item.label} to={item.to}>
          {({ isActive }) => (
            <div
              onClick={() => {
                onClick();
                if (isActive) navigate(item.to);
              }}
              className={`flex items-center gap-3 text-sm uppercase tracking-[0.08em] px-4 py-3 rounded-2xl mt-1 transition-all duration-300
                ${
                  isActive
                    ? "bg-pink-100 text-taupe-700 border-l-2 border-taupe-400 pl-3"
                    : "text-taupe-500 hover:bg-pink-50 hover:text-taupe-600"
                }`}
            >
              <span className="text-xs opacity-50 font-label">
                0{index + 1}
              </span>
              <span className="font-bold">{item.label}</span>
            </div>
          )}
        </NavLink>
      ))}
    </div>
  );
};

const ShoppingCartIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="-0.5 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.5996 21.57C19.7042 21.57 20.5996 20.6746 20.5996 19.57C20.5996 18.4654 19.7042 17.57 18.5996 17.57C17.495 17.57 16.5996 18.4654 16.5996 19.57C16.5996 20.6746 17.495 21.57 18.5996 21.57Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.59961 21.57C9.70418 21.57 10.5996 20.6746 10.5996 19.57C10.5996 18.4654 9.70418 17.57 8.59961 17.57C7.49504 17.57 6.59961 18.4654 6.59961 19.57C6.59961 20.6746 7.49504 21.57 8.59961 21.57Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 3.55997C2 3.55997 6.64 3.49997 6 7.55997L5.31006 11.62C5.20774 12.1068 5.21778 12.6105 5.33954 13.0929C5.46129 13.5752 5.69152 14.0234 6.01263 14.4034C6.33375 14.7833 6.73733 15.0849 7.19263 15.2854C7.64793 15.4858 8.14294 15.5797 8.64001 15.56H16.64C17.7479 15.5271 18.8119 15.1196 19.6583 14.404C20.5046 13.6884 21.0834 12.7069 21.3 11.62L21.9901 7.50998C22.0993 7.0177 22.0939 6.50689 21.9744 6.017C21.8548 5.52712 21.6242 5.07126 21.3005 4.68467C20.9767 4.29807 20.5684 3.99107 20.1071 3.78739C19.6458 3.58371 19.1438 3.48881 18.64 3.50998H9.94"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ShoppingCart = () => {
  const count = useContext(CartStateContext).length;

  return (
    <Link
      to="/cart"
      aria-label={`კალათა — ${count} პროდუქტი`}
      className="relative flex p-2.5 rounded-full hover:bg-pink-100 transition-all duration-300 text-taupe-600"
    >
      <ShoppingCartIcon />
      {count > 0 && (
        <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-taupe-600 text-white text-xs font-bold flex items-center justify-center leading-none animate-pulse">
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
