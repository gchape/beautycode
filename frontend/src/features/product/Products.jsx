import { useState } from "react";
import CategoryFilter from "../category/CategoryFilter";
import { PRODUCTS } from "../data";
import ProductCatalogCard from "./ProductCatalogCard";

const Products = () => {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  return (
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

      <CategoryFilter active={active} onChange={setActive} />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 mt-8">
        {filtered.map((product, index) => (
          <ProductCatalogCard
            key={product.id}
            imgUrl={product.imgUrl}
            badge={product.badge}
            title={product.title}
            description={product.features?.[0]}
            newPrice={product.newPrice}
            oldPrice={product.oldPrice}
            offset={index % 3 === 1}
          />
        ))}
      </div>
    </main>
  );
};

export default Products;
