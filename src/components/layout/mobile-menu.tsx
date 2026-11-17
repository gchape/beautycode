import { Link, useBlocker, useRouter } from "@tanstack/react-router";
import { ChevronRight, Grid2X2, Menu } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useCategories } from "../catalog/category-context.tsx";
import { categoryIcons } from "../category-icons.ts";
import { ChatButton } from "../contact/chat-button.tsx";
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
	const trigger = useRef<HTMLButtonElement>(null);
	const menuId = useId();
	const [placement, setPlacement] = useState({ top: 56, right: 0 });
	const router = useRouter();
	const positionMenu = () => {
		const rect = trigger.current?.getBoundingClientRect();
		if (!rect) return;
		setPlacement({
			top: Math.max(8, rect.top - 16),
			right: Math.max(0, window.innerWidth - rect.right - 16),
		});
	};
	const changeMenu = (open: boolean) => {
		if (open) positionMenu();
		setMenu(open);
	};
	useBlocker({
		disabled: !menu,
		enableBeforeUnload: false,
		shouldBlockFn: ({ action }) => {
			if (action !== "BACK") return false;
			setMenu(false);
			return true;
		},
	});
	useEffect(
		() => router.subscribe("onResolved", () => setMenu(false)),
		[router],
	);
	useEffect(() => {
		if (!menu) return;
		const resize = () => {
			if (window.innerWidth > 1100) setMenu(false);
			else {
				const rect = trigger.current?.getBoundingClientRect();
				if (rect)
					setPlacement({
						top: Math.max(8, rect.top - 16),
						right: Math.max(0, window.innerWidth - rect.right - 16),
					});
			}
		};
		window.addEventListener("resize", resize);
		return () => window.removeEventListener("resize", resize);
	}, [menu]);
	return (
		<Sheet open={menu} onOpenChange={changeMenu}>
			<SheetTrigger asChild>
				<Button
					ref={trigger}
					variant="ghost"
					size="icon"
					className="size-11 min-h-11 items-center justify-center gap-0 bg-transparent p-0 hidden max-[1100px]:inline-flex"
					aria-label="მენიუ"
				>
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent
				id={menuId}
				onOpenAutoFocus={(event) => {
					event.preventDefault();
					document
						.getElementById(menuId)
						?.querySelector<HTMLAnchorElement>("nav a")
						?.focus({ preventScroll: true });
				}}
				side="right"
				style={{ top: placement.top, right: placement.right, bottom: 12 }}
				className="h-auto w-[min(380px,calc(100vw-24px))] max-w-none gap-0 overflow-y-auto rounded-2xl border border-border bg-background p-0 shadow-[0_20px_80px_#2e000324] sm:max-w-none"
			>
				<div className="border-b border-border/60 px-5 pt-5 pb-4 pr-16">
					<SheetTitle className="m-0 text-subheading leading-relaxed font-medium">
						აღმოაჩინე შენი რჩეული
					</SheetTitle>
					<SheetDescription className="mt-1 mb-0 text-sm leading-relaxed">
						აირჩიე პროდუქტის კატეგორია
					</SheetDescription>
				</div>
				<MobileNavigation onNavigate={() => setMenu(false)} />
				<div className="mx-5 mt-auto border-t border-border/60 pt-4 pb-5 [&_p]:mb-2 [&_p]:text-caption [&_p]:text-muted-foreground [&_button]:w-full">
					<p>არჩევაში დაგეხმარებით</p>
					<ChatButton
						variant="outline"
						onClick={() => {
							setMenu(false);
						}}
					>
						მოგვწერე
					</ChatButton>
				</div>
			</SheetContent>
		</Sheet>
	);
}

function MobileNavigation({ onNavigate }: { onNavigate: () => void }) {
	const categories = useCategories();
	return (
		<nav
			className="flex flex-col gap-1 p-3 [&_a]:flex [&_a]:min-h-11 [&_a]:items-center [&_a]:gap-3 [&_a]:rounded-xl [&_a]:px-3 [&_a]:py-2.5 [&_a]:text-sm [&_a]:leading-relaxed [&_a:hover]:bg-muted [&_a[aria-current=page]]:bg-muted"
			aria-label="მობილური ნავიგაცია"
		>
			<Link
				to="/products"
				activeOptions={{ exact: true, includeSearch: false }}
				search={{}}
				onClick={onNavigate}
			>
				<span className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-primary">
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
						<span className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-primary">
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
