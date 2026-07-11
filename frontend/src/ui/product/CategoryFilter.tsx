import { Link, useSearchParams } from "react-router";
import { cn } from "src/lib/cn";

const CATEGORIES = [
  { label: "ყველა", value: "all" },
  { label: "ეპილატორი", value: "epilator" },
  { label: "სახის მოვლა", value: "facial-cleanser" },
  { label: "თმის მოვლა", value: "hair-dryer" },
];

export const CategoryFilter = () => {
  const [searchParams] = useSearchParams();
  const active = searchParams.get("category") ?? "all";

  return (
    <div className="flex gap-2 mb-12 overflow-x-auto pb-3 no-scrollbar">
      {CATEGORIES.map(({ label, value }) => (
        <Link
          key={value}
          to={value === "all" ? "/products" : `/products?category=${value}`}
          className={cn(
            "inline-flex items-center rounded-full px-4 py-2 whitespace-nowrap font-label tracking-widest uppercase text-xs transition-all duration-200 no-underline",
            active === value
              ? "bg-accent text-accent-content shadow-sm"
              : "bg-base-200 text-taupe-500 hover:bg-pink-100 hover:text-taupe-700",
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};
