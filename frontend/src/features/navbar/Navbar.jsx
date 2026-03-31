import { useState } from "react";
import { BrandLogo, Burger, Menu, ShoppingCart } from "./NavbarComponents";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-60 bg-pink-50 shadow-sm">
      <div className="flex justify-between items-center px-6 py-4 text-taupe-600">
        <Burger isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
        <BrandLogo />
        <ShoppingCart />
      </div>

      <nav
        className={`flex flex-col overflow-hidden transition-all duration-300 ease-out
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <Menu onClick={() => setIsOpen(false)} />
      </nav>
    </header>
  );
};

export default Navbar;
