import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCartDispatch } from "src/entities/cart";
import type { ProductCard } from "src/entities/product";
import { cn } from "src/lib/cn";

interface HeroProps {
  products: ProductCard[];
}

const CONFIRMATION_MS = 1200;

export const HomeHero = ({ products }: HeroProps) => {
  const dispatch = useCartDispatch();
  const item = products.find((p) => p.badge === "Premium");
  const [justAdded, setJustAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  if (!item) return null;

  const handleAddToCart = () => {
    dispatch({ item, action: "ADD" });
    setJustAdded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setJustAdded(false), CONFIRMATION_MS);
  };

  return (
    <section className="relative min-h-145 flex flex-col md:flex-row items-center overflow-hidden pt-4 md:pt-8">
      <div className="w-full md:w-1/2 px-8 md:px-20 z-10 py-12 md:py-0 flex flex-col gap-6">
        <div>
          <span className="inline-block rounded-full border border-pink-300 px-3 py-1 font-label tracking-widest uppercase text-[10px] text-pink-500 mb-3">
            {item.badge}
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl leading-tight text-taupe-800 max-w-md mt-2">
            {item.title}
          </h2>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-2xl md:text-3xl font-headline text-taupe-700">
            {item.newPrice} GEL
          </span>
          {item.oldPrice != null && (
            <span className="text-base text-taupe-400 line-through font-label">
              {item.oldPrice} GEL
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddToCart}
            aria-label={
              justAdded ? `${item.title} დაემატა კალათაში` : undefined
            }
            className={cn(
              "rounded-full px-8 py-3 font-label uppercase tracking-widest text-sm transition-colors duration-150",
              justAdded
                ? "bg-success text-success-content"
                : "bg-accent text-accent-content",
            )}
          >
            {justAdded ? (
              <span className="flex items-center gap-2">
                <Check size={16} />
                დამატებულია
              </span>
            ) : (
              "ყიდვა"
            )}
          </button>
          <span className="font-label text-[10px] uppercase tracking-widest text-taupe-400">
            უფასო მიტანა
          </span>
        </div>
      </div>

      <div
        className="w-full md:w-1/2 h-75 sm:h-100 md:h-160
                      rounded-l-[4rem] md:rounded-l-[8rem] overflow-hidden
                      bg-linear-to-br from-pink-100 to-pink-200 shadow-xl"
      >
        <img
          loading="eager"
          fetchPriority="high"
          alt={item.title}
          src={item.imgUrl}
          className="w-full h-full object-contain p-8 md:p-12
                     transition-transform duration-700 ease-out hover:scale-105"
        />
      </div>
    </section>
  );
};
