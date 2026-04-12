import { useCartDispatch } from "src/features/cart";
import { useProducts } from "src/hooks/useProducts";

const Hero = () => {
  const { data: products = [], isLoading } = useProducts();

  const item = products.find((p) => p.badge === "Premium");

  const dispatch = useCartDispatch();

  if (isLoading) return <HeroSkeleton />;
  if (!item) return null;

  return (
    <section className="relative min-h-[600px] flex flex-col md:flex-row items-center overflow-hidden pt-12">
      <div className="w-full md:w-1/2 px-8 md:px-20 z-10 py-12 md:py-0 text-taupe-600">
        <span className="font-label text-xs uppercase tracking-[0.3em] block mb-2">
          {item.badge}
        </span>
        <h2 className="font-headline text-3xl md:text-5xl leading-tight mb-8 max-w-xl">
          {item.title}
        </h2>
        <div className="flex items-baseline gap-4 mb-10">
          <span className="text-2xl md:text-3xl font-headline">
            {item.newPrice} GEL
          </span>
          <span className="text-xl text-taupe-500 line-through opacity-50">
            {item.oldPrice} GEL
          </span>
        </div>
        <button
          onClick={() => dispatch({ product: item, action: "ADD" })}
          className="bg-pink-100 px-8 py-2.5 md:px-12 md:py-4 rounded-full font-label uppercase tracking-widest text-sm hover:opacity-80 transition-opacity cursor-pointer"
        >
          ყიდვა
        </button>
      </div>
      <div className="w-full md:w-1/2 h-[500px] md:h-[700px] rounded-l-[5rem] md:rounded-l-[10rem] overflow-hidden shadow-2xl bg-pink-50">
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

const HeroSkeleton = () => (
  <section className="relative min-h-[600px] flex flex-col md:flex-row items-center overflow-hidden pt-12 animate-pulse">
    <div className="w-full md:w-1/2 px-8 md:px-20 py-12 space-y-6">
      <div className="h-3 w-24 bg-taupe-200 rounded" />
      <div className="h-10 w-3/4 bg-taupe-200 rounded" />
      <div className="h-8 w-1/3 bg-taupe-200 rounded" />
      <div className="h-12 w-40 bg-taupe-200 rounded-full" />
    </div>
    <div className="w-full md:w-1/2 h-[500px] md:h-[700px] rounded-l-[5rem] md:rounded-l-[10rem] bg-taupe-100" />
  </section>
);

export default Hero;
