import { PRODUCTS } from "../../data";
import ProductCard from "./ProductCard";

export const FeaturedProductsCollection = () => (
  <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
    {PRODUCTS.map((product) => (
      <div key={product.id} className="break-inside-avoid mb-8">
        <ProductCard variant="featured" {...product} />
      </div>
    ))}
  </div>
);
