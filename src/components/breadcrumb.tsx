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
			className="mb-[45px] flex flex-wrap gap-[13px] text-sm text-[#846d75] max-[560px]:mb-[30px]"
		>
			<BreadcrumbList className="gap-[13px] text-inherit sm:gap-[13px]">
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
