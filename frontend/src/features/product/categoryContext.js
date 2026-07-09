import { createContext, useContext } from "react";

export const CategoryContext = createContext(null);

export const useCategory = () => useContext(CategoryContext);
