import { Plus } from "lucide-react";
import { Tabs } from "radix-ui";
import { useState } from "react";
import type { Category } from "../../data/catalog.ts";
import { Button } from "../ui/button.tsx";
import { CategoryEditor } from "./category-editor.tsx";
import { CategoryList } from "./category-list.tsx";
import { AdminSectionHeader } from "./section-header.tsx";

export function CategorySection({
	categories,
	onSaved,
}: {
	categories: Category[];
	onSaved: () => Promise<void>;
}) {
	const [editingCategory, setEditingCategory] = useState<
		Category | "new" | null
	>(null);
	async function handleSaved() {
		await onSaved();
		setEditingCategory(null);
	}
	return (
		<Tabs.Content
			value="categories"
			forceMount
			className="data-[state=inactive]:hidden"
		>
			{editingCategory ? (
				<CategoryEditor
					key={editingCategory === "new" ? "new" : editingCategory.slug}
					category={editingCategory === "new" ? undefined : editingCategory}
					onSaved={handleSaved}
					onCancel={() => setEditingCategory(null)}
				/>
			) : (
				<>
					<AdminSectionHeader
						title="კატეგორიები"
						description="დაალაგეთ კატეგორიები და მართეთ მათი ხილვადობა."
					>
						<Button
							size="compact"
							className="px-4"
							onClick={() => setEditingCategory("new")}
						>
							<Plus size={16} /> კატეგორიის დამატება
						</Button>
					</AdminSectionHeader>
					<CategoryList categories={categories} onEdit={setEditingCategory} />
				</>
			)}
		</Tabs.Content>
	);
}
