import { useContext } from "react";
import { CATEGORIES, PRODUCTS } from "../data";
import { CartActionsContext, ProductCategoryContext } from "../state/store";
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

export const ProductCategories = () => {
  const [productCategory, setProductCategory] = useContext(
    ProductCategoryContext,
  );

  return (
    <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
      {CATEGORIES.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setProductCategory(value)}
          className={`px-8 py-2.5 rounded-full text-sm font-bold tracking-widest transition-all duration-300 whitespace-nowrap cursor-pointer
          ${
            productCategory === value
              ? "bg-pink-100 text-taupe-600"
              : "bg-pink-50 text-taupe-500 hover:bg-pink-100"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export const ProductCatalogGrid = () => {
  const dispatch = useContext(CartActionsContext);
  const [productCategory] = useContext(ProductCategoryContext);

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
