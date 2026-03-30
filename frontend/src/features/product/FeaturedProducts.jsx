import { PRODUCTS } from "../data";
import FeaturedProductCard from "./FeaturedProductCard";

const col = (index) =>
  ["md:col-span-5", "md:col-span-4", "md:col-span-3"][index % 3];
const aspect = (index) =>
  ["aspect-[4/5]", "aspect-square", "aspect-video"][index % 3];

const FeaturedProducts = () => (
  <section className="px-6 py-24">
    <div className="max-w-7xl mx-auto">
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 text-taupe-600">
        <div>
          <span className="font-label text-xs uppercase tracking-[0.3em] block mb-2">
            The Essentials
          </span>

          <h3 className="font-headline text-4xl">გამორჩეული კოლექცია</h3>
        </div>

        <p className="max-w-md font-body italic leading-relaxed">
          აღმოაჩინეთ სილამაზის ინოვაციური მოწყობილობები, რომლებიც შექმნილია
          თქვენი ყოველდღიურობის გასაუმჯობესებლად.
        </p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
        {PRODUCTS.map((product, index) => (
          <div key={product.id} className="break-inside-avoid mb-8">
            <FeaturedProductCard
              key={product.id}
              aspect={aspect(index)}
              col={col(index)}
              {...product}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedProducts;
