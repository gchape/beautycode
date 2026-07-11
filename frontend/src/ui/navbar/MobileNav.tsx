import * as Dialog from "@radix-ui/react-dialog";
import { NavLink } from "react-router";
import { cn } from "src/lib/cn";

import { NAV_ITEMS } from "src/lib/navigation";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Cart already has its own persistent icon + badge in the header, so
// listing it again in the drawer is redundant — filter it out here only.
// NAV_ITEMS itself stays untouched since the footer nav still wants it.
const DRAWER_ITEMS = NAV_ITEMS.filter((item) => item.to !== "/cart");

export const MobileNav = ({ open, onOpenChange }: MobileNavProps) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-taupe-900/20 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out" />
      <Dialog.Content
        aria-label="მთავარი ნავიგაცია"
        className="fixed top-16 left-0 right-0 z-40 bg-base-100 border-b border-pink-200 shadow-lg outline-none"
      >
        <Dialog.Title className="sr-only">ნავიგაცია</Dialog.Title>
        <ul className="flex flex-col px-6 py-4 gap-1 max-w-7xl mx-auto list-none">
          {DRAWER_ITEMS.map((item, index) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                onClick={() => onOpenChange(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-200 font-body text-sm border-l-2 no-underline",
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
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
