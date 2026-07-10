import { NavLink } from "react-router";
import { NAV_ITEMS } from "src/constants";
import { cn } from "src/lib/cn";

interface NavMenuProps {
  onClose: () => void;
}

export const NavMenu = ({ onClose }: NavMenuProps) => (
  <ul className="menu menu-lg px-6 py-4 gap-1 min-w-4xl max-w-7xl mx-auto">
    {NAV_ITEMS.map((item, index) => (
      <li key={item.label}>
        <NavLink
          to={item.to}
          end={item.to === "/"}
          onClick={onClose}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-200 font-body text-sm border-l-2",
              isActive
                ? "bg-pink-100 text-taupe-800 border-pink-400"
                : "text-taupe-500 hover:bg-pink-50 hover:text-taupe-700 border-transparent",
            )
          }
        >
          <span className="font-label text-[10px] text-taupe-400 w-5 shrink-0">
            0{index + 1}
          </span>
          <span className="font-semibold tracking-wider uppercase text-xs md:text-sm">
            {item.label}
          </span>
        </NavLink>
      </li>
    ))}
  </ul>
);
