import { useState } from "react";
import { NavLink } from "react-router";
import { NAV_ITEMS } from "../data";
import SearchIcon from "../icon/SearchIcon";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-60 bg-surface-container-low shadow-sm">
      <div className="flex justify-between items-center px-6 py-4">
        <button
          className="text-primary p-2.5 rounded-full hover:bg-primary-container/40 transition-all duration-300 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>

        <h1 className="text-3xl font-company text-primary tracking-tight cursor-pointer">
          BeautyCode
        </h1>

        <button className="text-primary p-2.5 rounded-full hover:bg-primary-container/40 transition-all duration-300 cursor-pointer">
          <SearchIcon />
        </button>
      </div>

      <nav
        className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 pb-4 flex flex-col gap-1 border-t border-primary/10">
          {NAV_ITEMS.map((item, index) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={() => setIsOpen(false)}
            >
              {({ isActive }) => (
                <span
                  className={`flex items-center gap-3 font-label text-sm uppercase tracking-[0.08em] font-medium transition-all duration-300 px-4 py-3 rounded-2xl mt-1
                    ${
                      isActive
                        ? "bg-primary-container text-primary shadow-sm"
                        : "text-on-surface-variant hover:bg-primary-container/50 hover:text-primary"
                    }`}
                >
                  <span className="text-xs opacity-40 font-mono">
                    0{index + 1}
                  </span>
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
