import { CATEGORIES } from "../data";

const CategoryFilter = ({ active, onChange }) => (
  <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
    {CATEGORIES.map((category) => (
      <button
        key={category.value}
        onClick={() => onChange(category.value)}
        className={`px-8 py-2.5 rounded-full font-label text-xs uppercase tracking-widest transition-all duration-300 whitespace-nowrap cursor-pointer
          ${
            active === category.value
              ? "bg-pink-100 text-taupe-600"
              : "bg-pink-50 text-taupe-500 hover:bg-pink-100"
          }`}
      >
        {category.label}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
