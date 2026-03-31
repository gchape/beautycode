import { useContext, useState } from "react";
import { PRODUCTS } from "../data";
import { CartContext } from "../state/store";
import {
  ProductCatalogGrid,
  ProductCategories,
  ProductsCatalogHeader,
} from "./ProductComponents";

const ProductCatalogHeader_ = () => <ProductsCatalogHeader />;

const ProductsCatalog = () => {
  const [active, setActive] = useState("all");
  const [, dispatch] = useContext(CartContext);

  const filtered =
    active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  return (
    <main className="max-w-7xl mx-auto px-6 pt-10 pb-32">
      <ProductCatalogHeader_ />
      <ProductCategories active={active} onChange={setActive} />
      <ProductCatalogGrid
        products={filtered}
        onAddToCart={(item) => dispatch({ action: "ADD", item: item })}
      />
    </main>
  );
};

export default ProductsCatalog;
