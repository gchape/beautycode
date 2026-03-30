import { Link, NavLink } from "react-router";
import { NAV_ITEMS } from "../data";

export const NavLinks = ({ onClick }) => (
  <div className="px-4 pb-4 flex flex-col gap-1 border-t border-t-taupe-200">
    {NAV_ITEMS.map((item, index) => (
      <NavLink key={item.label} to={item.to} onClick={onClick}>
        {({ isActive }) => (
          <span
            className={`flex items-center gap-3 font-medium text-sm uppercase tracking-[0.08em] px-4 py-3 rounded-2xl mt-1 transition-colors duration-300
                    ${
                      isActive
                        ? "bg-pink-200 text-taupe-600 shadow-sm"
                        : "text-taupe-500 hover:text-taupe-600"
                    }`}
          >
            <span className="text-xs opacity-90">0{index + 1}</span>
            {item.label}
          </span>
        )}
      </NavLink>
    ))}
  </div>
);

export const SearchBar = () => (
  <button className="flex p-2.5 rounded-full hover:bg-pink-100 transition-all duration-300 cursor-pointer">
    <span className="material-symbols-outlined text-lg">search</span>
  </button>
);

export const MenuBar = ({ isOpen, setIsOpen }) => {
  return (
    <button
      className="flex p-2.5 rounded-full hover:bg-surface-container cursor-pointer"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <span className="material-symbols-outlined text-lg">
        {isOpen ? "close" : "menu"}
      </span>
    </button>
  );
};

export const HomeBar = () => (
  <Link
    className="text-2xl md:text-3xl tracking-tight font-script cursor-pointer"
    to={"/"}
  >
    BeautyCode
  </Link>
);
