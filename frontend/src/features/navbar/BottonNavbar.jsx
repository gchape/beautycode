import { NavLink } from "react-router";
import { NAV_ITEMS } from "../data";

const BottomNavbar = () => (
  <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-surface/70 backdrop-blur-xl border-t border-primary/10 z-50">
    {NAV_ITEMS.map((item) => (
      <NavLink key={item.label} to={item.to}>
        {({ isActive }) => (
          <span
            className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-300
            ${
              isActive
                ? "bg-primary-container text-primary rounded-full px-4 py-2 opacity-100"
                : "text-primary opacity-60 px-2 py-1"
            }`}
          >
            <span className="font-label text-sm uppercase tracking-[0.05em] font-medium">
              {item.label}
            </span>
          </span>
        )}
      </NavLink>
    ))}
  </nav>
);

export default BottomNavbar;
