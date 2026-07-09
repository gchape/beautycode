export const ProductCard = ({
  imgUrl,
  badge,
  title,
  newPrice,
  oldPrice,
  variant = "catalog",
  description,
  offset = false,
  onAddToCart,
}) => {
  const titleId = `product-${title?.replace(/\s+/g, "-").toLowerCase()}`;

  if (variant === "featured") {
    return (
      <article
        aria-labelledby={titleId}
        className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow ease-out duration-250
                    break-inside-avoid mb-8 rounded-t-2xl"
      >
        <figure className="overflow-hidden rounded-t-2xl bg-pink-50">
          <img
            src={imgUrl}
            alt={title}
            loading="lazy"
            className="w-full h-auto object-contain rounded-xl"
          />
        </figure>
        <div className="card-body p-5">
          <div className="flex justify-between items-start gap-3">
            <div>
              <span className="font-label text-[10px] uppercase tracking-widest text-pink-400">
                {badge}
              </span>
              <p
                id={titleId}
                className="font-headline text-xl mt-1 text-taupe-700 leading-snug"
              >
                {title}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="font-headline text-lg whitespace-nowrap text-taupe-700">
                {newPrice} ₾
              </span>
              {oldPrice != null && (
                <span className="font-label text-sm text-taupe-400 line-through block">
                  {oldPrice} ₾
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      aria-labelledby={titleId}
      className={`relative ${offset ? "md:mt-24" : ""}`}
    >
      <div className="card bg-base-200 mb-5 overflow-hidden">
        <figure className="aspect-3/4 p-6 md:p-8">
          <img
            src={imgUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full object-contain"
          />
        </figure>
      </div>

      <div className="flex flex-col gap-1 px-1">
        <span className="font-label text-[10px] uppercase tracking-[0.2em] text-pink-400 font-semibold">
          {badge}
        </span>
        <p
          id={titleId}
          className="font-headline text-xl leading-snug text-taupe-700"
        >
          {title}
        </p>
        {description && (
          <p className="font-body text-sm text-taupe-500 line-clamp-2 mt-1 leading-relaxed">
            {description}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-taupe-600">
              {newPrice} ₾
            </span>
            {oldPrice != null && (
              <span className="text-sm text-taupe-400 line-through font-label">
                {oldPrice} ₾
              </span>
            )}
          </div>
          <button
            onClick={onAddToCart}
            className="btn btn-ghost btn-xs font-label tracking-widest uppercase
                       text-taupe-500 border-b border-pink-300 rounded-none pb-0.5
                       hover:border-pink-400 hover:text-taupe-700 hover:bg-transparent
                       transition-colors duration-200"
          >
            დამატება
          </button>
        </div>
      </div>
    </article>
  );
};
