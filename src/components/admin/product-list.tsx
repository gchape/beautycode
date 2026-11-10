import { Package, Pencil, Search, Star, X } from "lucide-react";
import { memo, useDeferredValue, useMemo, useState } from "react";
import {
	type AdminProduct,
	type Category,
	coverImage,
	finalPrice,
	money,
} from "../../data/catalog.ts";
import { statusLabels, stockLabels } from "../../data/labels.ts";
import { productImageProps } from "../../lib/product-images.ts";
import { Button } from "../ui/button.tsx";
import { Card } from "../ui/card.tsx";
import { Input } from "../ui/input.tsx";
import { Select } from "../ui/select.tsx";
import { AdminTable } from "./admin-table.tsx";
import { ProductStatusBadge } from "./product-status.tsx";

export function ProductList({
	products,
	categories,
	onEdit,
}: {
	products: AdminProduct[];
	categories: Category[];
	onEdit?: (product: AdminProduct) => void;
}) {
	const [query, setQuery] = useState("");
	const [status, setStatus] = useState("");
	const [category, setCategory] = useState("");
	const deferredQuery = useDeferredValue(query);
	const term = deferredQuery.trim().toLowerCase();
	const rows = useMemo(
		() =>
			products.filter(
				(product) =>
					(!status || product.status === status) &&
					(!category || product.category_slug === category) &&
					`${product.name} ${product.sku || ""}`.toLowerCase().includes(term),
			),
		[products, status, category, term],
	);
	const filtered = Boolean(query || status || category);
	function clear() {
		setQuery("");
		setStatus("");
		setCategory("");
	}
	return (
		<>
			<div className="mb-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_200px_220px]">
				<div className="relative col-span-full lg:col-span-1">
					<Search
						size={18}
						className="pointer-events-none absolute top-3.5 left-3 text-muted-foreground"
						aria-hidden="true"
					/>
					<Input
						className="pl-10 text-base"
						type="search"
						aria-label="პროდუქტის ძებნა"
						placeholder="დასახელება ან კოდი"
						value={query}
						maxLength={200}
						onChange={(event) => setQuery(event.target.value)}
					/>
				</div>
				<Select
					aria-label="სტატუსით გაფილტვრა"
					value={status}
					onChange={(event) => setStatus(event.target.value)}
				>
					<option value="">ყველა სტატუსი</option>
					{Object.entries(statusLabels).map(([value, label]) => (
						<option key={value} value={value}>
							{label}
						</option>
					))}
				</Select>
				<Select
					aria-label="კატეგორიით გაფილტვრა"
					value={category}
					onChange={(event) => setCategory(event.target.value)}
				>
					<option value="">ყველა კატეგორია</option>
					{categories.map((item) => (
						<option key={item.slug} value={item.slug}>
							{item.name}
						</option>
					))}
				</Select>
			</div>
			<div className="mb-3 flex min-h-11 items-center justify-between gap-3 text-sm">
				<span role="status" className="text-muted-foreground">
					ნაჩვენებია {rows.length} / {products.length} პროდუქტი
				</span>
				{filtered && (
					<Button
						variant="ghost"
						className="min-h-11 gap-2 px-3 text-sm"
						onClick={clear}
					>
						<X size={15} aria-hidden="true" />
						გასუფთავება
					</Button>
				)}
			</div>
			{rows.length > 0 ? (
				<div aria-busy={query !== deferredQuery}>
					<ProductTable rows={rows} onEdit={onEdit} />
				</div>
			) : (
				<Card className="items-center gap-0 px-4 py-10 text-center shadow-none">
					<Search
						size={28}
						className="mx-auto mb-4 text-muted-foreground"
						aria-hidden="true"
					/>
					<h3 className="mb-2 text-lg">პროდუქტი ვერ მოიძებნა</h3>
					<p className="mb-5 text-sm text-muted-foreground">
						შეცვალეთ საძიებო სიტყვა ან გაასუფთავეთ ფილტრები.
					</p>
					{filtered && (
						<Button variant="outline" onClick={clear}>
							ფილტრების გასუფთავება
						</Button>
					)}
				</Card>
			)}
		</>
	);
}

// Keep the image-heavy table out of the urgent search-input render.
const ProductTable = memo(function ProductTable({
	rows,
	onEdit,
}: {
	rows: AdminProduct[];
	onEdit?: (product: AdminProduct) => void;
}) {
	return (
		<AdminTable>
			<table>
				<caption className="sr-only">პროდუქტების კატალოგი</caption>
				<thead>
					<tr>
						<th scope="col">პროდუქტი</th>
						<th scope="col">ფასი</th>
						<th scope="col">სტატუსი</th>
						{onEdit && <th scope="col">მოქმედება</th>}
					</tr>
				</thead>
				<tbody>
					{rows.map((product) => {
						const cover = coverImage(product);
						return (
							<tr key={product.id}>
								<td className="lg:w-2/5">
									<div className="flex min-w-0 items-center gap-3">
										<div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-border/60 bg-muted/50">
											{cover ? (
												<img
													{...productImageProps(cover, "56px", "thumbnail")}
													alt=""
													width="56"
													height="56"
													className="size-full object-contain p-1"
													loading="lazy"
												/>
											) : (
												<Package
													size={22}
													className="text-muted-foreground"
													aria-hidden="true"
												/>
											)}
										</div>
										<div className="min-w-0">
											<span className="text-sm font-medium leading-relaxed">
												{product.name}
											</span>
											{product.is_featured && (
												<Star
													size={14}
													className="ml-2 inline fill-amber-100 text-amber-700"
													aria-label="მთავარ გვერდზე"
												/>
											)}
											<p className="mt-1 mb-0 text-[0.8125rem] text-muted-foreground">
												{product.sku || product.brand || "კოდის გარეშე"}
											</p>
										</div>
									</div>
								</td>
								<td className="font-medium tabular-nums">
									{money(finalPrice(product))}
								</td>
								<td>
									<ProductStatusBadge status={product.status} />
									<p className="mt-2 mb-0 text-[0.8125rem] text-muted-foreground">
										{stockLabels[product.stock_status]}
									</p>
								</td>
								{onEdit && (
									<td>
										<Button
											variant="outline"
											className="min-h-11 gap-2 px-3 text-sm"
											onClick={() => onEdit(product)}
											aria-label={`${product.name} — რედაქტირება`}
										>
											<Pencil size={15} aria-hidden="true" />
											რედაქტირება
										</Button>
									</td>
								)}
							</tr>
						);
					})}
				</tbody>
			</table>
		</AdminTable>
	);
});
