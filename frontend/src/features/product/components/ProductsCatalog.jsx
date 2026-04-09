import { ProductCatalogGrid } from "./ProductCatalogGrid";
import { ProductCategories } from "./ProductCategories";

const ProductsCatalog = () => (
  <main className="max-w-7xl mx-auto px-6 pt-10 pb-32">
    <header className="mb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-label text-[11px] uppercase tracking-[0.25em] text-on-surface-variant mb-3 block">
            კოლექცია 2026
          </span>
          <h1 className="font-headline text-4xl md:text-5xl text-primary leading-none tracking-tighter">
            კატალოგი
          </h1>
        </div>
        <p className="font-body text-base text-on-surface-variant italic max-w-xs md:text-right">
          აღმოაჩინეთ სილამაზის ტექნოლოგიების ახალი ერა თქვენს ყოველდღიურობაში.
        </p>
      </div>
    </header>

    <ProductCategories />
    <ProductCatalogGrid />
  </main>
);

export default ProductsCatalog;
