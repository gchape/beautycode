import { PRODUCTS } from "../data";

const Hero = () => {
  const product = PRODUCTS.find((p) => p.badge === "Premium");

  return (
    <section className="relative min-h-[600px] flex flex-col md:flex-row items-center overflow-hidden pt-12">
      <div className="w-full md:w-1/2 px-8 md:px-20 z-10 py-12 md:py-0 text-taupe-600">
        <span className="font-label text-xs uppercase tracking-[0.3em] block mb-2">
          {product.badge}
        </span>

        <h2 className="font-headline text-3xl md:text-5xl leading-tight mb-8 max-w-xl">
          {product.title}
        </h2>

        <div className="flex items-baseline gap-4 mb-10">
          <span className="text-2xl md:text-3xl font-headline">
            {product.newPrice} GEL
          </span>

          <span className="text-xl text-taupe-500 line-through opacity-50">
            {product.oldPrice} GEL
          </span>
        </div>

        <button className="bg-pink-100 px-8 py-2.5 md:px-12 md:py-4 rounded-full font-label uppercase tracking-widest text-sm hover:opacity-80 transition-opacity cursor-pointer">
          ყიდვა
        </button>
      </div>

      <div className="w-full md:w-1/2 h-[500px] md:h-[700px] rounded-l-[5rem] md:rounded-l-[10rem] overflow-hidden shadow-2xl bg-pink-50">
        <img
          loading="eager"
          fetchPriority="high"
          alt={product.title}
          src={product.imgUrl}
          className="w-full h-full object-contain relative z-10"
        />
      </div>
    </section>
  );
};

export default Hero;
