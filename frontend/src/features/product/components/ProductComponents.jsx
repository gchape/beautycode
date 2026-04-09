import { useCartDispatch } from "src/features/providers/cartContext";
import { useCategory } from "src/features/providers/categoryContext";
import { CATEGORIES, PRODUCTS } from "../../data";

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
  if (variant === "featured") {
    return (
      <div
        className="group bg-pink-50 text-taupe-600 p-6 rounded-2xl transition-shadow duration-500
                      hover:shadow-xl hover:shadow-taupe-600/10 break-inside-avoid mb-8 cursor-text"
      >
        <img
          src={imgUrl}
          alt={title}
          className="w-full mb-4 group-hover:scale-105 transition-transform duration-400"
        />
        <div className="flex place-content-around place-items-start gap-2">
          <div>
            <span className="font-label text-xs uppercase tracking-wider text-taupe-500">
              {badge}
            </span>
            <h4 className="font-headline text-lg md:text-xl mt-1">{title}</h4>
          </div>
          <div className="text-left shrink-0">
            <span className="font-headline text-lg whitespace-nowrap">
              {newPrice} GEL
            </span>
            <span className="font-label text-sm text-taupe-400 line-through block">
              {oldPrice} GEL
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
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
            className="text-xs font-bold cursor-pointer tracking-widest text-taupe-600
                       border-b border-taupe-400 hover:border-taupe-600 pb-0.5 transition-colors duration-300"
          >
            დამატება
          </button>
        </div>
      </div>
    </article>
  );
};

export const ProductCategories = () => {
  const [activeCategory, setCategory] = useCategory();
  return (
    <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
      {CATEGORIES.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setCategory(value)}
          className={`px-8 py-2.5 rounded-full text-sm font-bold tracking-widest transition-all
                      duration-300 whitespace-nowrap cursor-pointer
                      ${
                        activeCategory === value
                          ? "bg-pink-100 text-taupe-600"
                          : "bg-pink-50 text-taupe-500 hover:bg-pink-100"
                      }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export const ProductCatalogGrid = () => {
  const dispatch = useCartDispatch();
  const [activeCategory] = useCategory();

  const filtered = PRODUCTS.filter(
    (p) => activeCategory === "all" || p.category === activeCategory,
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12 mt-8">
      {filtered.map((product, index) => (
        <ProductCard
          key={product.id}
          variant="catalog"
          offset={index % 3 === 1}
          description={product.features?.[0]}
          onAddToCart={() => dispatch({ action: "ADD", item: product })}
          {...product}
        />
      ))}
    </div>
  );
};
