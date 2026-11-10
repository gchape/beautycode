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
					<div className="my-6 flex flex-wrap items-center justify-between gap-4">
						<div>
							<h2 className="m-0 text-xl font-semibold">პროდუქტები</h2>
							<p className="mt-1 mb-0 text-sm text-muted-foreground">
								მართეთ ფასები, მარაგი და გამოქვეყნების სტატუსი.
							</p>
						</div>
						<Button
							className="min-h-11 gap-2 px-4 text-sm"
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
