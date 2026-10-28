import { useQuery } from "@tanstack/react-query";
import type { AuditEntry } from "../../data/audit.ts";
import type { AdminProduct, Category } from "../../data/catalog.ts";
import { adminApi } from "./api.ts";
export function useAdminData(tab: string) {
	const products = useQuery({
		queryKey: ["admin", "products"],
		queryFn: () => adminApi<AdminProduct[]>("products"),
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
	return { products, categories, audit };
}
