import { useContext } from "react";
import { CATEGORIES } from "../../data";
import { CategoryContext } from "../../providers/categoryContext";

export const ProductCategories = () => {
  const [productCategory, setProductCategory] = useContext(CategoryContext);

  return (
    <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
      {CATEGORIES.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setProductCategory(value)}
          className={`px-8 py-2.5 rounded-full text-sm font-bold tracking-widest transition-all duration-300 whitespace-nowrap cursor-pointer
            ${
              productCategory === value
                ? "bg-pink-100 text-taupe-600"
                : "bg-pink-50 text-taupe-500 hover:bg-pink-100"
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
