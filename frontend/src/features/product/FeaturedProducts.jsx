import { FeaturedProductsCollection } from "./components/FeaturedProductsCollection";
import { FeaturedProductsHeader } from "./components/FeaturedProductsHeader";

const FeaturedProducts = () => (
  <section className="px-6 py-24">
    <div className="max-w-7xl mx-auto">
      <FeaturedProductsHeader />
      <FeaturedProductsCollection />
    </div>
  </section>
);

export default FeaturedProducts;
