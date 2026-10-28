import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import type { Category, Product } from "../../data/catalog";
import { adminApi } from "../../lib/admin/api";
import { Button } from "../ui/button";
import { type AuditEntry, AuditLog } from "./audit-log";
import { CategoryEditor } from "./category-editor";
import { CategoryList } from "./category-list";
import { ProductEditor } from "./product-editor";
import { ProductList } from "./product-list";

export function AdminPanel() {
	const client = useQueryClient();
	const router = useRouter();
	const [tab, setTab] = useState<"products" | "categories" | "audit">(
		"products",
	);
	const [editingProduct, setEditingProduct] = useState<Product | "new" | null>(
		null,
	);
	const [editingCategory, setEditingCategory] = useState<
		Category | "new" | null
	>(null);
	const [notice, setNotice] = useState("");
	const products = useQuery({
		queryKey: ["admin", "products"],
		queryFn: () => adminApi<Product[]>("products"),
		retry: false,
	});
	const categories = useQuery({
		queryKey: ["admin", "categories"],
		queryFn: () => adminApi<Category[]>("categories"),
		retry: false,
	});
	const audit = useQuery({
		queryKey: ["admin", "audit"],
		queryFn: () => adminApi<AuditEntry[]>("audit"),
		enabled: tab === "audit",
		retry: false,
	});
	function saved() {
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
			<div className="admin-actions">
				{(
					[
						["products", "პროდუქტები"],
						["categories", "კატეგორიები"],
						["audit", "ცვლილებების ისტორია"],
					] as const
				).map(([value, label]) => (
					<Button
						key={value}
						variant={tab === value ? "default" : "outline"}
						onClick={() => setTab(value)}
					>
						{label}
					</Button>
				))}
				<Button
					variant="outline"
					disabled={backup.isPending}
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
			{tab === "products" &&
				(editingProduct ? (
					<ProductEditor
						key={editingProduct === "new" ? "new" : editingProduct.id}
						product={editingProduct === "new" ? undefined : editingProduct}
						categories={categories.data || []}
						onSaved={saved}
						onCancel={() => setEditingProduct(null)}
					/>
				) : (
					<>
						<Button
							onClick={() => setEditingProduct("new")}
							disabled={!categories.data?.length}
						>
							პროდუქტის დამატება
						</Button>
						<ProductList
							products={products.data || []}
							categories={categories.data || []}
							onEdit={setEditingProduct}
						/>
					</>
				))}
			{tab === "categories" &&
				(editingCategory ? (
					<CategoryEditor
						key={editingCategory === "new" ? "new" : editingCategory.slug}
						category={editingCategory === "new" ? undefined : editingCategory}
						onSaved={saved}
						onCancel={() => setEditingCategory(null)}
					/>
				) : (
					<>
						<Button onClick={() => setEditingCategory("new")}>
							კატეგორიის დამატება
						</Button>
						<CategoryList
							categories={categories.data || []}
							onEdit={setEditingCategory}
						/>
					</>
				))}
			{tab === "audit" && (
				<AuditLog entries={audit.data || []} pending={audit.isPending} />
			)}
		</section>
	);
}
