import type { AuditEntry } from "../../data/audit.ts";
import { LoadingSpinner } from "../ui/loading-spinner.tsx";
import { AdminTable } from "./admin-table.tsx";
import { AdminSectionHeader } from "./section-header.tsx";

export function AuditLog({
	entries,
	pending,
}: {
	entries: AuditEntry[];
	pending: boolean;
}) {
	return (
		<>
			<AdminSectionHeader
				title="ისტორია"
				description="კატალოგში შეტანილი ბოლო ცვლილებები."
			/>
			{pending && (
				<p
					role="status"
					className="my-4 flex items-center gap-2 text-sm text-muted-foreground"
				>
					<LoadingSpinner size={16} />
					ისტორია იტვირთება…
				</p>
			)}
			<AdminTable>
				<table aria-busy={pending}>
					<caption className="sr-only">კატალოგის ცვლილებების ისტორია</caption>
					<thead>
						<tr>
							<th scope="col">თარიღი</th>
							<th scope="col">მომხმარებელი</th>
							<th scope="col">მოქმედება</th>
							<th scope="col">ჩანაწერი</th>
						</tr>
					</thead>
					<tbody>
						{entries.map((entry) => (
							<tr key={entry.id}>
								<td>{entry.created_at}</td>
								<td>
									<span className="block text-xs text-muted-foreground lg:hidden">
										მომხმარებელი
									</span>
									{entry.username}
								</td>
								<td>
									<span className="block text-xs text-muted-foreground lg:hidden">
										მოქმედება
									</span>
									{entry.action}
								</td>
								<td>
									{entry.entity}: {entry.entity_id}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{!pending && !entries.length && (
					<p className="px-5 py-12 text-center text-sm text-muted-foreground">
						ცვლილებები ჯერ არ არის.
					</p>
				)}
			</AdminTable>
		</>
	);
}
