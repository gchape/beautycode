import { CloseIcon, MenuIcon } from "src/components/icons";

export const NavBurger = ({ isOpen, onClick }) => (
  <button
    aria-label={isOpen ? "მენიუს დახურვა" : "მენიუს გახსნა"}
    aria-expanded={isOpen}
    onClick={onClick}
    className="flex p-2.5 rounded-full hover:bg-pink-100 transition-all duration-300 cursor-pointer"
  >
    {isOpen ? <CloseIcon /> : <MenuIcon />}
  </button>
);
