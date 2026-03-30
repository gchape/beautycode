import {
  FooterContacts,
  FooterLinks,
  FooterNavigation,
  FooterNewsletter,
} from "./FooterComponents";

const Footer = () => {
  return (
    <footer className="pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <FooterNewsletter />
          <FooterNavigation />
          <FooterContacts />
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-label uppercase tracking-widest text-taupe-400">
            © 2026 BeautyCode. All rights reserved.
          </p>

          <FooterLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
