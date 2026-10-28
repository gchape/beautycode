import { createContext, type ReactNode, useContext } from "react";
import type { Category } from "../../data/catalog.ts";

const CategoryContext = createContext<Category[]>([]);

export const useCategories = () => useContext(CategoryContext);

export function CategoryProvider({
	categories,
	children,
}: {
	categories: Category[];
	children: ReactNode;
}) {
	return (
		<CategoryContext.Provider value={categories}>
			{children}
		</CategoryContext.Provider>
	);
}
