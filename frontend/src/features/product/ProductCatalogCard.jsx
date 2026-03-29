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
    <div className="aspect-3/4 overflow-hidden rounded-2xl bg-surface-container mb-5">
      <img
        src={imgUrl}
        alt={title}
        className="w-full h-full object-contain p-6 hover:scale-105 transition-transform duration-700 ease-in-out"
      />
    </div>
    <div className="flex flex-col gap-1 px-1">
      <span className="font-label text-[10px] uppercase tracking-[0.2em] text-primary/60 font-semibold">
        {badge}
      </span>
      <h3 className="font-headline text-lg leading-snug text-on-surface">
        {title}
      </h3>
      {description && (
        <p className="font-body text-sm text-on-surface-variant line-clamp-2 mt-1">
          {description}
        </p>
      )}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-label text-base font-bold text-on-surface">
            {newPrice} ₾
          </span>
          {oldPrice && (
            <span className="font-label text-sm text-on-surface-variant/50 line-through">
              {oldPrice} ₾
            </span>
          )}
        </div>
        <button className="font-label text-[11px] cursor-pointer uppercase tracking-widest text-primary border-b border-primary/30 hover:border-primary pb-0.5 transition-all duration-300">
          დამატება
        </button>
      </div>
    </div>
  </article>
);

export default ProductCatalogCard;
