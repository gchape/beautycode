import { useCartDispatch } from "src/features/cart";
import { useProducts } from "src/hooks/useProducts";
import { HeroSkeleton } from "./HeroSkeleton";

const Hero = () => {
  const { data: products = [], isLoading } = useProducts();

  const item = products.find((p) => p.badge === "Premium");

  const dispatch = useCartDispatch();

  if (isLoading) return <HeroSkeleton />;

  return (
    <section className="relative min-h-[600px] flex flex-col md:flex-row items-center overflow-hidden pt-6 md:pt-12">
      <div className="w-full md:w-1/2 px-8 md:px-20 z-10 py-12 md:py-0 text-taupe-700">
        <span className="font-label text-xs uppercase tracking-[0.3em] block mb-2 text-taupe-500">
          {item.badge}
        </span>
        <h2 className="font-headline text-xl sm:text-2xl md:text-5xl leading-tight mb-8 max-w-xl text-taupe-800">
          {item.title}
        </h2>
        <div className="flex items-baseline gap-4 mb-10">
          <span className="text-lg md:text-3xl font-headline text-taupe-700">
            {item.newPrice} GEL
          </span>
          <span className="text-base text-taupe-400 line-through">
            {item.oldPrice} GEL
          </span>
        </div>
        <button
          onClick={() => dispatch({ item, action: "ADD" })}
          className="bg-pink-100 px-8 py-2.5 md:px-12 md:py-4 rounded-full font-label uppercase
                     tracking-widest text-sm text-taupe-700 hover:bg-pink-200 hover:text-taupe-800
                     transition-colors duration-200 cursor-pointer"
        >
          ყიდვა
        </button>
      </div>
      <div className="w-full md:w-1/2 h-[280px] sm:h-[380px] md:h-[700px] rounded-l-[5rem] md:rounded-l-[10rem] overflow-hidden shadow-2xl bg-pink-50">
        <img
          loading="eager"
          fetchPriority="high"
          alt={item.title}
          src={item.imgUrl}
          className="w-full h-full object-contain relative z-10"
        />
      </div>
    </section>
  );
};

export default Hero;
