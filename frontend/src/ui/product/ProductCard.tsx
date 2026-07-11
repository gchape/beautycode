import { Check, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "src/lib/cn";

type Variant = "catalog" | "featured";

const CARD_STYLES: Record<Variant, string> = {
  catalog: "group relative",
  featured:
    "group relative break-inside-avoid mb-6 rounded-2xl bg-base-200 shadow-sm hover:shadow-md transition-shadow duration-200",
};

const FIGURE_STYLES: Record<Variant, string> = {
  catalog: "overflow-hidden bg-pink-50 aspect-square rounded-2xl p-4 mb-3",
  featured: "overflow-hidden bg-pink-50 rounded-t-2xl",
};

const CONFIRMATION_MS = 1200;

interface ProductCardProps {
  imgUrl: string;
  badge: string;
  title: string;
  newPrice: number;
  oldPrice?: number | null;
  discount?: number;
  variant?: Variant;
  description?: string;
  offset?: boolean;
  onAddToCart?: () => void;
}

export const ProductCard = ({
  imgUrl,
  badge,
  title,
  newPrice,
  oldPrice,
  discount,
  variant = "catalog",
  description,
  offset = false,
  onAddToCart,
}: ProductCardProps) => {
  const titleId = `product-${title?.replace(/\s+/g, "-").toLowerCase()}`;
  const [justAdded, setJustAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const handleAddToCart = () => {
    onAddToCart?.();
    setJustAdded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setJustAdded(false), CONFIRMATION_MS);
  };

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        CARD_STYLES[variant],
        offset && variant === "catalog" && "md:mt-16",
      )}
    >
      <div className={cn(FIGURE_STYLES[variant], "relative")}>
        {discount != null && discount > 0 && (
          <span className="absolute top-2 left-2 z-10 rounded-full bg-accent px-2 py-0.5 text-[10px] font-label tracking-widest text-accent-content">
            -{discount}%
          </span>
        )}
        <img
          src={imgUrl}
          alt={title}
          loading="lazy"
          className={cn(
            "w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]",
            variant === "catalog" ? "h-full" : "h-auto",
          )}
        />
      </div>

      <div className={cn(variant === "featured" ? "p-4" : "px-0.5")}>
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0">
            <span className="font-label text-[10px] uppercase tracking-widest text-pink-400 font-semibold">
              {badge}
            </span>
            <p
              id={titleId}
              className={cn(
                "font-headline text-taupe-700 leading-snug truncate",
                variant === "featured" ? "text-lg mt-0.5" : "text-base mt-0.5",
              )}
            >
              {title}
            </p>
          </div>
          {variant === "featured" && (
            <div className="text-right shrink-0">
              <span className="font-headline text-base whitespace-nowrap text-taupe-700">
                {newPrice} ₾
              </span>
              {oldPrice != null && (
                <span className="font-label text-xs text-taupe-400 line-through block">
                  {oldPrice} ₾
                </span>
              )}
            </div>
          )}
        </div>

        {description && variant === "catalog" && (
          <p className="font-body text-xs text-taupe-500 line-clamp-1 mt-1 leading-relaxed">
            {description}
          </p>
        )}

        {variant === "catalog" && (
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-taupe-700">
                {newPrice} ₾
              </span>
              {oldPrice != null && (
                <span className="text-xs text-taupe-400 line-through font-label">
                  {oldPrice} ₾
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              aria-label={
                justAdded
                  ? `${title} დაემატა კალათაში`
                  : `${title} კალათაში დამატება`
              }
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-full shadow-sm transition-all duration-150",
                justAdded
                  ? "bg-success text-success-content scale-110"
                  : "bg-accent text-accent-content hover:scale-105",
              )}
            >
              {justAdded ? <Check size={16} /> : <Plus size={16} />}
            </button>
          </div>
        )}
      </div>
    </article>
  );
};
