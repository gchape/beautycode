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

export const FeaturedProductsHeader = () => (
  <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 text-taupe-600">
    <div>
      <span className="font-label text-xs uppercase tracking-[0.3em] block mb-2">
        The Essentials
      </span>

      <h3 className="font-headline text-4xl">გამორჩეული კოლექცია</h3>
    </div>

    <p className="max-w-md font-body italic leading-relaxed">
      აღმოაჩინეთ სილამაზის ინოვაციური მოწყობილობები, რომლებიც შექმნილია თქვენი
      ყოველდღიურობის გასაუმჯობესებლად.
    </p>
  </header>
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

export const ProductCatalogHeader = () => (
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
);
