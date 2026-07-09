import { CATEGORIES } from "src/constants";
import { useCategory } from "../categoryContext";

export const ProductCategories = () => {
  const [activeCategory, setCategory] = useCategory();

  return (
    <div className="flex gap-2 mb-12 overflow-x-auto pb-3 no-scrollbar">
      {CATEGORIES.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setCategory(value)}
          className={`btn btn-sm rounded-full whitespace-nowrap font-label
                      tracking-widest uppercase text-xs transition-all duration-200
                      ${
                        activeCategory === value
                          ? "btn-accent shadow-sm"
                          : "bg-base-200 text-taupe-500 border-0 hover:bg-pink-100 hover:text-taupe-700"
                      }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
