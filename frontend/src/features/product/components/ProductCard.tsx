import { cva, type VariantProps } from "class-variance-authority";
import { Plus } from "lucide-react";
import { cn } from "src/lib/cn";

const card = cva("group relative", {
  variants: {
    variant: {
      catalog: "",
      featured:
        "break-inside-avoid mb-6 rounded-2xl bg-base-200 shadow-sm hover:shadow-md transition-shadow duration-200",
    },
  },
  defaultVariants: { variant: "catalog" },
});

const figure = cva("overflow-hidden bg-pink-50", {
  variants: {
    variant: {
      catalog: "aspect-square rounded-2xl p-4 mb-3",
      featured: "rounded-t-2xl",
    },
  },
  defaultVariants: { variant: "catalog" },
});

interface ProductCardProps extends VariantProps<typeof card> {
  imgUrl: string;
  badge: string;
  title: string;
  newPrice: number;
  oldPrice?: number | null;
  discount?: number;
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

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        card({ variant }),
        offset && variant === "catalog" && "md:mt-16",
      )}
    >
      <div className={cn(figure({ variant }), "relative")}>
        {discount != null && discount > 0 && (
          <span className="absolute top-2 left-2 z-10 badge badge-accent font-label text-[10px] tracking-widest px-2">
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
              onClick={onAddToCart}
              aria-label={`${title} კალათაში დამატება`}
              className="btn btn-accent btn-sm btn-circle shadow-sm hover:scale-105 transition-transform duration-150"
            >
              <Plus size={16} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
};
