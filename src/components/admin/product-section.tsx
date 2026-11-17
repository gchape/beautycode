import { Plus } from "lucide-react";
import { Tabs } from "radix-ui";
import { useState } from "react";
import type { AdminProduct, Category } from "../../data/catalog.ts";
import { Button } from "../ui/button.tsx";
import { ProductEditor } from "./product-editor.tsx";
import { ProductList } from "./product-list.tsx";
import { AdminSectionHeader } from "./section-header.tsx";

export function ProductSection({
	products,
	categories,
	onSaved,
}: {
	products: AdminProduct[];
	categories: Category[];
	onSaved: () => Promise<void>;
}) {
	const [editingProduct, setEditingProduct] = useState<
		AdminProduct | "new" | null
	>(null);
	async function handleSaved() {
		await onSaved();
		setEditingProduct(null);
	}
	return (
		<Tabs.Content
			value="products"
			forceMount
			className="data-[state=inactive]:hidden"
		>
			{editingProduct ? (
				<ProductEditor
					key={editingProduct === "new" ? "new" : editingProduct.id}
					product={editingProduct === "new" ? undefined : editingProduct}
					categories={categories}
					onSaved={handleSaved}
					onCancel={() => setEditingProduct(null)}
				/>
			) : (
				<>
					<AdminSectionHeader
						title="პროდუქტები"
						description="მართეთ ფასები, მარაგი და გამოქვეყნების სტატუსი."
					>
						<Button
							size="compact"
							className="px-4"
							onClick={() => setEditingProduct("new")}
							disabled={!categories.length}
						>
							<Plus size={16} /> პროდუქტის დამატება
						</Button>
					</AdminSectionHeader>
					<ProductList
						products={products}
						categories={categories}
						onEdit={setEditingProduct}
					/>
				</>
			)}
		</Tabs.Content>
	);
}
