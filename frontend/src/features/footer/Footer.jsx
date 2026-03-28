import { useState } from "react";
import { CONTACT_ITEMS, LEGAL_LINKS, NAV_LINKS } from "../data";
import RightArrowIcon from "../icon/RightArrowIcon";
import FooterLinkList from "./FooterLinkList";

const Footer = () => {
  const [email, setEmail] = useState("");
  return (
    <footer className="bg-surface border-t border-outline-variant/10 pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <h4 className="text-3xl font-company italic text-primary mb-6">
              BeautyCode
            </h4>

            <p className="max-w-sm text-on-surface-variant mb-8 font-body leading-relaxed">
              გამოიწერეთ ჩვენი სიახლეები და მიიღეთ ექსკლუზიური შეთავაზებები
              პირდაპირ თქვენს ფოსტაზე.
            </p>

            <div className="flex max-w-md border-b border-outline-variant focus-within:border-primary transition-colors duration-300">
              <input
                type="email"
                placeholder="ელ-ფოსტა"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="grow bg-transparent border-none focus:ring-0 px-0 py-3 font-label text-sm outline-none text-on-surface"
              />

              <button className="px-6 py-2 text-primary bg-transparent border-none cursor-pointer">
                <RightArrowIcon />
              </button>
            </div>
          </div>

          <FooterLinkList title="ნავიგაცია" items={NAV_LINKS} />
          <FooterLinkList title="კონტაქტი" items={CONTACT_ITEMS} />
        </div>

        <div className="pt-8 border-t border-outline-variant/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant/60">
            © 2026 BeautyCode. All rights reserved.
          </p>

          <div className="flex gap-8">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs font-label tracking-widest text-on-surface-variant/60 hover:text-primary transition-colors no-underline"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
