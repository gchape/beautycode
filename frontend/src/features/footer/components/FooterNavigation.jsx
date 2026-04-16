import { Link } from "react-router";
import { NAV_ITEMS } from "src/constants";

export const FooterNavigation = () => (
  <div>
    <h5 className="text-xs uppercase tracking-[0.2em] text-taupe-600 mb-4">
      ნავიგაცია
    </h5>
    <ul className="flex flex-col p-0 gap-2.5 list-none">
      {NAV_ITEMS.map((item) => (
        <li key={item.label}>
          <Link
            to={item.to}
            className="text-taupe-500 hover:text-taupe-700 transition-colors duration-200"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
