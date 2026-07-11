import { ArrowRight } from "lucide-react";
import { useFetcher } from "react-router";

interface SubscribeActionData {
  success?: boolean;
}

export const FooterNewsletter = () => {
  const fetcher = useFetcher<SubscribeActionData>();
  const isLoading = fetcher.state !== "idle";

  return (
    <div className="md:col-span-2">
      <header>
        <p className="text-2xl md:text-3xl font-script italic text-taupe-600 mb-4">
          BeautyCode
        </p>
        <p className="max-w-sm text-taupe-500 mb-6 leading-relaxed">
          გამოიწერეთ ჩვენი სიახლეები და მიიღეთ ექსკლუზიური შეთავაზებები პირდაპირ
          თქვენს ფოსტაზე.
        </p>
      </header>
      {fetcher.data?.success ? (
        <p className="text-sm text-taupe-500 tracking-wide">
          ✓ გმადლობთ! მალე დაგიკავშირდებით.
        </p>
      ) : (
        <fetcher.Form
          method="post"
          action="/subscribe"
          className="flex items-center gap-2 max-w-md border-b border-base-300 focus-within:border-taupe-600 transition-colors"
        >
          <input
            type="email"
            name="email"
            placeholder="ელ-ფოსტა"
            disabled={isLoading}
            className="bg-transparent border-none focus:outline-0 px-0 py-3
                       text-sm text-taupe-500 placeholder:text-taupe-400 disabled:opacity-50 grow"
          />
          <button
            type="submit"
            aria-label="გამოწერა"
            disabled={isLoading}
            className="flex items-center justify-center h-9 w-9 rounded-full text-taupe-600
                       hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRight size={16} />
          </button>
        </fetcher.Form>
      )}
    </div>
  );
};
