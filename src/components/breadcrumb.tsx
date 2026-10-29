import { Link } from "@tanstack/react-router";
import {
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	Breadcrumb as BreadcrumbRoot,
	BreadcrumbSeparator,
} from "./ui/breadcrumb.tsx";

export function Breadcrumb({ title }: { title: string }) {
	return (
		<BreadcrumbRoot
			aria-label="გვერდის მდებარეობა"
			className="mb-11.25 flex flex-wrap gap-3.25 text-sm text-[#846d75] max-[560px]:mb-7.5"
		>
			<BreadcrumbList className="gap-3.25 text-inherit sm:gap-3.25">
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link to="/">მთავარი</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>/</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbPage className="text-inherit">{title}</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</BreadcrumbRoot>
	);
}
