import { Link } from "react-router";
import { NAV_ITEMS } from "../../data";

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
