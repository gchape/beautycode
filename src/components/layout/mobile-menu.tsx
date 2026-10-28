import { Link, useRouter } from "@tanstack/react-router";
import { ChevronRight, Grid2X2, Menu, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useCategories } from "../catalog/category-context.tsx";
import { categoryIcons } from "../category-icons.ts";
import { useOpenChat } from "../contact/contact-context.tsx";
import { Button } from "../ui/button.tsx";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet.tsx";

export function MobileMenu() {
	const [menu, setMenu] = useState(false);
	const openChat = useOpenChat();
	const router = useRouter();
	useEffect(
		() => router.subscribe("onResolved", () => setMenu(false)),
		[router],
	);
	return (
		<Sheet open={menu} onOpenChange={setMenu}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="size-9 min-h-9 items-center justify-center gap-0 bg-transparent p-0 hidden max-[1100px]:inline-flex"
					aria-label="მენიუ"
				>
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent
				side="right"
				className="w-[min(380px,calc(100vw-28px))] max-w-none gap-0 overflow-y-auto px-6 py-[30px] sm:max-w-none"
			>
				<div className="pr-7">
					<span className="mb-4 block text-[0.6875rem] font-medium tracking-[0.16em] text-muted-foreground">
						BEAUTY CODE
					</span>
					<SheetTitle className="m-0 text-xl leading-[1.6] font-medium">
						აღმოაჩინე შენი რჩეული
					</SheetTitle>
				</div>
				<SheetDescription className="mt-2 mb-6 leading-[1.8]">
					აირჩიე პროდუქტის კატეგორია
				</SheetDescription>
				<MobileNavigation onNavigate={() => setMenu(false)} />
				<div className="mt-auto pt-8 [&_p]:mb-3 [&_p]:text-[0.8125rem] [&_p]:text-muted-foreground [&_button]:w-full">
					<p>არჩევაში დაგეხმარებით</p>
					<Button
						variant="outline"
						onClick={() => {
							setMenu(false);
							void openChat();
						}}
					>
						<MessageCircle size={18} /> მოგვწერე
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}

function MobileNavigation({ onNavigate }: { onNavigate: () => void }) {
	const categories = useCategories();
	return (
		<nav
			className="flex flex-col gap-1.5 border-0 px-0 py-3 [&_a]:flex [&_a]:items-center [&_a]:gap-3 [&_a]:rounded-[10px] [&_a]:px-2.5 [&_a]:py-3 [&_a]:text-sm [&_a]:leading-[1.6] [&_a:hover]:bg-muted [&_a[aria-current=page]]:bg-muted"
			aria-label="მობილური ნავიგაცია"
		>
			<Link to="/products" search={{}} onClick={onNavigate}>
				<span className="grid size-[38px] shrink-0 place-items-center rounded-[10px] bg-muted text-primary">
					<Grid2X2 size={20} />
				</span>
				<span>ყველა პროდუქტი</span>
				<ChevronRight
					className="ml-auto shrink-0 text-muted-foreground"
					size={16}
				/>
			</Link>
			{categories.map((c) => {
				const Icon = categoryIcons[c.icon];
				return (
					<Link
						key={c.slug}
						to="/categories/$slug"
						params={{ slug: c.slug }}
						onClick={onNavigate}
					>
						<span className="grid size-[38px] shrink-0 place-items-center rounded-[10px] bg-muted text-primary">
							<Icon size={20} />
						</span>
						<span>{c.name}</span>
						<ChevronRight
							className="ml-auto shrink-0 text-muted-foreground"
							size={16}
						/>
					</Link>
				);
			})}
		</nav>
	);
}
