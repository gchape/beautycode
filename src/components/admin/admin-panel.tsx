import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import {
	DatabaseBackup,
	Eye,
	History,
	LayoutGrid,
	Package,
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

const readOnly = import.meta.env.DEV;

export function AdminPanel() {
	const client = useQueryClient();
	const router = useRouter();
	const [tab, setTab] = useState<"products" | "categories" | "audit">(
		"products",
	);
	const [notice, setNotice] = useState("");
	const { products, categories, audit } = useAdminData(tab);
	function handleSaved() {
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
		<section className="mx-auto w-[min(1240px,calc(100%-80px))] max-[1100px]:w-[calc(100%-48px)] max-[560px]:w-[calc(100%-32px)] min-h-[60vh] pt-8 pb-20 [&>h1]:mt-4 [&>h1]:mb-6 [&>h1]:text-4xl max-[560px]:[&>h1]:text-3xl max-w-300 [&_select]:w-full [&_select]:rounded-md [&_select]:border [&_select]:border-border [&_select]:bg-background [&_select]:p-2.5 [&_textarea]:w-full [&_textarea]:rounded-md [&_textarea]:border [&_textarea]:border-border [&_textarea]:bg-background [&_textarea]:p-2.5 **:[[role=alert]]:text-destructive">
			<div className="flex flex-wrap items-end justify-between gap-4">
				<div>
					<p className="mb-2 text-xs font-medium tracking-[0.18em] text-muted-foreground">
						BEAUTY CODE / ADMIN
					</p>
					<h1 className="m-0 text-3xl font-semibold tracking-tight sm:text-4xl">
						კატალოგის მართვა
					</h1>
					<p className="mt-2 mb-0 text-sm text-muted-foreground">
						პროდუქტები, კატეგორიები და ცვლილებები — ერთ სივრცეში.
					</p>
				</div>
				<Button
					variant="outline"
					size="sm"
					disabled={readOnly || backup.isPending}
					onClick={() => backup.mutate()}
				>
					<DatabaseBackup size={16} />
					{backup.isPending ? "მიმდინარეობს…" : "სარეზერვო ასლი"}
				</Button>
			</div>
			<CatalogOverview
				products={products.data || []}
				pending={products.isPending}
			/>
			{readOnly && (
				<p
					className="mb-6 flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900"
					role="status"
				>
					<Eye size={16} className="shrink-0" /> მხოლოდ დათვალიერება —
					დეველოპმენტში ცვლილებების შენახვა გამორთულია.
				</p>
			)}
			<Tabs.Root
				value={tab}
				onValueChange={(value) => setTab(value as typeof tab)}
			>
				<div className="my-5 flex flex-wrap items-center gap-3 [&>input]:max-w-80 [&_select]:w-auto [&_select]:max-w-full">
					<Tabs.List
						className="flex w-full gap-1 overflow-x-auto border-b border-border"
						aria-label="ადმინისტრირების სექციები"
					>
						{tabs.map(([value, label, Icon]) => (
							<Tabs.Trigger
								key={value}
								value={value}
								className="flex shrink-0 items-center gap-2 border-b-2 border-transparent bg-transparent px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-primary data-[state=active]:border-primary data-[state=active]:text-primary"
							>
								<Icon size={16} aria-hidden="true" />
								{label}
							</Tabs.Trigger>
						))}
					</Tabs.List>
				</div>
				{notice && (
					<p
						role="status"
						className="my-4 rounded-lg border border-border bg-muted px-4 py-3 text-sm"
					>
						{notice}
					</p>
				)}
				{error && <p role="alert">{error.message}</p>}
				{(products.isPending || categories.isPending) && (
					<p role="status">იტვირთება…</p>
				)}
				<ProductSection
					products={products.data || []}
					categories={categories.data || []}
					readOnly={readOnly}
					onSaved={handleSaved}
				/>
				<CategorySection
					categories={categories.data || []}
					readOnly={readOnly}
					onSaved={handleSaved}
				/>
				<Tabs.Content value="audit">
					<AuditLog entries={audit.data || []} pending={audit.isPending} />
				</Tabs.Content>
			</Tabs.Root>
		</section>
	);
}
