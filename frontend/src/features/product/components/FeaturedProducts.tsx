import { useProducts } from "src/hooks/useProducts";
import { FeaturedProductsSkeleton } from "./FeaturedProductsSkeleton";
import { ProductCard as ProductCardComponent } from "./ProductCard";
import { ProductCard } from "src/types";

const getUniqueProductsByCategory = (products: ProductCard[]): ProductCard[] =>
  Array.from(
    new Map(
      products
        .filter(({ badge }) => badge !== "Premium")
        .map((p) => [p.category, p]),
    ).values(),
  );

const FeaturedProducts = () => {
  const { data: products = [], isLoading } = useProducts();

  if (isLoading) return <FeaturedProductsSkeleton count={3} />;

  const uniqueProducts = getUniqueProductsByCategory(products);

  return (
    <section className="px-6 py-12 md:py-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 text-taupe-700">
          <div>
            <span className="font-label text-xs uppercase tracking-[0.3em] block mb-2 text-taupe-500">
              The Essentials
            </span>
            <h3 className="font-headline text-2xl md:text-4xl text-taupe-800">
              გამორჩეული კოლექცია
            </h3>
          </div>
          <p className="max-w-md font-body italic leading-relaxed text-taupe-500">
            აღმოაჩინეთ სილამაზის ინოვაციური მოწყობილობები, რომლებიც შექმნილია
            თქვენი ყოველდღიურობის გასაუმჯობესებლად.
          </p>
        </header>

        <div className="columns-2 md:columns-3 gap-4 md:gap-6">
          {uniqueProducts.map((product) => (
            <ProductCardComponent
              key={product.id}
              variant="featured"
              {...product}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
