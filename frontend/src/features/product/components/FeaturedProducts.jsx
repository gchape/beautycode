import { useProducts } from "src/hooks/useProducts";
import { ProductCard } from "./ProductCard";

const FeaturedProducts = () => {
  const { data: products = [], isLoading } = useProducts();

  if (isLoading) return null;

  return (
    <section className="px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 text-taupe-600">
          <div>
            <span className="font-label text-xs uppercase tracking-[0.3em] block mb-2">
              The Essentials
            </span>
            <h3 className="font-headline text-4xl">გამორჩეული კოლექცია</h3>
          </div>
          <p className="max-w-md font-body italic leading-relaxed">
            აღმოაჩინეთ სილამაზის ინოვაციური მოწყობილობები, რომლებიც შექმნილია
            თქვენი ყოველდღიურობის გასაუმჯობესებლად.
          </p>
        </header>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : products.map((product) => (
                <div key={product.id} className="break-inside-avoid mb-8">
                  <ProductCard variant="featured" {...product} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

const ProductCardSkeleton = () => (
  <div className="animate-pulse break-inside-avoid mb-8 rounded-2xl bg-taupe-100 h-80" />
);

export default FeaturedProducts;
