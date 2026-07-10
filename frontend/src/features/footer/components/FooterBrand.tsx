import { useFormFetcher } from "src/hooks/useFormFetcher";

interface SubscribeActionData {
  success?: boolean;
}

const ArrowRightIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.3153 16.6681C15.9247 17.0587 15.9247 17.6918 16.3153 18.0824C16.7058 18.4729 17.339 18.4729 17.7295 18.0824L22.3951 13.4168C23.1761 12.6357 23.1761 11.3694 22.3951 10.5883L17.7266 5.9199C17.3361 5.52938 16.703 5.52938 16.3124 5.91991C15.9219 6.31043 15.9219 6.9436 16.3124 7.33412L19.9785 11.0002L2 11.0002C1.44772 11.0002 1 11.4479 1 12.0002C1 12.5524 1.44772 13.0002 2 13.0002L19.9832 13.0002L16.3153 16.6681Z"
      fill="currentColor"
    />
  </svg>
);

export const FooterBrand = () => {
  const { fetcher, isLoading, data } = useFormFetcher<SubscribeActionData>();

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
