import { useCartDispatch } from "src/entities/cart";
import type { Product } from "src/entities/product";
import { ProductCard } from "./ProductCard";

interface CatalogGridProps {
  products: Product[];
}

export const CatalogGrid = ({ products }: CatalogGridProps) => {
  const dispatch = useCartDispatch();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10 mt-8">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          variant="catalog"
          offset={index % 3 === 1}
          description={product.description}
          onAddToCart={() => dispatch({ action: "ADD", item: product })}
          {...product}
        />
      ))}
    </div>
  );
};
