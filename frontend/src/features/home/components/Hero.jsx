import { useCartDispatch } from "src/features/cart";
import { useProducts } from "src/hooks/useProducts";
import { HeroSkeleton } from "./HeroSkeleton";

const Hero = () => {
  const dispatch = useCartDispatch();
  const { data: products = [], isLoading } = useProducts();

  if (isLoading) return <HeroSkeleton />;

  const item = products.find((p) => p.badge === "Premium");
  if (!item) return null;

  return (
    <section className="relative min-h-[580px] flex flex-col md:flex-row items-center overflow-hidden pt-4 md:pt-8">
      {/* Text side */}
      <div className="w-full md:w-1/2 px-8 md:px-20 z-10 py-12 md:py-0 flex flex-col gap-6">
        <div>
          <span className="badge badge-outline border-pink-300 text-pink-500 font-label tracking-widest uppercase text-[10px] mb-3">
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
          {item.oldPrice && (
            <span className="text-base text-taupe-400 line-through font-label">
              {item.oldPrice} GEL
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch({ item, action: "ADD" })}
            className="btn btn-accent rounded-full font-label uppercase tracking-widest text-sm px-8"
          >
            ყიდვა
          </button>
          <span className="font-label text-[10px] uppercase tracking-widest text-taupe-400">
            უფასო მიტანა
          </span>
        </div>
      </div>

      {/* Image side */}
      <div
        className="w-full md:w-1/2 h-[300px] sm:h-[400px] md:h-[640px]
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

export default Hero;
