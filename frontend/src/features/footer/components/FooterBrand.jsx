import { ArrowRightIcon } from "src/components/icons";
import { useFormFetcher } from "src/hooks/useFormFetcher";

export const FooterBrand = () => {
  const { fetcher, isLoading, data } = useFormFetcher();

  return (
    <div className="md:col-span-2">
      <header>
        <h4 className="text-2xl md:text-3xl font-script italic text-taupe-600 mb-4">
          BeautyCode
        </h4>
        <p className="max-w-sm text-taupe-500 mb-6 leading-relaxed">
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
          className="join max-w-md border-b border-base-300 focus-within:border-taupe-600 transition-colors"
        >
          <input
            type="email"
            name="email"
            placeholder="ელ-ფოსტა"
            disabled={isLoading}
            className="input join-item bg-transparent border-none focus:outline-0 px-0 py-3
                       text-sm text-taupe-500 placeholder:text-taupe-400 disabled:opacity-50 grow"
          />
          <button
            type="submit"
            aria-label="გამოწერა"
            disabled={isLoading}
            className="btn btn-ghost join-item text-taupe-600
                       hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRightIcon />
          </button>
        </fetcher.Form>
      )}
    </div>
  );
};
