import { Package, Search, Star } from "lucide-react";
import { useState } from "react";
import type { AdminProduct, Category } from "../../data/catalog.ts";
import { coverImage, finalPrice, money } from "../../data/catalog.ts";
import { statusLabels, stockLabels } from "../../data/labels.ts";
import { Button } from "../ui/button.tsx";
import { Input } from "../ui/input.tsx";
import { Select, SelectItem } from "../ui/select.tsx";
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
	const rows = products.filter(
		(p) =>
			(!status || p.status === status) &&
			(!category || p.category_slug === category) &&
			`${p.name} ${p.sku || ""}`.toLowerCase().includes(query.toLowerCase()),
	);
	return (
		<>
			<div className="mb-4 grid gap-3 rounded-xl border border-border bg-muted/30 p-3 sm:grid-cols-[1fr_180px_200px]">
				<div className="relative">
					<Search
						size={16}
						className="pointer-events-none absolute top-3 left-3 text-muted-foreground"
					/>
					<Input
						className="h-10 bg-white pl-9"
						aria-label="პროდუქტის ძებნა"
						placeholder="დასახელება ან კოდი"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</div>
				<Select
					aria-label="სტატუსით გაფილტვრა"
					value={status || "all"}
					onValueChange={(value) => setStatus(value === "all" ? "" : value)}
				>
					<SelectItem value="all">ყველა სტატუსი</SelectItem>
					{Object.entries(statusLabels).map(([value, label]) => (
						<SelectItem key={value} value={value}>
							{label}
						</SelectItem>
					))}
				</Select>
				<Select
					aria-label="კატეგორიით გაფილტვრა"
					value={category || "all"}
					onValueChange={(value) => setCategory(value === "all" ? "" : value)}
				>
					<SelectItem value="all">ყველა კატეგორია</SelectItem>
					{categories.map((c) => (
						<SelectItem key={c.slug} value={c.slug}>
							{c.name}
						</SelectItem>
					))}
				</Select>
			</div>
			<p className="mb-3 text-xs text-muted-foreground" role="status">
				ნაჩვენებია {rows.length} / {products.length} პროდუქტი
			</p>
			<AdminTable>
				<table>
					<thead>
						<tr>
							<th scope="col">პროდუქტი</th>
							<th scope="col">ფასი</th>
							<th scope="col">სტატუსი</th>
							{onEdit && <th scope="col">მოქმედება</th>}
						</tr>
					</thead>
					<tbody>
						{rows.map((p) => (
							<tr key={p.id}>
								<td>
									<div className="flex min-w-[220px] items-center gap-3">
										<div className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-muted">
											{coverImage(p) ? (
												<img
													src={coverImage(p)}
													alt=""
													className="size-full object-contain p-1"
													loading="lazy"
												/>
											) : (
												<Package size={20} className="text-muted-foreground" />
											)}
										</div>
										<div>
											<span className="font-medium">{p.name}</span>
											{p.is_featured && (
												<Star
													size={12}
													className="ml-2 inline text-amber-600"
													aria-label="მთავარ გვერდზე"
												/>
											)}
											<p className="mt-1 mb-0 text-xs text-muted-foreground">
												{p.sku || "კოდის გარეშე"} ·{" "}
												{stockLabels[p.stock_status]}
											</p>
										</div>
									</div>
								</td>
								<td className="font-medium whitespace-nowrap tabular-nums">
									{money(finalPrice(p))}
								</td>
								<td>
									<ProductStatusBadge status={p.status} />
								</td>
								{onEdit && (
									<td>
										<Button
											size="sm"
											variant="outline"
											onClick={() => onEdit(p)}
										>
											რედაქტირება
										</Button>
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
				{!rows.length && (
					<p className="px-5 py-12 text-center text-sm text-muted-foreground">
						პროდუქტი ვერ მოიძებნა. შეცვალეთ ძებნა ან ფილტრები.
					</p>
				)}
			</AdminTable>
		</>
	);
}
