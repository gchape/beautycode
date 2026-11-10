import { Pencil } from "lucide-react";
import type { Category } from "../../data/catalog.ts";
import { categoryIcons } from "../category-icons.ts";
import { Badge } from "../ui/badge.tsx";
import { Button } from "../ui/button.tsx";
import { Card } from "../ui/card.tsx";
import { AdminTable } from "./admin-table.tsx";

export function CategoryList({
	categories,
	onEdit,
}: {
	categories: Category[];
	onEdit?: (category: Category) => void;
}) {
	if (!categories.length)
		return (
			<Card className="px-4 py-10 text-center text-sm text-muted-foreground shadow-none">
				კატეგორიები ჯერ არ არის. დაამატეთ პირველი კატეგორია.
			</Card>
		);
	return (
		<AdminTable>
			<table>
				<caption className="sr-only">პროდუქტის კატეგორიები</caption>
				<thead>
					<tr>
						<th scope="col">კატეგორია</th>
						<th scope="col">რიგითობა</th>
						<th scope="col">ხილვადობა</th>
						{onEdit && <th scope="col">მოქმედება</th>}
					</tr>
				</thead>
				<tbody>
					{categories.map((category) => {
						const Icon = categoryIcons[category.icon];
						return (
							<tr key={category.slug}>
								<td className="lg:w-2/5">
									<div className="flex min-w-0 items-center gap-3">
										<span className="grid size-11 shrink-0 place-items-center rounded-xl bg-muted text-ring">
											<Icon size={21} aria-hidden="true" />
										</span>
										<div className="min-w-0">
											<span className="text-sm font-medium leading-relaxed">
												{category.name}
											</span>
											<p className="mt-1 mb-0 text-[0.8125rem] text-muted-foreground">
												{category.description}
											</p>
										</div>
									</div>
								</td>
								<td className="tabular-nums">
									<span className="lg:hidden">რიგი: </span>
									{category.sort_order}
								</td>
								<td>
									<Badge variant="secondary">
										{category.is_active ? "აქტიური" : "დამალული"}
									</Badge>
								</td>
								{onEdit && (
									<td>
										<Button
											variant="outline"
											className="min-h-11 gap-2 px-3 text-sm"
											onClick={() => onEdit(category)}
											aria-label={`${category.name} — რედაქტირება`}
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
}
