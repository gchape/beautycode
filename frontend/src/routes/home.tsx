import { useLoaderData } from "react-router";
import { productApi, type ProductCard } from "src/entities/product";
import { MissionSection } from "src/ui/home/MissionSection";
import { FeaturedCollection } from "src/ui/product/FeaturedCollection";
import { HomeHero } from "src/ui/home/HomeHero";
import { HomeSkeleton } from "src/ui/home/HomeSkeleton";

export const HydrateFallback = HomeSkeleton;

export const loader = async () => {
  const products = await productApi.list();
  return { products };
};

export const Component = () => {
  const { products } = useLoaderData<{ products: ProductCard[] }>();

  return (
    <main>
      <HomeHero products={products} />
      <FeaturedCollection products={products} />
      <MissionSection />
    </main>
  );
};
