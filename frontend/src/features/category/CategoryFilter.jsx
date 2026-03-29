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
              ? "bg-surface-container-high text-on-primary"
              : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
          }`}
      >
        {category.label}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
