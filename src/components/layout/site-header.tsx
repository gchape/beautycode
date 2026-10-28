import { Link, useRouter } from "@tanstack/react-router";
import {
	ChevronRight,
	Grid2X2,
	Menu,
	MessageCircle,
	Search,
} from "lucide-react";
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
export function SiteHeader() {
	const categories = useCategories();
	const [menu, setMenu] = useState(false);
	const openChat = useOpenChat();
	const router = useRouter();
	useEffect(
		() => router.subscribe("onResolved", () => setMenu(false)),
		[router],
	);
	return (
		<header className="header wrap">
			<Link to="/" className="brand" aria-label="Beauty Code, მთავარი">
				<img src="/logo.jpg" alt="Beauty Code" width="82" height="82" />
				<span>
					BEAUTY CODE<small>სილამაზე შენებურად</small>
				</span>
			</Link>
			<nav className="desktop-nav" aria-label="მთავარი ნავიგაცია">
				<Link to="/products" search={{}}>
					ყველა პროდუქტი
				</Link>
				{categories.map((c) => (
					<Link key={c.slug} to="/categories/$slug" params={{ slug: c.slug }}>
						{c.name}
					</Link>
				))}
			</nav>
			<div className="header-actions">
				<Link
					to="/products"
					search={{}}
					className="icon-button"
					aria-label="პროდუქტის ძებნა"
				>
					<Search size={21} />
				</Link>
				<Button
					variant="outline"
					onClick={() => openChat()}
					className="contact-button"
				>
					<MessageCircle size={17} /> მოგვწერე
				</Button>
				<Sheet open={menu} onOpenChange={setMenu}>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="icon-button mobile-menu"
							aria-label="მენიუ"
						>
							<Menu />
						</Button>
					</SheetTrigger>
					<SheetContent side="right" className="mobile-sheet">
						<div className="menu-heading">
							<span className="eyebrow">BEAUTY CODE</span>
							<SheetTitle>აღმოაჩინე შენი რჩეული</SheetTitle>
						</div>
						<SheetDescription className="menu-description">
							აირჩიე პროდუქტის კატეგორია
						</SheetDescription>
						<nav className="mobile-nav" aria-label="მობილური ნავიგაცია">
							<Link to="/products" search={{}} onClick={() => setMenu(false)}>
								<span className="menu-category-icon">
									<Grid2X2 size={20} />
								</span>
								<span>ყველა პროდუქტი</span>
								<ChevronRight className="menu-chevron" size={16} />
							</Link>
							{categories.map((c) => {
								const Icon = categoryIcons[c.icon];
								return (
									<Link
										key={c.slug}
										to="/categories/$slug"
										params={{ slug: c.slug }}
										onClick={() => setMenu(false)}
									>
										<span className="menu-category-icon">
											<Icon size={20} />
										</span>
										<span>{c.name}</span>
										<ChevronRight className="menu-chevron" size={16} />
									</Link>
								);
							})}
						</nav>
						<div className="menu-footer">
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
			</div>
		</header>
	);
}
