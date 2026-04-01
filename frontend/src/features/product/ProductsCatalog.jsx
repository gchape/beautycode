import {
  ProductCatalogGrid,
  ProductCatalogHeader,
  ProductCategories,
} from "./ProductComponents";

const ProductsCatalog = () => (
  <main className="max-w-7xl mx-auto px-6 pt-10 pb-32">
    <ProductCatalogHeader />
    <ProductCategories />
    <ProductCatalogGrid />
  </main>
);

export default ProductsCatalog;
