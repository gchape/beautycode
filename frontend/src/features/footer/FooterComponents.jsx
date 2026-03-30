import { Link } from "react-router";
import { NAV_LINKS } from "../data";

export const FooterNavigation = () => (
  <div>
    <h5 className="font-label text-xs uppercase tracking-[0.2em] text-taupe-600 mb-6">
      ნავიგაცია
    </h5>
    <ul className="space-y-4">
      {NAV_LINKS.map((item) => (
        <li key={item}>
          <Link
            to={"/"}
            className="font-body text-taupe-500 no-underline transition-opacity duration-300 hover:opacity-80"
          >
            {item}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export const FooterContacts = () => (
  <div>
    <h5 className="font-label text-xs uppercase tracking-[0.2em] text-taupe-600 mb-6">
      კონტაქტი
    </h5>

    <ul className="flex flex-col gap-4 text-taupe-500 text-sm">
      <li>
        <a
          href="https://www.facebook.com/Beatlovegeorgia"
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit flex place-items-center gap-1 no-underline relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-taupe-400 after:transition-all after:duration-300 hover:after:w-full"
        >
          <span class="material-symbols-outlined">public</span>
          Beatlovegeorgia
        </a>
      </li>

      <li>
        <a
          href="https://wa.me/995574074833"
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit flex place-items-center gap-1 no-underline relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-taupe-400 after:transition-all after:duration-300 hover:after:w-full"
        >
          <span className="material-symbols-outlined">call</span>
          (+995) 574-074-833
        </a>
      </li>

      <li>
        <a
          href="mailto:13beauty.code@gmail.com"
          className="w-fit flex place-items-center gap-1 no-underline relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-taupe-400 after:transition-all after:duration-300 hover:after:w-full"
        >
          <span className="material-symbols-outlined">email</span>
          13beauty.code@gmail.com
        </a>
      </li>

      <li>
        <p className="font-label flex place-items-center gap-1">
          <span className="material-symbols-outlined">location_on</span>
          თბილისი, საქართველო
        </p>
      </li>
    </ul>
  </div>
);

export const FooterNewsletter = () => (
  <div className="md:col-span-2">
    <h4 className="text-3xl font-script italic text-taupe-600 mb-6">
      BeautyCode
    </h4>

    <p className="max-w-sm text-taupe-500 mb-8 leading-relaxed">
      გამოიწერეთ ჩვენი სიახლეები და მიიღეთ ექსკლუზიური შეთავაზებები პირდაპირ
      თქვენს ფოსტაზე.
    </p>

    <div className="flex max-w-md border-b border-stone-300 focus-within:border-taupe-600 transition-colors duration-300">
      <input
        type="email"
        placeholder="ელ-ფოსტა"
        className="grow bg-transparent border-none focus:ring-0 px-0 py-3 font-label text-sm outline-none text-taupe-500"
      />

      <button className="px-6 py-2 text-stone-600 bg-transparent border-none cursor-pointer">
        <span className="material-symbols-outlined text-lg">arrow_forward</span>
      </button>
    </div>
  </div>
);

export const FooterLinks = () => (
  <div className="flex gap-8">
    <Link
      to={"/terms-of-service"}
      className="text-xs font-label tracking-widest text-taupe-400 hover:text-taupe-600 transition-colors no-underline"
    >
      Terms of Service
    </Link>

    <Link
      to={"/privacy-policy"}
      className="text-xs font-label tracking-widest text-taupe-400 hover:text-taupe-600 transition-colors no-underline"
    >
      Privacy Policy
    </Link>
  </div>
);
