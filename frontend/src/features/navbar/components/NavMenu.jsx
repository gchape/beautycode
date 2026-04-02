import { NavLink } from "react-router";
import { NAV_ITEMS } from "../../data";

export const NavMenu = ({ onClose }) => (
  <div className="px-4 pb-4 flex flex-col gap-1 border-t border-t-taupe-200">
    {NAV_ITEMS.map((item, index) => (
      <NavLink key={item.label} to={item.to}>
        {({ isActive }) => (
          <div
            onClick={onClose}
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
