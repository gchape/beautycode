const ProductCatalogCard = ({
  imgUrl,
  badge,
  title,
  description,
  newPrice,
  oldPrice,
  offset = false,
}) => (
  <article className={`relative ${offset ? "md:mt-24" : ""}`}>
    <div className="aspect-3/4 overflow-hidden rounded-2xl bg-pink-50 mb-5">
      <img
        src={imgUrl}
        alt={title}
        className="w-full h-full object-contain p-6 hover:scale-105 transition-transform duration-700 ease-in-out"
      />
    </div>
    <div className="flex flex-col gap-1 px-1">
      <span className="font-label text-[10px] uppercase tracking-[0.2em] text-taupe-400 font-semibold">
        {badge}
      </span>

      <h3 className="font-headline text-lg leading-snug text-taupe-600">
        {title}
      </h3>

      {description && (
        <p className="font-body text-sm text-taupe-500 line-clamp-2 mt-1">
          {description}
        </p>
      )}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-md font-bold text-taupe-500">{newPrice} ₾</span>

          {oldPrice && (
            <span className="text-sm text-taupe-400 line-through">
              {oldPrice} ₾
            </span>
          )}
        </div>

        <button className="text-xs cursor-pointer tracking-widest text-taupe-600 border-b border-taupe-400 hover:border-taupe-600 pb-0.5 transition-colors duration-300">
          დამატება
        </button>
      </div>
    </div>
  </article>
);

export default ProductCatalogCard;
