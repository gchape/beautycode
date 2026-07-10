import { useState, type ReactNode } from "react";
import { CategoryContext } from "./categoryContext";
import type { CategoryValue } from "./types";

interface CategoryProviderProps {
  children: ReactNode;
}

const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [productCategory, setProductCategory] = useState<CategoryValue>("all");

  return (
    <CategoryContext.Provider value={[productCategory, setProductCategory]}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
