import { FooterBrand } from "./FooterBrand";
import { FooterContacts } from "./FooterContacts";
import { FooterLegal } from "./FooterLegal";
import { FooterNavigation } from "./FooterNavigation";

const Footer = () => (
  <footer className="pt-12 pb-16 md:pt-20 md:pb-32">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-10 md:mb-20">
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
