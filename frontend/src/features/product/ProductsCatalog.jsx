import { ProductCatalogGrid } from "./components/ProductCatalogGrid";
import { ProductCatalogHeader } from "./components/ProductCatalogHeader";
import { ProductCategories } from "./components/ProductCategories";

const ProductsCatalog = () => (
  <main className="max-w-7xl mx-auto px-6 pt-10 pb-32">
    <ProductCatalogHeader />
    <ProductCategories />
    <ProductCatalogGrid />
  </main>
);

export default ProductsCatalog;
