import { useState, useEffect } from "react";
import { cn } from "src/lib/cn";
import { BrandMark } from "./BrandMark";
import { MenuToggle } from "./MenuToggle";
import { CartButton } from "./CartButton";
import { MobileNav } from "./MobileNav";

export const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-base-100/90 backdrop-blur-md shadow-sm border-b border-pink-200"
            : "bg-base-100 border-b border-transparent",
        )}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 md:px-6 min-h-16">
          <div className="flex-1 flex items-center">
            <MenuToggle isOpen={isOpen} onClick={() => setIsOpen((v) => !v)} />
          </div>
          <BrandMark />
          <div className="flex-1 flex items-center justify-end gap-1">
            <CartButton />
          </div>
        </div>
      </header>

      <MobileNav open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};
