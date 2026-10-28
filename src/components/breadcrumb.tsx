import { Link } from "@tanstack/react-router";
import {
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	Breadcrumb as BreadcrumbRoot,
	BreadcrumbSeparator,
} from "./ui/breadcrumb";
export function Breadcrumb({ title }: { title: string }) {
	return (
		<BreadcrumbRoot aria-label="გვერდის მდებარეობა" className="breadcrumb">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link to="/">მთავარი</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>/</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbPage>{title}</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</BreadcrumbRoot>
	);
}
