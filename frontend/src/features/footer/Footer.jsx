import { FooterBrand } from "./components/FooterBrand";
import { FooterContacts } from "./components/FooterContacts";
import { FooterLegal } from "./components/FooterLegal";
import { FooterNavigation } from "./components/FooterNavigation";

const Footer = () => (
  <footer className="pt-20 pb-32">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-20">
        <FooterBrand />
        <FooterNavigation />
        <FooterContacts />
      </div>
      <div className="pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs font-label uppercase tracking-widest text-taupe-400">
          © 2026 BeautyCode. All rights reserved.
        </p>
        <FooterLegal />
      </div>
    </div>
  </footer>
);

export default Footer;
