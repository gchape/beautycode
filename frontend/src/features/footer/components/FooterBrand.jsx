import { ArrowRightIcon } from "src/components/icons";
import { useFormFetcher } from "src/hooks/useFormFetcher";

export const FooterBrand = () => {
  const { fetcher, isLoading, data } = useFormFetcher();

  return (
    <div className="md:col-span-2">
      <header>
        <h4 className="text-3xl font-script italic text-taupe-600 mb-6">
          BeautyCode
        </h4>
        <p className="max-w-sm text-taupe-500 mb-8 leading-relaxed">
          გამოიწერეთ ჩვენი სიახლეები და მიიღეთ ექსკლუზიური შეთავაზებები პირდაპირ
          თქვენს ფოსტაზე.
        </p>
      </header>
      {data?.success ? (
        <p className="text-sm text-taupe-500 tracking-wide">
          ✓ გმადლობთ! მალე დაგიკავშირდებით.
        </p>
      ) : (
        <fetcher.Form
          method="post"
          action="/subscribe"
          className="flex max-w-md border-b border-stone-300 focus-within:border-taupe-600 transition-colors duration-300"
        >
          <input
            type="email"
            name="email"
            placeholder="ელ-ფოსტა"
            disabled={isLoading}
            className="grow bg-transparent border-none focus:ring-0 px-0 py-3 text-sm outline-none
                       text-taupe-500 placeholder:text-taupe-400 disabled:opacity-50"
          />
          <button
            type="submit"
            aria-label="გამოწერა"
            disabled={isLoading}
            className="p-2 text-stone-600 bg-transparent border-none cursor-pointer
                       hover:opacity-60 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRightIcon />
          </button>
        </fetcher.Form>
      )}
    </div>
  );
};
