import { useQuery } from "@tanstack/react-query";
import type { AuditEntry } from "../../data/audit.ts";
import type { AdminProduct, Category } from "../../data/catalog.ts";
import { adminApi } from "./api.ts";

const useAdminQuery = <T>(resource: string, enabled = true) =>
	useQuery({
		queryKey: ["admin", resource],
		queryFn: () => adminApi<T>(resource),
		enabled,
		retry: false,
	});

export function useAdminData(tab: string) {
	return {
		products: useAdminQuery<AdminProduct[]>("products"),
		categories: useAdminQuery<Category[]>("categories"),
		audit: useAdminQuery<AuditEntry[]>("audit", tab === "audit"),
	};
}
