import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Tabs } from "radix-ui";
import { useState } from "react";
import type { AdminProduct, Category } from "../../data/catalog.ts";
import { adminApi } from "../../lib/admin/api.ts";
import { useAdminData } from "../../lib/admin/use-admin-data.ts";
import { Button } from "../ui/button.tsx";
import { AuditLog } from "./audit-log.tsx";
import { CategoryEditor } from "./category-editor.tsx";
import { CategoryList } from "./category-list.tsx";
import { ProductEditor } from "./product-editor.tsx";
import { ProductList } from "./product-list.tsx";

const tabs = [
	["products", "პროდუქტები"],
	["categories", "კატეგორიები"],
	["audit", "ცვლილებების ისტორია"],
] as const;

const readOnly = import.meta.env.DEV;

export function AdminPanel() {
	const client = useQueryClient();
	const router = useRouter();
	const [tab, setTab] = useState<"products" | "categories" | "audit">(
		"products",
	);
	const [editingProduct, setEditingProduct] = useState<
		AdminProduct | "new" | null
	>(null);
	const [editingCategory, setEditingCategory] = useState<
		Category | "new" | null
	>(null);
	const [notice, setNotice] = useState("");
	const { products, categories, audit } = useAdminData(tab);
	function handleSaved() {
		setEditingProduct(null);
		setEditingCategory(null);
		setNotice("შენახულია");
		void client.invalidateQueries({ queryKey: ["admin"] });
		void router.invalidate();
	}
	const backup = useMutation({
		mutationFn: () => adminApi("backup", {}),
		onMutate: () => setNotice(""),
		onSuccess: () => {
			setNotice("სარეზერვო ასლი შენახულია");
			return client.invalidateQueries({ queryKey: ["admin", "audit"] });
		},
		onError: (error) => setNotice(error.message),
	});

	const error = products.error || categories.error || audit.error;
	return (
		<section className="wrap page-section admin-panel">
			<span className="eyebrow">BEAUTY CODE</span>
			<h1>ადმინისტრირება</h1>
			{readOnly && (
				<p className="admin-read-only" role="status">
					მხოლოდ დათვალიერება — დეველოპმენტში ცვლილებების შენახვა გამორთულია.
				</p>
			)}
			<Tabs.Root
				value={tab}
				onValueChange={(value) => setTab(value as typeof tab)}
			>
				<div className="admin-actions">
					<Tabs.List
						className="admin-tabs"
						aria-label="ადმინისტრირების სექციები"
					>
						{tabs.map(([value, label]) => (
							<Tabs.Trigger key={value} value={value} className="admin-tab">
								{label}
							</Tabs.Trigger>
						))}
					</Tabs.List>
					<Button
						variant="outline"
						disabled={readOnly || backup.isPending}
						onClick={() => backup.mutate()}
					>
						{backup.isPending ? "მიმდინარეობს…" : "სარეზერვო ასლის შექმნა"}
					</Button>
				</div>
				{notice && <p role="status">{notice}</p>}
				{error && <p role="alert">{error.message}</p>}
				{(products.isPending || categories.isPending) && (
					<p role="status">იტვირთება…</p>
				)}
				<Tabs.Content value="products">
					{editingProduct ? (
						<ProductEditor
							key={editingProduct === "new" ? "new" : editingProduct.id}
							product={editingProduct === "new" ? undefined : editingProduct}
							categories={categories.data || []}
							onSaved={handleSaved}
							onCancel={() => setEditingProduct(null)}
						/>
					) : (
						<>
							<Button
								onClick={() => setEditingProduct("new")}
								disabled={readOnly || !categories.data?.length}
							>
								პროდუქტის დამატება
							</Button>
							<ProductList
								products={products.data || []}
								categories={categories.data || []}
								onEdit={readOnly ? undefined : setEditingProduct}
							/>
						</>
					)}
				</Tabs.Content>
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
							<Button
								disabled={readOnly}
								onClick={() => setEditingCategory("new")}
							>
								კატეგორიის დამატება
							</Button>
							<CategoryList
								categories={categories.data || []}
								onEdit={readOnly ? undefined : setEditingCategory}
							/>
						</>
					)}
				</Tabs.Content>
				<Tabs.Content value="audit">
					<AuditLog entries={audit.data || []} pending={audit.isPending} />
				</Tabs.Content>
			</Tabs.Root>
		</section>
	);
}
