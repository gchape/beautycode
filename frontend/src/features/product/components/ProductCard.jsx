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
        className="group bg-pink-50 text-taupe-600 p-5 sm:p-6 rounded-2xl 
                   transition-shadow duration-500 hover:shadow-xl 
                   hover:shadow-taupe-600/10 break-inside-avoid mb-8"
      >
        <div className="w-full overflow-hidden rounded-xl mb-4">
          <img
            src={imgUrl}
            alt={title}
            loading="lazy"
            className="w-full h-auto object-contain 
                       transition-transform duration-500 
                       group-hover:scale-105"
          />
        </div>

        <div className="flex justify-between items-start gap-3">
          <div>
            <span className="font-label text-xs uppercase tracking-wider text-taupe-500">
              {badge}
            </span>

            <p id={titleId} className="font-headline text-lg md:text-xl mt-1">
              {title}
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="font-headline text-lg whitespace-nowrap">
              {newPrice} GEL
            </span>

            {oldPrice != null && (
              <span className="font-label text-sm text-taupe-400 line-through block">
                {oldPrice} GEL
              </span>
            )}
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
      <div
        className="group aspect-3/4 w-full max-w-sm sm:max-w-md md:max-w-lg 
                   mx-auto overflow-hidden rounded-2xl bg-pink-50 mb-5"
      >
        <img
          src={imgUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-contain 
                     p-4 sm:p-6 md:p-8
                     transition-transform duration-700 ease-in-out 
                     group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-1 px-1">
        <span className="font-label text-[10px] uppercase tracking-[0.2em] text-taupe-400 font-semibold">
          {badge}
        </span>

        <p
          id={titleId}
          className="font-headline text-lg leading-snug text-taupe-600"
        >
          {title}
        </p>

        {description && (
          <p className="font-body text-sm text-taupe-500 line-clamp-2 mt-1">
            {description}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-md font-bold text-taupe-500">
              {newPrice} ₾
            </span>

            {oldPrice != null && (
              <span className="text-sm text-taupe-400 line-through">
                {oldPrice} ₾
              </span>
            )}
          </div>

          <button
            onClick={onAddToCart}
            className="text-xs font-bold cursor-pointer tracking-widest 
                       text-taupe-600 border-b border-taupe-400 
                       hover:border-taupe-600 pb-0.5 
                       transition-colors duration-300"
          >
            დამატება
          </button>
        </div>
      </div>
    </article>
  );
};
