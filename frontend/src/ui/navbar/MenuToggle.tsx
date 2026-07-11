import { cn } from "src/lib/cn";

interface MenuToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

export const MenuToggle = ({ isOpen, onClick }: MenuToggleProps) => (
  <button
    aria-label={isOpen ? "მენიუს დახურვა" : "მენიუს გახსნა"}
    aria-expanded={isOpen}
    onClick={onClick}
    className="flex h-10 w-10 items-center justify-center rounded-full text-taupe-600 hover:bg-pink-100 hover:text-taupe-800
               transition-colors duration-200"
  >
    <div className="relative w-5 h-5">
      <span
        className={cn(
          "absolute left-0 h-px bg-current rounded-full transition-all duration-300",
          isOpen ? "top-2 w-5 rotate-45" : "top-1 w-5 rotate-0",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-2 h-px bg-current rounded-full transition-all duration-300",
          isOpen ? "opacity-0 w-0" : "opacity-100 w-4",
        )}
      />
      <span
        className={cn(
          "absolute left-0 h-px bg-current rounded-full transition-all duration-300",
          isOpen ? "top-2 w-5 -rotate-45" : "top-3 w-5 rotate-0",
        )}
      />
    </div>
  </button>
);
