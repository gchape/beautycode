import { useState } from "react";
import { HomeBar, MenuBar, NavLinks, SearchBar } from "./NavbarComponents";

const HomeBar_ = () => <HomeBar />;
const SearchBar_ = () => <SearchBar />;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-60 bg-pink-50 shadow-sm">
      <div className="flex justify-between items-center px-6 py-4 text-taupe-600">
        <MenuBar isOpen={isOpen} setIsOpen={setIsOpen} />

        <HomeBar_ />
        <SearchBar_ />
      </div>

      <nav
        className={`flex flex-col overflow-hidden transition-all duration-300 ease-out
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <NavLinks onClick={() => setIsOpen(false)} />
      </nav>
    </header>
  );
};

export default Navbar;
