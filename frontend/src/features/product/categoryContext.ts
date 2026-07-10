import { createContext, useContext } from "react";
import type { CategoryContextValue } from "./types";

export const CategoryContext = createContext<CategoryContextValue | null>(null);

export const useCategory = (): CategoryContextValue => {
  const ctx = useContext(CategoryContext);
  if (!ctx) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return ctx;
};
