// FooterComponents.jsx
import { useState } from "react";
import { Link } from "react-router";
import { CONTACT_LINKS, NAV_ITEMS } from "../data";

export const FooterBrand = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="md:col-span-2">
      <h4 className="text-3xl font-script italic text-taupe-600 mb-6">
        BeautyCode
      </h4>
      <p className="max-w-sm text-taupe-500 mb-8 leading-relaxed">
        გამოიწერეთ ჩვენი სიახლეები და მიიღეთ ექსკლუზიური შეთავაზებები პირდაპირ
        თქვენს ფოსტაზე.
      </p>

      {submitted ? (
        <p className="font-label text-sm text-taupe-500 tracking-wide">
          ✓ გმადლობთ! მალე დაგიკავშირდებით.
        </p>
      ) : (
        <div className="flex max-w-md border-b border-stone-300 focus-within:border-taupe-600 transition-colors duration-300">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="ელ-ფოსტა"
            className="grow bg-transparent border-none focus:ring-0 px-0 py-3 font-label text-sm outline-none text-taupe-500 placeholder:text-taupe-400"
          />
          <button
            onClick={handleSubmit}
            aria-label="გამოწერა"
            className="px-6 py-2 text-stone-600 bg-transparent border-none cursor-pointer hover:opacity-60 transition-opacity"
          >
            <span className="material-symbols-outlined text-lg">
              arrow_forward
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export const FooterNav = () => (
  <div>
    <h5 className="font-label text-xs uppercase tracking-[0.2em] text-taupe-600 mb-6">
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
    <h5 className="font-label text-xs uppercase tracking-[0.2em] text-taupe-600 mb-6">
      კონტაქტი
    </h5>
    <ul className="flex flex-col place-content-center gap-4 text-taupe-500 text-sm">
      {CONTACT_LINKS.map(({ href, icon, label, external }) => (
        <a
          key={href}
          href={href}
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          className="w-fit flex items-center gap-1 no-underline relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-taupe-400 after:transition-all after:duration-300 hover:after:w-full"
        >
          <span className="material-symbols-outlined text-base">{icon}</span>
          <span>{label}</span>
        </a>
      ))}
      <li>
        <p className="font-label flex items-center gap-1">
          <span className="material-symbols-outlined text-base">
            location_on
          </span>
          თბილისი, საქართველო
        </p>
      </li>
    </ul>
  </div>
);

export const FooterLegal = () => (
  <div className="flex gap-8">
    <Link
      to="/terms-of-service"
      className="text-xs font-label tracking-widest text-taupe-400 hover:text-taupe-600 transition-colors no-underline"
    >
      Terms of Service
    </Link>
    <Link
      to="/privacy-policy"
      className="text-xs font-label tracking-widest text-taupe-400 hover:text-taupe-600 transition-colors no-underline"
    >
      Privacy Policy
    </Link>
  </div>
);
