import { ArrowUpRight } from "lucide-react";
import { useOpenChat } from "../contact/contact-context.tsx";
import { Button } from "../ui/button.tsx";

export function BrandStory() {
	const openChat = useOpenChat();
	return (
		<section className="site-container home-section">
			<div className="grid gap-8 rounded-xl bg-rose-surface px-6 py-10 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
				<div>
					<h2 className="m-0 text-3xl leading-relaxed sm:text-4xl">
						ზრუნვას არ სჭირდება
						<br />
						განსაკუთრებული მიზეზი.
					</h2>
				</div>
				<div className="flex flex-col items-start justify-center">
					<p className="mb-6 text-sm leading-8 text-muted-foreground sm:text-base">
						ჩვენ გვჯერა პატარა, ყოველდღიური რიტუალების. თუ ჯერ არ იცი, რომელი
						მოწყობილობა შეგეფერება, მოგვწერე. ერთად შევარჩიოთ ის, რაც შენ
						გჭირდება.
					</p>
					<Button variant="outline" onClick={() => openChat()}>
						დაგეხმარებით არჩევანში <ArrowUpRight size={18} />
					</Button>
				</div>
			</div>
		</section>
	);
}
