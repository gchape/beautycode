import { Link } from "react-router";
import { LEGAL_LINKS } from "src/constants";

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
