import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { DatabaseBackup, History, LayoutGrid, Package, X } from "lucide-react";
import { Tabs } from "radix-ui";
import { Activity, useState } from "react";
import { adminApi } from "../../lib/admin/api.ts";
import { useAdminData } from "../../lib/admin/use-admin-data.ts";
import { catalogQueryKey } from "../../lib/catalog-queries.ts";
import { Button } from "../ui/button.tsx";
import { LoadingSpinner } from "../ui/loading-spinner.tsx";
import { AuditLog } from "./audit-log.tsx";
import { CatalogOverview } from "./catalog-overview.tsx";
import { CategorySection } from "./category-section.tsx";
import { ProductSection } from "./product-section.tsx";

const tabs = [
	["products", "პროდუქტები", Package],
	["categories", "კატეგორიები", LayoutGrid],
	["audit", "ისტორია", History],
] as const;

export function AdminPanel() {
	const client = useQueryClient();
	const router = useRouter();
	const [tab, setTab] = useState<"products" | "categories" | "audit">(
		"products",
	);
	const [notice, setNotice] = useState<{
		message: string;
		error?: boolean;
	} | null>(null);
	const { products, categories, audit } = useAdminData(tab);
	async function handleSaved() {
		await Promise.all([
			client.invalidateQueries({ queryKey: ["admin"] }),
			client.invalidateQueries({ queryKey: catalogQueryKey }),
		]);
		await router.invalidate();
		setNotice({ message: "ცვლილებები შენახულია" });
	}
	const backup = useMutation({
		mutationFn: () => adminApi("backup", {}),
		onMutate: () => setNotice(null),
		onSuccess: () => {
			setNotice({ message: "სარეზერვო ასლი შენახულია" });
			return client.invalidateQueries({ queryKey: ["admin", "audit"] });
		},
		onError: (error) => setNotice({ message: error.message, error: true }),
	});
	const error = products.error || categories.error || audit.error;
	const ready = products.data && categories.data;
	return (
		<section
			className="admin-panel site-container page-section"
			aria-labelledby="admin-title"
		>
			<div className="flex flex-wrap items-center justify-between gap-5">
				<h1 id="admin-title" className="heading-section m-0">
					კატალოგის მართვა
				</h1>
				<Button
					size="compact"
					variant="outline"
					className="min-w-44 px-4"
					disabled={backup.isPending}
					onClick={() => backup.mutate()}
				>
					{backup.isPending ? (
						<LoadingSpinner size={17} />
					) : (
						<DatabaseBackup size={17} aria-hidden="true" />
					)}
					{backup.isPending ? "იქმნება…" : "სარეზერვო ასლი"}
				</Button>
			</div>
			<CatalogOverview
				products={products.data || []}
				pending={products.isPending}
			/>
			{import.meta.env.DEV && (
				<p
					className="mb-4 border-l-2 border-ring/30 pl-3 text-sm text-muted-foreground"
					role="status"
				>
					საცდელი გარემო — აქ შეტანილი ცვლილებები მთავარ საიტზე არ აისახება.
				</p>
			)}
			<Tabs.Root
				value={tab}
				onValueChange={(value) => setTab(value as typeof tab)}
			>
				<Tabs.List
					className="catalog-toolbar grid grid-cols-3 gap-1.5 p-1.5 sm:flex"
					aria-label="ადმინისტრირების სექციები"
				>
					{tabs.map(([value, label, Icon]) => (
						<Tabs.Trigger
							key={value}
							value={value}
							className="flex min-h-11 min-w-0 items-center sm:min-h-9 justify-center gap-2 rounded-lg border border-border px-2 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-primary data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:px-6 sm:text-sm"
						>
							<Icon
								size={17}
								aria-hidden="true"
								className="hidden shrink-0 sm:block"
							/>
							{label}
						</Tabs.Trigger>
					))}
				</Tabs.List>
				{notice && (
					<div
						role={notice.error ? "alert" : "status"}
						className={`admin-notice flex items-center gap-3 rounded-lg border bg-background p-3 text-sm ${notice.error ? "border-destructive/30 text-destructive" : "bg-muted"}`}
					>
						<span className="flex-1 leading-relaxed">{notice.message}</span>
						<Button
							variant="ghost"
							size="icon-lg"
							onClick={() => setNotice(null)}
							aria-label="შეტყობინების დახურვა"
						>
							<X size={16} />
						</Button>
					</div>
				)}
				{error && (
					<div role="alert" className="my-5 text-sm text-destructive">
						<p className="mb-3">{error.message}</p>
						<Button
							size="compact"
							variant="outline"
							className="px-4"
							onClick={() =>
								void client.invalidateQueries({ queryKey: ["admin"] })
							}
						>
							ხელახლა ცდა
						</Button>
					</div>
				)}
				{!ready && !error && (
					<p
						role="status"
						className="my-8 flex min-h-64 items-start gap-3 text-sm text-muted-foreground"
					>
						<LoadingSpinner size={19} />
						კატალოგი იტვირთება…
					</p>
				)}
				{ready && (
					<>
						<Activity mode={tab === "products" ? "visible" : "hidden"}>
							<ProductSection
								products={products.data || []}
								categories={categories.data || []}
								onSaved={handleSaved}
							/>
						</Activity>
						<Activity mode={tab === "categories" ? "visible" : "hidden"}>
							<CategorySection
								categories={categories.data || []}
								onSaved={handleSaved}
							/>
						</Activity>
					</>
				)}
				<Tabs.Content value="audit">
					<AuditLog entries={audit.data || []} pending={audit.isPending} />
				</Tabs.Content>
			</Tabs.Root>
		</section>
	);
}
