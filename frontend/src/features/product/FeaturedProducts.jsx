import { FeaturedProductsCollection } from "./ProductComponents";

const FeaturedProducts = () => (
  <section className="px-6 py-24">
    <div className="max-w-7xl mx-auto">
      <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 text-taupe-600">
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
      </header>

      <FeaturedProductsCollection />
    </div>
  </section>
);

export default FeaturedProducts;
