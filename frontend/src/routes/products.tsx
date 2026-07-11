import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { productApi, type Product } from "src/entities/product";
import { CatalogGrid } from "src/ui/product/CatalogGrid";
import { CategoryFilter } from "src/ui/product/CategoryFilter";
import { ProductsSkeleton } from "src/ui/product/ProductsSkeleton";

export const HydrateFallback = ProductsSkeleton;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const category = new URL(request.url).searchParams.get("category") ?? "all";
  const products = await productApi.summary(category);
  return { products };
};

export const Component = () => {
  const { products } = useLoaderData<{ products: Product[] }>();

  return (
    <main className="max-w-7xl mx-auto px-6 pt-6 pb-16 md:pb-32">
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-label text-[11px] uppercase tracking-[0.25em] text-on-surface-variant mb-3 block">
              კოლექცია 2026
            </span>
            <h1 className="font-headline text-2xl md:text-5xl text-primary leading-none tracking-tighter">
              კატალოგი
            </h1>
          </div>
          <p className="font-body text-base text-on-surface-variant italic max-w-xs md:text-right">
            აღმოაჩინეთ სილამაზის ტექნოლოგიების ახალი ერა თქვენს ყოველდღიურობაში.
          </p>
        </div>
      </header>
      <CategoryFilter />
      <CatalogGrid products={products} />
    </main>
  );
};
