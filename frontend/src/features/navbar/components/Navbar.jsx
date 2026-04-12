import { useState } from "react";
import { NavBrandLogo } from "./NavBrandLogo";
import { NavBurger } from "./NavBurger";
import { NavCartButton } from "./NavCartButton";
import { NavMenu } from "./NavMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-60 bg-pink-50 shadow-sm">
      <div className="flex justify-between items-center px-6 py-4 text-taupe-600">
        <NavBurger isOpen={isOpen} onClick={toggle} />
        <NavBrandLogo />
        <NavCartButton />
      </div>
      <nav
        aria-hidden={!isOpen}
        inert={!isOpen ? "" : undefined}
        className={`flex flex-col overflow-hidden transition-all duration-300 ease-out
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <NavMenu onClose={close} />
      </nav>
    </header>
  );
};

export default Navbar;
