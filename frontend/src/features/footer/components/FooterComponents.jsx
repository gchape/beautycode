import { Link, useFetcher } from "react-router";
import { CONTACT_LINKS, LEGAL_LINKS, NAV_ITEMS } from "../../data";
import { ArrowForwardIcon, LocationPinIcon } from "../../icon/SimpleIcons";

export const FooterBrand = () => {
  const fetcher = useFetcher();
  const submitted = fetcher.data?.success;
  const isSubmitting = fetcher.state !== "idle";

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
      {submitted ? (
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
            disabled={isSubmitting}
            className="grow bg-transparent border-none focus:ring-0 px-0 py-3 text-sm outline-none
                       text-taupe-500 placeholder:text-taupe-400 disabled:opacity-50"
          />
          <button
            type="submit"
            aria-label="გამოწერა"
            disabled={isSubmitting}
            className="p-2 text-stone-600 bg-transparent border-none cursor-pointer
                       hover:opacity-60 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowForwardIcon />
          </button>
        </fetcher.Form>
      )}
    </div>
  );
};

export const FooterNavigation = () => (
  <div>
    <h5 className="text-xs uppercase tracking-[0.2em] text-taupe-600 mb-6">
      ნავიგაცია
    </h5>
    <ul className="space-y-4">
      {NAV_ITEMS.map((item) => (
        <li key={item.label}>
          <Link
            to={item.to}
            className="font-body text-taupe-500 no-underline transition-opacity duration-300 hover:opacity-80"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export const FooterContacts = () => (
  <div>
    <h5 className="text-xs uppercase tracking-[0.2em] text-taupe-600 mb-6">
      კონტაქტი
    </h5>
    <ul className="flex flex-col gap-4 text-taupe-500 text-sm">
      {CONTACT_LINKS.map(({ href, icon, label }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit flex items-center gap-1 no-underline relative
                       after:absolute after:bottom-0 after:left-0 after:h-px after:w-0
                       after:bg-taupe-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            <span>{icon}</span>
            <span>{label}</span>
          </a>
        </li>
      ))}
      <li className="flex items-center gap-1">
        <LocationPinIcon />
        თბილისი, საქართველო
      </li>
    </ul>
  </div>
);

export const FooterLegal = () => (
  <div className="flex gap-8">
    {LEGAL_LINKS.map(({ to, label }) => (
      <Link
        key={to}
        to={to}
        className="text-xs tracking-widest text-taupe-400 hover:text-taupe-600 transition-colors no-underline"
      >
        {label}
      </Link>
    ))}
  </div>
);
