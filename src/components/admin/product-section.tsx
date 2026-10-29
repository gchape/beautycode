import { Plus } from "lucide-react";
import { Tabs } from "radix-ui";
import { useState } from "react";
import type { AdminProduct, Category } from "../../data/catalog.ts";
import { Button } from "../ui/button.tsx";
import { ProductEditor } from "./product-editor.tsx";
import { ProductList } from "./product-list.tsx";

export function ProductSection({
	products,
	categories,
	onSaved,
}: {
	products: AdminProduct[];
	categories: Category[];
	onSaved: () => void;
}) {
	const [editingProduct, setEditingProduct] = useState<
		AdminProduct | "new" | null
	>(null);
	function handleSaved() {
		setEditingProduct(null);
		onSaved();
	}
	return (
		<Tabs.Content value="products">
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
					<div className="my-6 flex flex-wrap items-center justify-between gap-4">
						<div>
							<h2 className="m-0 text-xl font-semibold">პროდუქტები</h2>
							<p className="mt-1 mb-0 text-xs text-muted-foreground">
								მართეთ ფასები, მარაგი და გამოქვეყნების სტატუსი.
							</p>
						</div>
						<Button
							size="sm"
							onClick={() => setEditingProduct("new")}
							disabled={!categories.length}
						>
							<Plus size={16} /> პროდუქტის დამატება
						</Button>
					</div>
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
