import { useState } from "react";
import { BrandLogo, CartIcon, MenuToggle, NavMenu } from "./NavbarComponents";

const Navbar = ({ cartCount = 0 }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-60 bg-pink-50 shadow-sm">
      <div className="flex justify-between items-center px-6 py-4 text-taupe-600">
        <MenuToggle isOpen={menuOpen} onToggle={() => setMenuOpen((p) => !p)} />
        <BrandLogo />
        <CartIcon count={cartCount} />
      </div>

      <nav
        className={`flex flex-col overflow-hidden transition-all duration-300 ease-out
          ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <NavMenu onClick={() => setMenuOpen(false)} />
      </nav>
    </header>
  );
};

export default Navbar;
