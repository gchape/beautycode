import { useContext } from "react";
import { PRODUCTS } from "../../data";
import { CartActionsContext } from "../../providers/cartContext";
import { CategoryContext } from "../../providers/categoryContext";
import ProductCard from "./ProductCard";

export const ProductCatalogGrid = () => {
  const dispatch = useContext(CartActionsContext);
  const [productCategory] = useContext(CategoryContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12 mt-8">
      {PRODUCTS.filter(
        (p) => p.category === productCategory || productCategory === "all",
      ).map((product, index) => (
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
