import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useCategories } from "../catalog/category-context";
import { useContact } from "../contact/contact-context";
import { Button } from "../ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
export function SiteHeader() {
	const categories = useCategories();
	const [menu, setMenu] = useState(false);
	const open = useContact();
	useEffect(() => {
		const onClick = () => setMenu(false);
		window.addEventListener("popstate", onClick);
		return () => window.removeEventListener("popstate", onClick);
	}, []);
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
					onClick={() => open()}
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
						<SheetTitle>მენიუ</SheetTitle>
						<SheetDescription className="sr-only">
							აირჩიე პროდუქტის კატეგორია
						</SheetDescription>
						<nav className="mobile-nav" aria-label="მობილური ნავიგაცია">
							<Link to="/products" search={{}} onClick={() => setMenu(false)}>
								ყველა პროდუქტი
							</Link>
							{categories.map((c) => (
								<Link
									key={c.slug}
									to="/categories/$slug"
									params={{ slug: c.slug }}
									onClick={() => setMenu(false)}
								>
									{c.name}
								</Link>
							))}
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
