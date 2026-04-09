import { useCartDispatch } from "src/features/cart";
import { PRODUCTS } from "src/features/data";
import { useCategory } from "../categoryContext";
import { ProductCard } from "./ProductCard";

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
