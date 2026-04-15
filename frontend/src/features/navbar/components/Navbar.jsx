import { useState, useEffect } from "react";
import { NavBrandLogo } from "./NavBrandLogo";
import { NavBurger } from "./NavBurger";
import { NavCartButton } from "./NavCartButton";
import { NavMenu } from "./NavMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300
          ${
            scrolled
              ? "bg-base-100/90 backdrop-blur-md shadow-sm border-b border-pink-200"
              : "bg-base-100 border-b border-transparent"
          }`}
      >
        <div className="navbar max-w-7xl mx-auto px-4 md:px-6 min-h-16">
          <div className="navbar-start">
            <NavBurger isOpen={isOpen} onClick={toggle} />
          </div>
          <div className="navbar-center">
            <NavBrandLogo />
          </div>
          <div className="navbar-end gap-1">
            <NavCartButton />
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div
        onClick={close}
        className={`fixed inset-0 z-40 bg-taupe-900/20 backdrop-blur-sm
                    transition-opacity duration-300
                    ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Slide-down menu panel */}
      <nav
        aria-label="მთავარი ნავიგაცია"
        aria-hidden={!isOpen}
        className={`fixed top-16 left-0 right-0 z-40 bg-base-100 border-b border-pink-200
                    transition-all duration-300 ease-out overflow-hidden
                    ${isOpen ? "max-h-96 opacity-100 shadow-lg" : "max-h-0 opacity-0"}`}
      >
        <NavMenu onClose={close} />
      </nav>
    </>
  );
};

export default Navbar;
