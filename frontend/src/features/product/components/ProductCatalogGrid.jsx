import { useCartDispatch } from "src/features/cart";
import { useProducts } from "src/hooks/useProducts";
import { useCategory } from "../categoryContext";
import { ProductCard } from "./ProductCard";
import { ProductCatalogSkeleton } from "./ProductCatalogSkeleton";

export const ProductCatalogGrid = () => {
  const dispatch = useCartDispatch();
  const [activeCategory] = useCategory();
  const { data: products = [], isLoading } = useProducts(activeCategory);

  if (isLoading) return <ProductCatalogSkeleton count={6} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12 mt-8">
      {products.map((product, index) => (
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
