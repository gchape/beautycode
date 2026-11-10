import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import {
	DatabaseBackup,
	History,
	LayoutGrid,
	LoaderCircle,
	Package,
	X,
} from "lucide-react";
import { Tabs } from "radix-ui";
import { useState } from "react";
import { adminApi } from "../../lib/admin/api.ts";
import { useAdminData } from "../../lib/admin/use-admin-data.ts";
import { Button } from "../ui/button.tsx";
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
	function handleSaved() {
		setNotice({ message: "ცვლილებები შენახულია" });
		void client.invalidateQueries({ queryKey: ["admin"] });
		void router.invalidate();
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
			className="site-container min-h-[60vh] py-8 sm:py-10"
			aria-labelledby="admin-title"
		>
			<div className="flex flex-wrap items-center justify-between gap-5">
				<h1
					id="admin-title"
					className="m-0 text-[clamp(1.75rem,3vw,2.25rem)] leading-relaxed"
				>
					კატალოგის მართვა
				</h1>
				<Button
					variant="outline"
					className="min-h-11 gap-2 px-4 text-sm"
					disabled={backup.isPending}
					onClick={() => backup.mutate()}
				>
					{backup.isPending ? (
						<LoaderCircle
							size={17}
							className="motion-safe:animate-spin"
							aria-hidden="true"
						/>
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
					className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
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
					className="grid grid-cols-3 border-b border-border sm:flex"
					aria-label="ადმინისტრირების სექციები"
				>
					{tabs.map(([value, label, Icon]) => (
						<Tabs.Trigger
							key={value}
							value={value}
							className="flex min-w-0 items-center justify-center gap-2 border-b-2 border-transparent px-1 py-3 text-xs text-muted-foreground transition-colors hover:text-primary data-[state=active]:border-primary data-[state=active]:text-primary sm:px-5 sm:text-sm"
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
						className={`my-5 flex items-center gap-3 rounded-lg border p-3 text-sm ${notice.error ? "border-destructive/30 text-destructive" : "bg-muted"}`}
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
							variant="outline"
							className="min-h-11 px-4 text-sm"
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
						className="my-8 flex items-center gap-3 text-sm text-muted-foreground"
					>
						<LoaderCircle
							size={19}
							className="motion-safe:animate-spin"
							aria-hidden="true"
						/>
						კატალოგი იტვირთება…
					</p>
				)}
				{ready && (
					<>
						<ProductSection
							products={products.data || []}
							categories={categories.data || []}
							onSaved={handleSaved}
						/>
						<CategorySection
							categories={categories.data || []}
							onSaved={handleSaved}
						/>
					</>
				)}
				<Tabs.Content value="audit">
					<AuditLog entries={audit.data || []} pending={audit.isPending} />
				</Tabs.Content>
			</Tabs.Root>
		</section>
	);
}
