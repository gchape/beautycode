import { Plus } from "lucide-react";
import { Tabs } from "radix-ui";
import { useState } from "react";
import type { Category } from "../../data/catalog.ts";
import { Button } from "../ui/button.tsx";
import { CategoryEditor } from "./category-editor.tsx";
import { CategoryList } from "./category-list.tsx";

export function CategorySection({
	categories,
	onSaved,
}: {
	categories: Category[];
	onSaved: () => void;
}) {
	const [editingCategory, setEditingCategory] = useState<
		Category | "new" | null
	>(null);
	function handleSaved() {
		setEditingCategory(null);
		onSaved();
	}
	return (
		<Tabs.Content value="categories">
			{editingCategory ? (
				<CategoryEditor
					key={editingCategory === "new" ? "new" : editingCategory.slug}
					category={editingCategory === "new" ? undefined : editingCategory}
					onSaved={handleSaved}
					onCancel={() => setEditingCategory(null)}
				/>
			) : (
				<>
					<div className="my-6 flex flex-wrap items-center justify-between gap-4">
						<div>
							<h2 className="m-0 text-xl font-semibold">კატეგორიები</h2>
							<p className="mt-1 mb-0 text-xs text-muted-foreground">
								დაალაგეთ კატეგორიები და მართეთ მათი ხილვადობა.
							</p>
						</div>
						<Button size="sm" onClick={() => setEditingCategory("new")}>
							<Plus size={16} /> კატეგორიის დამატება
						</Button>
					</div>
					<CategoryList categories={categories} onEdit={setEditingCategory} />
				</>
			)}
		</Tabs.Content>
	);
}
