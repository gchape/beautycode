import { Link } from "react-router";
import { FooterBrand } from "./FooterBrand";
import { FooterContacts } from "./FooterContacts";
import { FooterNavigation } from "./FooterNavigation";

const Footer = () => (
  <footer className="pt-12 pb-8 md:pt-20 md:pb-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-10 md:mb-20">
        <FooterBrand />
        <FooterNavigation />
        <FooterContacts />
      </div>
      <div className="pt-8 border-t border-taupe-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <p className="font-body text-sm tracking-wide text-taupe-400">
          საავტორო უფლება © 2026 BeautyCode.
        </p>
        <Link
          to="/terms-and-conditions"
          className="font-body text-sm tracking-wide text-taupe-400 hover:text-taupe-500 transition-colors duration-200 no-underline"
        >
          წესები და პირობები
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
